import { defineStore } from "pinia";
import axios from "@/utils/api";
import formatDate from "@/utils/formatDate";
import PubSub from 'pubsub-js';
import day from '@/utils/day';
import isFirstTimeUpdated from "@/utils/isFirstTimeUpdated";

export const useChatHistoryByUserId = defineStore("chatHistoryByUserId",{
    state:()=>({
        chatHistory:new Map()
    }),
    getters:{
        //返回响应式历史聊天记录
        getChatHistoryById(state){
            return (userId)=> {
                if(!this.chatHistory.has(userId)){
                    this.chatHistory.set(userId,new Array());
                }
               return state.chatHistory.get(userId);
            }
        },
        //实时响应最后一条数据
        getLastHistory(state){
            return (historyId)=>{
                if(!this.chatHistory.has(historyId)){
                    this.chatHistory.set(historyId,new Array());
                }
                let height = state.chatHistory.get(historyId).length;
                return state.chatHistory.get(historyId)[height - 1];
            }
        },
        //返回未读数据
        getUnRead(state){
            return (onActiveTime,historyId)=>{
                if(!this.chatHistory.has(historyId))
                    this.chatHistory.set(historyId,new Array());
                try{
                    //比较用户与该用户之间最后一次联系的时间与聊天列表第一条发送的时间
                    //找到聊天数据中第一条比最后联系时间更新的数据下标；
                    let history = state.chatHistory.get(historyId);
                    if(!history.length || !historyId){
                        return 0;
                    }
                    let compareTime = formatDate(onActiveTime);
                    let tempIndex = history.findIndex((element)=>{
                        return isFirstTimeUpdated(element.timing.now,compareTime.now);
                    });
                    tempIndex = tempIndex < 0 ? 0:tempIndex;
                    if(!tempIndex){
                        return 0;
                    }
                    return history.length - tempIndex;
                }catch(err){
                    console.log(err.message);
                }
            }
        }
    },
    actions:{
        //创建临时的聊天历史记录池
        createTempHistory(friendId){
            if(!this.chatHistory.has(friendId)){
                this.chatHistory.set(friendId,new Array());
            }
            return this.chatHistory.get(friendId);
        },
        //获取历史聊天记录
        async getChatHistoryByIdToServe(historyId){
            try {
                if(!historyId){
                    throw Error("chatHistoryId为空");
                }
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getChatRecords",
                    data:{
                        chatId:historyId
                    }
                });
                let chatHistory = this.createTempHistory(historyId);
                if(feedback.body.length){
                    feedback.body.forEach((element,index)=>{
                        feedback.body[index].timing = formatDate(element.timing);
                    });
                    chatHistory.push(...feedback.body);
                    //发布最后一条消息
                    let lastMsg = chatHistory[chatHistory.length - 1];
                    //设置最后一条消息
                    PubSub.publish(`chat${lastMsg.dynamic_id}LastMsg`,lastMsg);
                }
            } catch (error) {
                return Promise.reject(error.message);
            }
        },   
        //来了新的消息
        addNewChatByServe(joinID,chatMsg){
            this.createTempHistory(joinID);
            this.chatHistory.get(joinID).push(chatMsg);
        },
        updateLastContactTime(user){
            //区分临时会话与好友私信
            if(user.friendStatus === "confirmed"){
                //更新与该用户联系的时间
                axios({
                    method: "post",
                    url: "/moric/updateLastContactTime",
                    data:{
                        friendId:user.friendId
                    }
                }).then((data)=>{
                    user.lastContacttime = data.body.lastContacttime;
                }).catch((err)=>{
                    user.lastContacttime = err.body.lastContacttime;
                    console.log(err);
                });
            }else{
                user.lastContacttime = day.nowTime();
            }
        },
        clear(){
            this.chatHistory.clear();
        }
    }
});