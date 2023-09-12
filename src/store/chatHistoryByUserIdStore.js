import { defineStore } from "pinia";
import axios from "@/utils/api";

export const useChatHistoryByUserId = defineStore("chatHistoryByUserId",{
    state:()=>({
        chatHistory:new Map()
    }),
    getters:{
        getChatHistoryById(state){
            return (userId)=> state.chatHistory.get(userId);
        }
    },
    actions:{
        async getChatHistoryByIdToServe(chatId){
            try {
                if(this.chatHistory.has(chatId)){
                    return Promise.resolve(this.chatHistory.get(chatId));
                }
            } catch (error) {
                return Promise.reject(error.message);
            }
        }   
    }
});