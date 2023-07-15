export default {
    userMsg:{
        avatarType:null,
        avatarData:null,
    },
    //选择头像，并设置表单
    handleFileUpload(event,avatar){
        //获取到上传的头像
        let files = event.target.files[0];
        let imgSrc = window.URL.createObjectURL(files);
        console.log(imgSrc);
        avatar.src = imgSrc;
        //创建读取文件读取对象
        let reader = new FileReader();
        //判断文件类型
        if(/image/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.avatarType = "jpg";
        }else if(/png/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.userMsg.avatarType = "png";
        }else if(/jpg/.test(files.type)){
            reader.readAsDataURL(files);
            this.userMsg.avatarType = "jpg";
        }else{
            reader.readAsText(files);
            this.userMsg.avatarType = "text";
        };
        //当文件加载完毕后调用这个函数
        reader.onload = () => {
            this.userMsg.avatarData = reader.result;
        }
    },
}