import { defineStore } from "pinia";
import axios from "@/utils/api";
import Moric_FriendOperation from "@/class/Moric_FriendOperation";
//好友列表
export const useFriendListStore = defineStore("friendList",{
    state:()=>({
        //好友列表
        friendList:[],
        //好友申请列表,
        friendApplication:[],
    }),
    getters:{
        //获取好友列表
        getFriendUserList(state){
            return state.friendList;
        },
        //获取好友请求列表
        getFriendApplicationList(state){
            return state.friendApplication;
        },
        //获取好友数量
        getFriendLength(state){
            return state.friendList.length;
        }
    },
    actions:{
        //添加好友
        addNewFiend(friend){
            //查询此时的好友列表是否重复
            const isObjectIncluded  = this.friendList.some((element)=>{
                return element === friend;
            });
            //如果没有那么添加进去
            if(!isObjectIncluded){
                this.friendList.push(friend);
            }
        },
        //获取好友申请列表
        async getFriendApplicationListToServe(){
            try {
                let dataInfo = await axios({
                    method:"post",
                    url:"/moric/getFriendApplicationList" 
                });
                if(!dataInfo.state){
                    throw new Error(dataInfo);
                }
                this.friendApplication.push(...dataInfo.body);
            } catch (error) {
                console.log(error.message);
            }
        },
        //添加好友请求消息
        addNewFriendRequest(friendRequest){
            if(!friendRequest){
                return false;
            }
            const isObjectIncluded = this.friendApplication.some((element)=>{
                //比较发送者与目标者的id如果重复则不能添加到这个列表
                return (element.userId == friendRequest.userId && element.friendId == friendRequest.friendId);
            });
            if(!isObjectIncluded){
                this.friendApplication.push(friendRequest);
            }
        },
        //好友请求通过后
        updateFriendApplication(friendOperation){
            //查询此时的好友列表是否重复
            const isObjectIncluded  = this.friendApplication.find((element)=>{
                return element.userId == friendOperation.userId && element.friendId == friendOperation.friendId;
            });
            if(isObjectIncluded){
                isObjectIncluded.status = friendOperation.status;
            }else{
                this.addNewFriendRequest(friendOperation);
            }
        },
        //更新列表中某个好友的状态
        updatingFriendApplicationStatus(userId,friendId,states){
            if(!userId || !friendId || !states){
                console.log("参数为空");
                return;
            }
            //查询此时的好友列表是否重复
            const isObjectIncluded  = this.friendApplication.find((element)=>{
                return element.userId == userId && friendId;
            });
            if(isObjectIncluded){
                isObjectIncluded.status = states;
            }
        },
        //查询是否存在这个好友
        hasFriend(friendId){
            if(!friendId){
                console.log("参数为空");
                return;
            }
            //查询此时的好友列表是否重复
            const isObjectIncluded  = this.friendApplication.findIndex((element)=>{
                return element.friendId == friendId;
            });
            return isObjectIncluded;
        },
        clear(){
            this.friendList.length = 0;
            this.friendApplication.length = 0
        }
    }
});