import axios from "@/utils/api";
export default {
    userMsg:{
        userName:null,
        userEmail:null,
        userPassword:null,
        userProfile:null,
        userProfileType:null,
    },
    async setUserMsg(obj){
        const { userName,userEmail,userPassword } = obj;
        this.userMsg.userName = userName;
        this.userMsg.userEmail = userEmail;
        this.userMsg.userPassword = userPassword;
        return Promise.resolve("成功");
    },
    //选择头像，并设置表单
    handleFileUpload(event,avatar){
        //获取到上传的头像
        let files = event.target.files[0];
        let imgSrc = window.URL.createObjectURL(files);
        avatar.src = imgSrc;
        //创建读取文件读取对象
        let reader = new FileReader();
        //判断文件类型
        if(/image/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.userProfileType = "jpg";
        }else if(/png/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.userMsg.userProfileType = "png";
        }else if(/jpg/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.userProfileType = "jpg";
        }else{
            reader.readAsText(files);
            this.userMsg.userProfileType = "text";
        };
        //当文件加载完毕后调用这个函数
        reader.onload = () => {
            this.userMsg.userProfile = reader.result;
        }
    },
    //注册请求
    registrationRequest(router,isRegisterOnclick){
        axios({
            method:"post",
            url:"/moric/register",
            data:this.userMsg
        }).then((value)=>{
            isRegisterOnclick.value = true;
            sessionStorage.setItem("token",value.token);
        }).catch(()=>{
            isRegisterOnclick.value = true;
        });
        // const jumpTime = setTimeout(()=>{
        //     router.push({
        //         path:"/Page/communityBar",
        //         name:"communityBar",
        //     });
        //     clearTimeout(jumpTime);
        // },800);
    }
}