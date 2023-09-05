import { defineStore } from 'pinia';
import Moric_Moments from '@/class/Moric_Moments';
import imageToUrl from '@/utils/ImageToURL';
import axios from '@/utils/api';
import formatDate from '@/utils/formatDate';

export const useMomentsStore = defineStore('moments',{
    state:()=>({
        moments:new Array(),
    }),
    getters:{
        getMomentsList(state){
            return state.moments;
        }
    },
    actions:{
        addNewMoments(moment){
            this.moments.push(moment);
        },
        addNewMoment(moment){
            console.log(moment);
            this.moments.unshift(moment);
        },
        async requestMoments(){
            try {
                let feedback = await axios({
                    method: "post",
                    url: "/moric/getNewMoments",
                    data:{
                        timing:null
                    }
                });
                feedback.body.forEach((element)=>{
                    let timing = formatDate(element.publicTiming);
                    element.publicTiming = timing;
                    element.friendCirclePictures.forEach((node,index)=>{
                        element.friendCirclePictures[index] = imageToUrl(node);
                    });
                    this.addNewMoments(new Moric_Moments(element.publishId,element.publisher,element.publicTiming,element.friendCircleCopy,element.friendCirclePictures,element.commentInformation));
                });
            }catch(error){
                return Promise.reject(error.message);       
            }
        },
        clearExit(){
            this.moments.length = 0;
        }
    }
});