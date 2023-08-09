import { io } from 'socket.io-client';
import Prompt from '@/components/GlobalPrompt';

let token = sessionStorage.getItem("token");

const SocketModule = {
    socket:null,
    connect(serverUrl){
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
        })
    },
    end(){
        //取消所有订阅
        this.socket.off();
        // 断开与服务端的连接
        this.socket.disconnect();
    }
}
export default SocketModule;