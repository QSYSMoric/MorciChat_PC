import { defineStore } from "pinia";
import Moric_ChatUser from '@/class/Moric_ChatUser';
import { useChatHistoryByUserId } from "@/store/chatHistoryByUserIdStore";
import axios from "@/utils/api";

//聊天记录store
const chatHistory = useChatHistoryByUserId();
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
            let feedback = await axios({
                method: "post",
                url: "/moric/getFriendList",
            });
            feedback.body.forEach(element => {
                //如果是好友那么就获取历史聊天记录
                if(element.friendStatus === "confirmed"){
                    chatHistory.getChatHistoryByIdToServe(element.chatHistory,element.friendId);
                }
                chatHistory.createTempHistory(element.friendId);
                this.chatUserList.push(new Moric_ChatUser(element.friendId,element.chatHistory,element.remark,element.friendStatus));
            });
        }
    }
});