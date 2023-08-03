import axios from "axios";
import configs from "../../globalConfig";
import Prompt from "@/components/GlobalPrompt";
import router from "@/routers/index";

//配置axios
let api = axios.create({
    //基础配置
    baseURL:"/api",
    timeout:30 * 1000,
    responseType:"json",
});
//响应头配置
api.interceptors.request.use((config)=>{
    //某些接口不需要token，配置密钥
    const interfase = configs.interfase;
    const token = sessionStorage.getItem("token");
    if(!interfase.includes(config.url)){
        config.headers.token = token;
    }
    return config;
},err=>{
    return Promise.resolve(new Error(err));
});
//响应的统一处理
api.interceptors.response.use((res)=>{
    //这次的操作是否成功
    if(res.data.state){
        //操作成功的统一处理
        return Promise.resolve(res.data);
    }else{
        //操作失败的统一处理
        // let RegisterOnclick = setTimeout(() => {
        //     router.replace({
        //         path:"/Error",
        //         name:"Error",
        //     });
        //     clearTimeout(RegisterOnclick);
        // }, 1000);
        return Promise.reject(res.data);
    };
},err=>{
    //响应失败的统一处理
    Prompt("服务器超时,检查一下网络或者等待一下",false,5000);
    return Promise.reject(new Error(err));
});

export default api;