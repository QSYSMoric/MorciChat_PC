import axios from "@/utils/api";
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
            sessionStorage.setItem("token",response.body.token);
            return true;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}