<template>
  <footer class="chatRoomSending">
    <div class="chatRoomExpression">
        <span>
            
        </span>
        <span>
            
        </span>
    </div>
    <textarea
        placeholder="输入内容"
        v-model="inputText.value"
        ref="textareaNode">
    </textarea>
    <div class="chatRoomSendingToFriend">
        <div class="chatRoomCount">
            500/500
        </div>  
        <div class="chatRoomSubmit">
            <button class="postCommentsButton">
              发送
            </button>
        </div>
    </div>
  </footer>
</template>

<script setup>
    import { ref,reactive } from "vue";

    //控制输入内容自动增长
    const textareaNode = ref(null);
    //绑定输入内容
    const inputText = reactive({
        value:"",
    });
</script>

<style>
    .chatRoomSending{
        position: absolute;
        border-top:1px solid #8f8e94;
        bottom: 0;
        padding: 0 16px;
        width: 100%;
        height: 162px;
        background-color: #ffff;
        border-radius: 0 0 10px 10px;
    }
    .chatRoomExpression{
        display: flex;
        align-items: center;
        height: 48px;
    }
    .chatRoomExpression span{
        font-size: 18pt;
        color: #8f8e94;
        cursor: pointer;
        transition:transform .1s linear ;
    }
    .chatRoomExpression span:hover{
        transform: scale(1.1);
    }
    .chatRoomExpression span + span{
        margin-left: 10px;
    }
    .chatRoomSending > textarea{
        background: transparent;
        overflow: auto;
        width: 100%;
        height: 60px;
        appearance: none;
        border: none;
        outline: none;
        box-sizing: border-box;
        font-size: 14px;
        resize: none;
        overflow: hidden;
    }
    .chatRoomSendingToFriend{
        padding: 0 16px;
        display: flex;
        justify-content: flex-end;
        width: 100%;
        height: 46px;
    }
    .chatRoomCount{
        font-size: 12px;
        color: #8f8e94;
    }
    .chatRoomSendingToFriend div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chatRoomSendingToFriend div + div{
        margin-left: 10px;
    }
    .postCommentsButton{
        width: 80px;
        cursor: pointer;
        background: none;
        padding: 5px 20px;
        background: #157efb;
        color: #ffffff;
        transition: transform .2s linear;
        border-radius: 5px;
    }
    .postCommentsButton:hover{
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .postCommentsButton:active{
        transform: translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
</style>