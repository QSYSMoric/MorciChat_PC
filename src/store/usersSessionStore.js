import { defineStore } from 'pinia';
import Moric_UserMsg from '@/class/Moric_UserMsg';
import axios from '@/utils/api';

//存储用户信息的介质
export const useSelfStore = defineStore('mySelf',{
    state:()=>({
        usersMsg:new Map(),
    }),
    actions:{
        async getUserInfoById(userId){
            if(!this.usersMsg.has(userId)){
                
            }
            this.usersMsg.get(userId);
        },
        async requestUserInfoById(userId){
            try{
                
            }catch(err){
                return Promise.reject(err.message);
            }
        }
    }
});