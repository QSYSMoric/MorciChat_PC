import { io } from 'socket.io-client';
import Prompt from '@/components/GlobalPrompt';
import socketCommunicationProcessingControllers from '@/controllers/socketCommunicationProcessingControllers';

const SocketModule = {
    socket:null,
    connect(serverUrl){
        let token = sessionStorage.getItem("token");
        this.socket = io(serverUrl, {
            auth: {
              token: token
            }
        });
        this.socket.on("connect_error", (err) => {
            //处理鉴权失败
            console.log(err.message);
            Prompt(err.message,false,2000);
        });
        this.socket.on("success",(mgs)=>{
            console.log(mgs);
        });
    },
    start(){
        //接收最新的一条动态
        this.socket.on("newMoment",socketCommunicationProcessingControllers.newMomentsProcess);
        //接收最新的一条动态评论
        this.socket.on("newComment",socketCommunicationProcessingControllers.newCommentsProcess);
        //接收频道广播消息
        this.socket.on("groupChatMessages",socketCommunicationProcessingControllers.newchannelMessages);
        //接收私信
        this.socket.on("privateMessage",socketCommunicationProcessingControllers.privateMessage);
        //接收好友请求消息
        this.socket.on("friendRequest",socketCommunicationProcessingControllers.friendRequest);
        //接收好友操作结果信息
        this.socket.on("friendsThrough",socketCommunicationProcessingControllers.friendsThrough);
    },
    //发送消息
    sendMessage(chatId,chatMsg,friendStatus){
        if(chatId >= 90000){
            this.socket.emit("groupChatMessages",chatMsg);
        }else{
            this.socket.emit("privateMessage",chatMsg,friendStatus);
        }
    },
    //添加好友
    addNewFiendToServe(friendId){
        this.socket.emit("addNewFiendToServe",friendId);
        return new Promise((resolve,reject)=>{
            this.socket.once("addNewFiendToServe",(dataInfo)=>{
                if(dataInfo.state){
                    resolve(dataInfo);
                }else{
                    reject(dataInfo);
                }
            });
        });
    },
    //好友请求
    operateFriendRequests(friendOperation){
        this.socket.emit("operateFriendRequests",friendOperation);
        return new Promise((resolve,reject)=>{
            this.socket.once("operateFriendRequests",(dataInfo)=>{
                if(dataInfo.state){
                    resolve(dataInfo);
                }else{
                    reject(dataInfo);
                }
            });
        });
    },
    end(){
        //取消所有订阅
        this.socket.off();
        // 断开与服务端的连接
        this.socket.disconnect();
    }
}
export default SocketModule;