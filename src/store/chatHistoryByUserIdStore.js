import { defineStore } from "pinia";
import axios from "@/utils/api";
import formatDate from "@/utils/formatDate";

export const useChatHistoryByUserId = defineStore("chatHistoryByUserId",{
    state:()=>({
        chatHistory:new Map()
    }),
    getters:{
        //返回响应式历史聊天记录
        getChatHistoryById(state){
            return (userId)=> {
                if(!this.chatHistory.has(userId)){
                    this.chatHistory.set(userId,[]);
                }
               return state.chatHistory.get(userId)
            };
        },
    },
    actions:{
        //创建临时的聊天历史记录池
        createTempHistory(friendId){
            if(!this.chatHistory.has(friendId)){
                this.chatHistory.set(friendId,[]);
            }
            return this.chatHistory.get(friendId);
        },
        //获取历史聊天记录
        async getChatHistoryByIdToServe(chatId,friendId){
            try {
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getChatRecords",
                    data:{
                        chatId
                    }
                });
                let chatHistory = this.createTempHistory(friendId);
                if(feedback.body.length){
                    feedback.body.forEach((element,index)=>{
                        feedback.body[index].timing = formatDate(element.timing);
                    })
                    chatHistory.push(...feedback.body);
                }
            } catch (error) {
                return Promise.reject(error.message);
            }
        },   
        //来了新的消息
        addNewChatByServe(chatMsg){
            console.log(chatMsg);
            this.chatHistory.get(chatMsg.dynamic_id).push(chatMsg);
        }
    }
});