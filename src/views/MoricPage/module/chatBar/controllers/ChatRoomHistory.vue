<template>
    <ul class="chatRoomHistory">
        <li>
            <div class="chatUserMsg">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
            </div>
            <div class="chatUserText">
                12341
            </div>
            <div class="chatUserTextTiming">12:00</div>
        </li>
        <li>
            <div class="chatUserMsg">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
            </div>
            <div class="chatUserText">
                12341
            </div>
            <div class="chatUserTextTiming">12:00</div>
        </li>
        <li>
            <div class="chatUserMsg">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
            </div>
            <div class="chatUserText">
                123411233333333333333333333333333333333333333333344
            </div>
            <div class="chatUserTextTiming">12:00</div>
        </li>
    </ul>
</template>

<script setup>
    import { watch } from "vue";
    import PubSub from 'pubsub-js';
    import { onBeforeRouteLeave } from 'vue-router';
    
    let props = defineProps(["chatId"]);
    PubSub.publish(`chat${props.chatId}ActiveOn`);
    //监听传入参数变化
    watch(()=>{
        return props.chatId
    },(newValue,oldValue)=>{
        //关闭之前的选中
        if(oldValue){
            PubSub.publish(`chat${oldValue}ActiveOff`);
        }
        //打开新的选中
        PubSub.publish(`chat${newValue}ActiveOn`);
    });
    //离开本页面之前清除选中状态
    onBeforeRouteLeave(()=>{
        PubSub.publish(`chat${props.chatId}ActiveOff`);
    });
</script>

<style>
    .chatRoomHistory{
        width: 100%;
        min-height: 100%;
        overflow: auto;
        padding: 52px 0 170px 0;
    }
    .chatRoomHistory li{
        display: flex;
        /* flex-direction: row-reverse; */
        /* justify-content: flex-end; */
        padding: 0 16px 16px;
    }
    .chatUserMsg{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .chatUserMsg img{
        object-fit: cover;
        border-radius: 50%;
    }
    .chatUserText{
        margin: 0 10px;
        padding: 8px 16px;
        line-height: 1.5;
        font-size: 14px;
        min-height: 37px;
        max-width: 60%;
        word-wrap: break-word;
        word-break: break-word;
        border-radius: 0 10px 10px 10px;
        overflow: hidden;
        position: relative;
        background: #fff;
    }
    .chatUserTextTiming{
        display: flex;
        align-items: flex-end;
        font-size: 8px;
        color: #8f8e94;
    }
</style>