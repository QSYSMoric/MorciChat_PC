<template>
    <div class="chatRoom">
        <div class="roomMsg">
            <span> {{ chatUser.roomName }}</span>
            <span></span>
        </div>
        <ChatRoomHistory :historyId="chatUser.historyId"></ChatRoomHistory>
        <ChatRoomSend :chatId="chatUser.chatId" :historyId="chatUser.historyId"></ChatRoomSend>
    </div>
</template>

<script setup>
    import ChatRoomSend from './ChatRoomSend.vue';
    import ChatRoomHistory from './ChatRoomHistory.vue';
    import { useUserInformation } from '@/store/userInformation';
    import { reactive, watch } from 'vue';
    //用户信息仓库
    const userInformation = useUserInformation();
    const props = defineProps(["chatToUser"]);
    const chatUser = reactive({
        roomName:"",
        chatId:"",
        historyId:"",
    });

    //初始化房间信息
    if(props.chatToUser){
        chatUser.historyId = props.chatToUser.historyId;
        chatUser.chatId = props.chatToUser.friendId;
        userInformation.getUserInfoById(props.chatToUser.friendId).then((data)=>{
            chatUser.roomName = data.userName
        }).catch((err)=>{
            console.log(err);
        });
    }
    //监听对象id更新聊天历史
    watch(()=>{
        return props.chatToUser;
    },(newValue)=>{
        if(newValue){
            chatUser.historyId = newValue.historyId;
            chatUser.chatId = newValue.friendId
            //更改房间信息
            userInformation.getUserInfoById(newValue.friendId).then((data)=>{
                chatUser.roomName = data.userName
            }).catch((err)=>{
                console.log(err);
            });
        }
    },{
        deep:true
    });
</script>

<style>
    .chatRoom{
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        padding: 0 10px;
    }
    .roomMsg{
        position: absolute;
        top: 0;
        width: 100%;
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        padding: 6px 1em;
        border-radius: 10px 10px 0 0;
        background: #ffff;
        z-index: 10;
    }
    .roomMsg span{
        font-size: 16px;
        user-select: none;
    }
    .roomMsg span:nth-child(2){
        display: inline-block;
        cursor: pointer;
        font-size: 18px;
        font-weight: 600;
        transition: all .2s linear;
    }
    .roomMsg span:nth-child(2):hover{
        font-size: 21px;
    }
</style>