<template>
    <ul class="chatRoomHistory">
        <li class="warning">
            若非好友，发送消息的历史记录将不再保存！！！
        </li>
        <ChatHistoryItem v-for="(node) in chatHIstory.getChatHistoryById(historys)" :key="node" :chat="node"></ChatHistoryItem>
    </ul>
</template>

<script setup>
    import ChatHistoryItem from './ChatHistoryItem.vue'
    import { ref, watch } from "vue";
    import { useChatHistoryByUserId } from '@/store/chatHistoryByUserIdStore';
    let props = defineProps(["historyId"]);
    //获取聊天记录
    let chatHIstory = useChatHistoryByUserId();
    //页面初始化
    let historys = ref(props.historyId)
    //监听传入参数变化
    watch(()=>{
        return props.historyId
    },(newValue)=>{
        historys.value = newValue;
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