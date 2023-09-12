<template>
    <div class="chatRoom">
        <div class="roomMsg">
            <span> {{chatUserMsg.chatRoomName}}</span>
            <span></span>
        </div>
        <ChatRoomHistory :chatId="chatObjId"></ChatRoomHistory>
        <ChatRoomSend></ChatRoomSend>
    </div>
</template>

<script setup>
    import ChatRoomSend from './ChatRoomSend.vue';
    import ChatRoomHistory from './ChatRoomHistory.vue';
    import { useRoute } from 'vue-router';
    import { useUserInformation } from '@/store/userInformation';
    import { reactive, ref,watch } from 'vue';
    //传入的参数
    const route = useRoute();
    let chatObjId = ref(route.params.chatObjId);
    //页面信息
    const userInforMation = useUserInformation();
    let chatUserMsg = reactive({
        chatRoomName:null,
    });
    //初始化时候
    userInforMation.getUserInfoById(chatObjId.value).then((data)=>{
        chatUserMsg.chatRoomName = data.userName
    }).catch((err)=>{
        console.log(err.message);
    });
    //监听传入的chatId用来更新聊天历史记录
    watch(()=>{
        return route.params.chatObjId;
    },(newUserId)=>{
        if(newUserId){
            chatObjId.value = newUserId;
            //重新获取房间信息
            userInforMation.getUserInfoById(newUserId).then((data)=>{
                chatUserMsg.chatRoomName = data.userName
            }).catch((err)=>{
                console.log(err.message);
            });
        }
    },{
        deep:true
    });

</script>

<style>
    .chatRoom{
        position: relative;
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