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
    <h2>Moric</h2>
    <form>  
        <div class="animate__animated inputMsg" :class="userId.class">
            <span>
                
            </span>
            <input 
            v-focus="'active'"
            type="text" 
            v-model="userId.data"
            @focus="userId.offErr()"
            placeholder="Id">
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
            @focus="password.offErr()"
            placeholder="PAS">
        </div>
        <div class="loginCheckBox">
            <label class="checkbox-container">
                <input type="checkbox">
                <span class="checkmark"></span>隐私通知
            </label>
        </div>
        <div class="loginSubmit">
            <a @click.stop="loginSubmit">登录</a>
        </div>
    </form>
    <div class="loginOther">
        <p>其他登录方式?</p>
        <div class="loginOtherContent">
            <div class="loginOtherContentTop">
                <ul>
                    <li style="color: #167efd;"></li>
                    <li style="color: #d52c2b;"></li>
                    <li style="color: #28a8ea;"></li>
                </ul>                    
            </div>
            <div class="loginOtherContentBottom">
                <p>还没有账号?<a class="hoverClass" @click.stop="registerOnclick">去注册</a></p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import InputField from '@/views/MoricLogin/scripts/InputField';
    import { reactive } from 'vue';
    import loginChecker from '../scripts/InputDetection';
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
    const userId = reactive(new InputField());
    const password = reactive(new InputField());
    const router = useRouter();
    //注册跳转
    const registerOnclick = function(){
        router.replace({
            path:"/Login/OperateRegister",
            name:"OperateRegister"
        })
    }
    //登录按钮
    const loginSubmit = function(){
        let error = null;
        //检测输入信息
        //设置要执行的策略
        loginChecker.setStrategy("validUserIdStrategy");
        error = loginChecker.check(userId.data);
        if(!error){
            userId.onErr();
            return;
        }
        loginChecker.setStrategy("validPasswordStrategy");
        error = loginChecker.check(password.data);
        if(!error){
            password.onErr();
            return;
        }
        router.push({
            path:"/Page",
            name:"Page"
        });
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
    .inputMsg {
        width: 100%;
        height: 2rem;
        display: grid;
        margin-top: 2em;
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
        margin-top: 1em;
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
    .loginOther{
        margin-top: 20px;
        width: 100%;
        min-height: 100pt;
        border-radius: 15px;
        padding: 10px 20px 0 20px;
    }
    .loginOther p{
        display: flex;
        width: 100%;
        height: 20pt;
        font-size: 10pt;
    }
    .loginOtherContent{
        width: 100%;
        min-height: 60pt;
    }
    .loginOtherContentTop{
        display: flex;
        justify-content: center;
        height: 35pt;
        width: 100%;
    }
    .loginOtherContentTop ul{
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .loginOtherContentTop ul li{
        cursor: pointer;
        margin-top: .8em;
        display: flex;
        transition: all .2s;
        justify-content: center;
        align-items: center;
        width: 32pt;
        height: 32pt;
        font-size: 16pt;
        background: #f0eff4;
        /* box-shadow: 0 0 2px #f0eff4; */
        border-radius: 12px;
    }
    .loginOtherContentTop ul li:hover{
        transform: scale(1.5);
    }
    .loginOtherContentBottom{
        cursor: pointer;
        margin-top: 2em;
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
            font-size: 21pt;
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
</style>