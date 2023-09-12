import { defineStore } from "pinia";
import Moric_ChatUser from '@/class/Moric_ChatUser'
import axios from "@/utils/api";

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
        async getFriendUserList(){
            let feedback = await axios({
                method: "post",
                url: "/moric/getFriendList",
            });
            feedback.body.forEach(element => {
                this.chatUserList.push(new Moric_ChatUser(element.friendId,element.chatHistory,element.remark,element.friendStatus));
            });
        }
    }
});