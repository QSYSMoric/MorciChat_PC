import { defineStore } from 'pinia';
//存储用户信息的介质
export const useSelfStore = defineStore('mySelf', {
    state:()=>({
        selfName:"游客",
        selfId:null,
        selfProfileURL:null,
        selfAge:null,
        selfSignature:null,
        selfEmail:null,
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
        }
    },
    actions:{
        setSelf(selfId,selfName,selfProfileURL,selfAge,selfSignature,selfEmail){
            this.selfId = selfId;
            this.selfName = selfName;
            this.selfProfileURL = selfProfileURL;
            this.selfAge = selfAge;
            this.selfSignature = selfSignature;
            this.selfEmail = selfEmail;
        },
    }
});