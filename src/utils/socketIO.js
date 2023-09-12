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
    },
    end(){
        //取消所有订阅
        this.socket.off();
        // 断开与服务端的连接
        this.socket.disconnect();
    }
}
export default SocketModule;