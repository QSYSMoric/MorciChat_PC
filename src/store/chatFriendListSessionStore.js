import { defineStore } from "pinia";
import Moric_ChatUser from '@/class/Moric_ChatUser';
import { useChatHistoryByUserId } from "@/store/chatHistoryByUserIdStore";
import { useFriendListStore } from"@/store/friendListSessionStore";
import axios from "@/utils/api";
import PubSub from "pubsub-js";

//聊天列表
export const useChatUserList = defineStore("chatUserList",{
    state:()=>({
        chatUserList:[]
    }),
    getters:{
        getChatUserList(state){
            return state.chatUserList;
        }
    },
    actions:{
        //获取好友列表
        async getFriendUserList(){
            try {
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getFriendList",
                });
                if(!feedback.state){
                    throw new Error(feedback.alertMsg);
                }
                //获取聊天记录
                const chatHistory = useChatHistoryByUserId();
                //好友列表
                const friendList = useFriendListStore();
                feedback.body.forEach(element => {
                    chatHistory.createTempHistory(element.chatHistory);
                    let tempChatUser = new Moric_ChatUser(element.friendId,element.friendStatus,element.chatHistory,element.remark,element.lastContacttime);
                    //如果是好友那么就获取历史聊天记录
                    if(tempChatUser.friendStatus === "confirmed"){
                        chatHistory.getChatHistoryByIdToServe(tempChatUser.historyId);
                        friendList.addNewFiend(tempChatUser.friendId);
                    }
                    //查询此时的聊天列表是否重复
                    const isObjectIncluded  = this.chatUserList.some((node)=>{
                        return node.friendId === tempChatUser.friendId;
                    });
                    if(!isObjectIncluded){
                        this.chatUserList.push(tempChatUser);
                    }
                });
                PubSub.publish("chatSelectFrist",this.chatUserList[0]);    
            } catch (error) {
                console.log(error.message);
            }    
        },
        //获取用户在列表的位置
        hasUserToList(userID){
            let tIndex = this.chatUserList.length; 
            this.chatUserList.find((node,index) => {
                if(node.friendId === userID){
                    tIndex = index;
                    return true;
                }
            });
            return tIndex;
        },
        //增添新的用户
        addNewChatUser(userID,historyId){
            //判断此时列表是否有这位用户
            let tIndex = this.hasUserToList(userID);
            if( tIndex === this.chatUserList.length){
                //如果没有那创建一个用户
                let newChatUser = new Moric_ChatUser(userID,"pending",historyId);
                this.chatUserList.push(newChatUser);
            }
            return tIndex;
        },
        //清除所有数据
        clear(){
            this.chatUserList.length = 0;
        }
    }
});