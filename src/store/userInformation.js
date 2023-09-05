import { defineStore } from 'pinia';
import axios from '@/utils/api';
import imageToUrl from '@/utils/ImageToURL';

//存储用户信息的介质
export const useUserInformation = defineStore('userInformation',{
    state:()=>({
        userInformationList: new Map(),
        userInfoRequestCollective: new Map()
    }),
    actions:{
        async getUserInfoById(userId){
            return new Promise((resolve,reject)=>{
                if(this.userInformationList.has(userId)){
                    return resolve(this.userInformationList.get(userId));
                };
                //检查是否是同一个请求
                if(this.userInfoRequestCollective.has(userId)){
                    // 添加到请求队列中，并在请求完成后返回结果
                    return resolve(this.userInfoRequestCollective.get(userId));
                }else{
                    try {
                        this.userInfoRequestCollective.set(userId,this.getUserInfoByIdToServe(userId));
                        return resolve(this.userInfoRequestCollective.get(userId)); 
                    } catch (error) {
                        return reject(error.message);
                    }
                }
            });
        },
        async getUserInfoByIdToServe(userId){
            try {
                const request = await axios({
                    method:"post",
                    url:"/moric/pickInformation",
                    data:{
                        userId
                    }
                });
                if(!request.state){
                    throw new Error(userInfo.alertMsg);
                }
                const userInfo = request.body;
                userInfo.userProfile = imageToUrl(userInfo.userProfile,userInfo.userProfileType);
                this.userInformationList.set(userInfo.userId,userInfo);
                return Promise.resolve(userInfo);
            } catch (error) {
                console.log(error.message);
                return Promise.reject(error.message);
            }
        }
    }
});