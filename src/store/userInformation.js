import { defineStore } from 'pinia';
import axios from '@/utils/api';
import imageToUrl from '@/utils/ImageToURL';

//存储用户信息的介质
export const useUserInformation = defineStore('userInformation',{
    state:()=>({
        userInformationList: new Map(),
    }),
    actions:{
        getUserInfoById(userId){
            return new Promise((resolve,reject)=>{
                if(this.userInformationList.has(userId)){
                    return resolve(this.userInformationList.get(userId));
                }
                this.getUserInfoByIdToServe(userId).then((data)=>{
                    if(!data.state){
                        throw new Error(data.alertMsg);
                    }
                    const userInfo = data.body;
                    userInfo.userProfile = imageToUrl(userInfo.userProfile,userInfo.userProfileType);
                    this.userInformationList.set(userInfo.userId,userInfo);
                    return resolve(userInfo);
                }).catch((err)=>{
                    return reject(err.message);
                });
            });
        },
        async getUserInfoByIdToServe(userId){
            try {
                const userInfo = await axios({
                    method:"post",
                    url:"/moric/pickInformation",
                    data:{
                        userId
                    }
                });
                return Promise.resolve(userInfo);
            } catch (error) {
                console.log(error.message);
                return Promise.reject(error.message);
            }
        }
    }
});