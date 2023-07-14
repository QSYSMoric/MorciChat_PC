<template>
  <div class="MoricLoginContent">
        <h2>欢迎</h2>
        <form>  
            <div class="inputMsg active">
                <span>
                    
                </span>
                <input 
                type="text" 
                placeholder="Id">
            </div>
            <div class="inputMsg">
                <span>
                    
                </span>
                <input 
                type="text" 
                placeholder="PAS">
            </div>
            <div class="loginCheckBox">
                <label class="checkbox-container">
                    <input type="checkbox">
                    <span class="checkmark"></span>隐私通知
                </label>
            </div>
            <div class="loginSubmit">
                <a @click.stop>登录</a>
            </div>
        </form>
  </div>
</template>

<script>
export default {
    name:"MoricLoginContent",
    setup(){

    }
}
</script>

<style scoped>
    .MoricLoginContent{
        width: 65%;
        /* height: 70%; */
        box-shadow: 2px 2px 15px rgb(230, 229, 235);
        padding: 30px;
        border-radius: 12px;
        background: #ffff;
        backdrop-filter:blur(10px);
        display: grid;
        grid-template-rows: 2em max-content 1fr 1fr;
    }
    .MoricLoginContent h2{
        width: 100%;
        text-align: center;
        font-size: 2rem;
        font-weight: 500;
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
    }
</style>