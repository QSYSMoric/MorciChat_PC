//用户操作中心
import axios from "@/utils/api";
import imageToUrl from "@/utils/ImageToURL";
import { useSelfStore } from "@/store/selfStore";
import formatDate from "@/utils/formatDate";

//异步获取用户个人信息
export async function getUserInformation(){
    try{
        const userSelf = useSelfStore();
        const response = await axios({
            method: "post",
            url: "/moric/getUserInformation"
        });
        const data = response.body;
        let selfProfileURL = null;
        //如果用户没有头像
        if(data.userProfile){
            selfProfileURL = imageToUrl(data.userProfile,data.userProfileType);
        }
        //获取到资源后设置到用户全局状态管理中
        userSelf.setSelf(data.userId,data.userName,selfProfileURL,data.userAge,data.userSignature,data.userEmail,formatDate(data.userCreateAt));
    }catch(err){
        console.log(err);
        return Promise.reject(err);
    }
}
