import { defineStore } from "pinia";
import axios from '@/utils/api';
import formatDate from '@/utils/formatDate';

export const useCommentStore = defineStore('comments',{
    state:()=>({
        comments:new Map(),
    }),
    getters:{
        getCommentById(state){
            return (momentId)=> state.comments.get(momentId);
        }
    },
    actions:{
        async getCommentList(momentId){
            if(!momentId){
                return;
            }
            if(this.comments.has(momentId)){
                return this.comments.get(momentId);
            }
            try {
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getComments",
                    data:{
                        momentId
                    }
                });
                if(!feedback.state){
                    throw new Error(feedback.alertMsg);
                }
                feedback.body.forEach((element,index) => {
                    //格式化时间
                    feedback.body[index].timing = formatDate(element.timing);
                });
                this.comments.set(momentId,feedback.body);
                return Promise.resolve(this.comments.get(momentId));
            } catch (error) {
                return Promise.reject(error.message);     
            }
        },
        async postCommentToServe(comment){
            try {
                if(!comment){
                    throw new Error("内容非法");
                }
                let feedback = await axios({
                    method: "post",
                    url: "/moric/setComments",
                    data:{
                        comment
                    }
                });
                return Promise.resolve(feedback.alertMsg);
            } catch (error) {
                return Promise.reject(error.message);
            }
        },
        addNewComment(comment){
            try {
                this.comments.get(comment.dynamic_id).unshift(comment);
            } catch (error) {
                console.log(error.message);
            }
        },
        clearExit(){
            this.comments.clear();
        }
    }
});