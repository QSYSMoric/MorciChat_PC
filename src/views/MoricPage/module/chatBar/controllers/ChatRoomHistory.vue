<template>
    <ul class="chatRoomHistory" v-if="chatList.body.length">
        <li class="warning">
            若非好友，发送消息的历史记录将不再保存！！！
        </li>
        <ChatHistoryItem v-for="(node,index) in chatList.body" :key="index" :index="index" :chat="node"></ChatHistoryItem>
    </ul>
</template>

<script setup>
    import ChatHistoryItem from './ChatHistoryItem.vue'
    import { reactive, watch } from "vue";
    import PubSub from 'pubsub-js';
    import { onBeforeRouteLeave } from 'vue-router';
    import { useChatHistoryByUserId } from '@/store/chatHistoryByUserIdStore';
    let props = defineProps(["chatId"]);
    PubSub.publish(`chat${props.chatId}ActiveOn`);
    //获取聊天记录
    let chatHIstory = useChatHistoryByUserId();
    //页面初始化
    let chatList = reactive({
        body:chatHIstory.getChatHistoryById(Number(props.chatId))
    });
    //监听传入参数变化
    watch(()=>{
        return props.chatId
    },(newValue,oldValue)=>{
        //改变数据渲染
        chatList.body = chatHIstory.getChatHistoryById(Number(newValue));
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
        height: 100%;
        overflow: scroll;
        padding: 52px 0 170px 0;
    }

    .warning{
        display: flex;
        /* flex-direction: row-reverse; */
        /* justify-content: flex-end; */
        padding: 0 16px 16px;
        width: 100%;
        justify-content: center;
        color: var(--background);
        font-size: 12px;
    }
</style>