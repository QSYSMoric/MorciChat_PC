import { defineStore } from "pinia";
import imageToUrl from '@/utils/ImageToURL';
import axios from '@/utils/api';
import formatDate from '@/utils/formatDate';

export const useCommentStore = defineStore('comments',{
    state:()=>({
        comments:new Map(),
    }),
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
                return Promise.resolve(feedback.body);
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
        clearExit(){
            this.comments.clear();
        }
    }
});