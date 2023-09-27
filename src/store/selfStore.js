import { defineStore } from 'pinia';
import axios from '@/utils/api';
import Moric_Moments from '@/class/Moric_Moments';
import imageToUrl from '@/utils/ImageToURL';
import formatDate from "@/utils/formatDate";
//存储用户信息的介质
export const useSelfStore = defineStore('mySelf', {
    state:()=>({
        selfName:"游客",
        selfId:null,
        selfProfileURL:null,
        selfAge:null,
        selfSignature:null,
        selfEmail:null,
        userCreateAt:null,
        myMoments:[]
    }),
    getters:{
        getName:(state)=>{
            return state.selfName;
        },
        getSelf:(state)=>{
            return state.selfId;
        },
        getProfileURL:(state)=>{
            return state.selfProfileURL;
        },
    },
    actions:{
        setSelf(selfId,selfName,selfProfileURL,selfAge,selfSignature,selfEmail,userCreateAt){
            this.selfId = selfId;
            this.selfName = selfName;
            this.selfProfileURL = selfProfileURL;
            this.selfAge = selfAge;
            this.selfSignature = selfSignature;
            this.selfEmail = selfEmail;
            this.userCreateAt = userCreateAt;
        },
        addMyMoments(moment){
            this.myMoments.push(moment)
        },
        getId(){
            return this.selfId;
        },
        updatedMsg(selMsg) {
            const { userName, userProfile, userAge, userSignature, userEmail } = selMsg;
            this.selfName = userName || this.selfName;
            this.selfProfileURL = userProfile || this.selfProfileURL;
            this.selfAge = userAge || this.selfAge;
            this.selfSignature = userSignature || this.selfSignature;
            this.selfEmail = userEmail || this.selfEmail;
        },
        async requestMoments(){
            try {
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getMomentsMy",
                    data:{
                        timing:null
                    }
                });
                feedback.body.forEach((element)=>{
                    let timing = formatDate(element.publicTiming);
                    element.publicTiming = timing;
                    if(element.friendCirclePictures && element.friendCirclePictures.length){
                        element.friendCirclePictures.forEach((node,index)=>{
                            element.friendCirclePictures[index] = imageToUrl(node);
                        });
                    }
                    this.addMyMoments(new Moric_Moments(element.publishId,element.publisher,element.publicTiming,element.friendCircleCopy,element.friendCirclePictures,element.commentInformation));
                });
            }catch(error){
                return Promise.reject(error.message);       
            }
        },
        clear(){
            this.myMoments.length = 0;
        }
    }
});