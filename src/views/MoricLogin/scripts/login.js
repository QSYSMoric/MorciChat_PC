import axios from "@/utils/api";
import Prompt from "@/components/GlobalPrompt";

export default{
    //登录输入信息
    inputMsg:{
        userId:null,
        userPassword:null
    },
    //登录请求
    async loginRequest(obj) {
        const { userId, userPassword } = obj;
        if (!userId || !userPassword) {
            alert("检测错误");
            return;
        }
        try {
            const response = await axios({
                method: "post",
                url: "/moric/login",
                data: obj
            });
            const data = response.body;
            //提示框
            Prompt(response.alertMsg,response.state);
            //存储token
            sessionStorage.setItem("token",data.token);
            return true;
        } catch (err) {
            console.log(err.alertMsg);
            //提示框
            Prompt(err.alertMsg,false);
            throw err;
        }
    }
}