<template>
    <div class="MoricLoginContent">
        <div class="background_top">
            <span class="top_icon">
                
            </span>
            <span class="top_titile">
                首页
            </span>
        </div>
        <h2>JOIN</h2>
        <form>  
        <div class="headSculpture">
            <div class="inputSearch">
                <img :src="avatar.src" v-if="avatar.src" alt="头像">
                <div class="inputheadSculpture">
                    <input type="file" title="headSculpture" 
                    @change="handleFileUpload"
                    placeholder="上传头像">
                </div>
            </div>
        </div>
        <div class="animate__animated inputMsg" :class="userName.class">
            <span>
                
            </span>
            <input 
            v-focus="'active'"
            type="text" 
            v-model="userName.data"
            placeholder="userNmae"
            @focus="userName.offErr()">
        </div>
        <div class="animate__animated inputMsg" :class="email.class">
            <span>
                
            </span>
            <input 
            v-focus="'active'"
            type="email" 
            title="email"
            autocomplete="off"
            v-model="email.data"
            placeholder="email"
            @focus="email.offErr()">
        </div>
        <div class="animate__animated inputMsg" :class="password.class">
            <span>
                
            </span>
            <input 
            v-focus="'active'"
            type="password" 
            title="password"
            autocomplete="off"
            v-model="password.data"
            placeholder="PAS"
            @focus="password.offErr()">
        </div>
        <div class="loginCheckBox">
            <label class="checkbox-container">
                <input type="checkbox">
                <span class="checkmark"></span>隐私通知
            </label>
        </div>
        <div class="loginSubmit">
            <a @click.stop="registerSubmit">注册</a>
        </div>
        </form>
        <div class="loginOtherContentBottom">
            <p>已有账号?<a class="hoverClass" @click.stop="registerOnclick">去登录</a></p>
        </div>
    </div>
  </template>
  
<script setup>
    import { reactive, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';
    import InputField from '@/views/MoricLogin/scripts/InputField';
    import registerChecker from '../scripts/InputDetection';
    import register from '../scripts/register';
    //自定义样式指令
    const vFocus = {
        mounted: (el,binding)=>{
            const inputParentNode = el.parentNode;
            el.addEventListener('focus',()=>{
                inputParentNode.classList.add(binding.value);
            });
            el.addEventListener('blur',()=>{
                inputParentNode.classList.remove(binding.value);
            });
        }
    };
    const router = useRouter();
    //注册跳转
    const registerOnclick = function(){
        router.push({
            path:"/Login/Operatelogin",
            name:"Operatelogin"
        });
    }
    //每个input输入框所对应的值
    const userName = reactive(new InputField());
    const email = reactive(new InputField());
    const password = reactive(new InputField());
    const avatar = reactive({
        src:null,
    });
    //头像处理
    function handleFileUpload(event){
        register.handleFileUpload(event,avatar);
    }
    //注册按钮
    function registerSubmit(){
        let error = null;
        //检测输入信息
        //设置要执行的策略
        registerChecker.setStrategy("emptyUsernameStrategy");
        error = registerChecker.check(userName.data);
        if(!error){
            userName.onErr();
            return;
        }
        registerChecker.setStrategy("validEmailStrategy");
        error = registerChecker.check(email.data);
        if(!error){
            email.onErr();
            return;
        }
        registerChecker.setStrategy("validPasswordStrategy");
        error = registerChecker.check(password.data);
        if(!error){
            password.onErr();
            return;
        }
    }
</script>
  
<style scoped>
    .MoricLoginContent{
          width: 65%;
          min-width: 400px;
          /* height: 70%; */
          box-shadow: 2px 2px 15px rgb(230, 229, 235);
          padding: 30px;
          border-radius: 12px;
          background: #ffff;
          backdrop-filter:blur(10px);
          display: grid;
          grid-template-rows: max-content max-content 1fr;
          transition: all .3s ease-in-out;
    }
    .MoricLoginContent h2{
          width: 100%;
          text-align: center;
          font-size: 2em;
          font-family: 'Luckiest';
          font-weight: 500;
          letter-spacing: 3px;
          color: #052630;
    }
    .background_top{
          width: 100%;
          padding: 20px 0;
          display: none;
          align-items: center;
    }
    .top_icon{
          color: #157efb;
          font-size: 1em;
          cursor: pointer;
    }
    .top_titile{
          margin-left: .6em;
          font-size: 1em;
    }
    .MoricLoginContent form{
          width: 100%;
          height: 100%;
    }
    .headSculpture{
        width: 100%;
        padding: 1em 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .inputSearch{
        position: relative;
        width: 80pt;
        height: 80pt;
        border-radius: 50%;
        background: #f4f4f4;
    }
    .inputSearch img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
    .inputheadSculpture{
        position: absolute;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20pt;
        height: 20pt;
        border-radius: 50%;
        font-size: 14pt;
        font-weight: 400;
        background-color:  #f0eff4;
        opacity: 0.8;
        color:  #052630;
        cursor:pointer;
    }
    .inputheadSculpture input{
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .inputheadSculpture::after{
        position: absolute;
        content: '';
        z-index: -10;
    }
    .inputMsg {
        width: 100%;
        height: 2rem;
        display: grid;
        position: relative;
        grid-template-columns: 3em 1fr;
        justify-content: center;
        align-items: center;
        color: #8f8e94;
        border-bottom: 3px solid #8f8e94;
    }
    .inputMsg::before{
        content: " 输入错误";
        font-size: .6em;
        font-weight: 400;
        top: -16px;
        right: 0;
        position: absolute;
        color: #fc3d38;
        border-left: solid 5px #fc3d38;
        padding: 5px 10px;
        z-index: 10;
        display: none;
    }
    .inputMsg + .inputMsg{
    margin: 1.5em 0;
    }
    .inputMsg span{
        display: flex;
        font-size: 1em;
        padding: 0 5px;
        height: 60%;
        color: inherit;
        justify-content: center;
        align-items: center;
        border-right: solid 2px #8f8e94;
    }
    .inputMsg input{
        position: relative;
        width: 100%;
        height: 90%;
        text-indent: 1em;
        outline: none;
        font-size: 1em;
        border:none;
    }
    .inputMsg input::placeholder{
        font-family: 'Luckiest';
        letter-spacing: 3px;
    }
    .inputMsg input:focus{
        outline: none;
        /* box-shadow: 0 2px 2px rgb(230, 229, 235); */
        /* border-bottom: 3px solid rgb(21, 126, 251); */
    }
    .active{
        border-bottom: 3px solid rgb(21, 126, 251);
    }
    .active span{
        color: rgb(21, 126, 251);
        border-right: solid 2px rgb(21, 126, 251);
    }
    .active input{
        color: rgb(21, 126, 251);
    }
    .active input::placeholder{
        color: rgb(21, 126, 251);
    }
    .err{
        border-bottom: 3px solid #fc3d38;
    }
    .err span{
        color: #fc3d38;
        border-right: solid 2px #fc3d38;
    }
    .err input{
        color: #fc3d38;
    }
    .err input::placeholder{
        color: #fc3d38;
    }
    .err::before{
        display: block;
    }
    .loginCheckBox{
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        height: 24pt;
        border-radius: 12px;  
        font-size: 8pt;
    }
    .checkbox-container{
        height: max-content;
    }
    .checkbox-container input {
        width: 100%;
        display: none;
        white-space:nowrap;
    }
    /* 定义自定义复选框的样式 */
    .checkbox-container .checkmark {
        display: inline-block;
        width: 10pt;
        height: 10pt;
        border-radius: 15px;
        border: 1px solid #ccc;
        vertical-align: middle;
        cursor: pointer;
        margin-right: 10px;
    }
    /* 当复选框被选中时，修改复选框的外观 */
    .checkbox-container input:checked + .checkmark:before {
        content: '\2714'; /* Unicode字符编码，表示勾号 */
        display: block;
        text-align: center;
        font-size: 8pt;
        line-height: 10pt; /* 与复选框的高度相同 */
    }
    .loginSubmit{
        display: flex;
        justify-content: center;
        width: 100%;
        height: 34pt;
        border-radius: 12px;  
        cursor: pointer;
        margin-top: 1em;
    }
    .loginSubmit a{
        position: relative;
        font-style: normal;
        text-decoration: none;
        display:block;
        background: #052630;
        color: #f2efe5;
        width: 90%;
        height: 100%;
        font-size: 17pt;
        border-radius: 12px;
        text-align: center;
        line-height: 34pt;
    }
    .loginSubmit a:after{
        content: "";
        position: absolute;
        display: inline-block;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        border-radius: 15px;
        z-index: -1;
        transition: all .4s;
        background: #052630;
    }
    .loginSubmit a:hover{
        transform: translateY(-3px);
        box-shadow: 0 10px 10px rgba(0, 0, 0,.2);
    }.loginSubmit a:active{
        transform: translateY(-1px);
        box-shadow: 0 5px 5px rgba(0, 0, 0,.2);
    }
    .loginSubmit a:hover:after{
        transform:scaleX(1.4) scaleY(1.6);
        opacity: 0;
    }
    .loginOtherContentBottom{
    cursor: pointer;
    margin-top: 1em;
    font-size: .6em;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 20pt;
    }
    .loginOtherContentBottom p{
        display: flex;
        width: max-content;
        align-items: center;
    }
    .loginOtherContentBottom a{
        text-decoration: none;
        /* background-color: #ffff; */
        transition: all .2s;
        color: #167efd;
        position: relative;
    }

    .hoverClass:hover,.hoverClass:active{
        margin-left: 1em;
        color: #53d86a;
        font-weight: 600;
        transform: rotate(5deg) scale(1.6);
        padding: 2px 5px;
        /* box-shadow: 0 3px 2px rgba(0, 0, 0,.4); */
    }
    @media(max-width:767px){
        .MoricLoginContent{
            width: 100%;
            height: 100%;
            grid-template-rows: 5em max-content max-content;
            gap: 2em;
        }
        .MoricLoginContent h2{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-content: center;
        }
        .inputMsg{
            height: 5em;
        }
        .background_top{
            transition: all .3s ease-in-out;
            display: flex;
            font-size: 14pt;
            font-weight: 600;
        }
    }
</style>../scripts/registerChecker../scripts/InputDetection