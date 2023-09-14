<template>
    <li @click="selectChatUser" :class="{chatActive:user.active}" class="chatUserItem">
        <div class="chatUserListAvatar">
            <img :src="listItemMsg.img" alt="头像" v-if="listItemMsg.img">
            <img src="@/assets/groupChat.png" alt="默认头像" v-else>
        </div>
        <div class="chatUserListChatMain">
            <div class="userChatInfo">
                <span>
                    {{listItemMsg.name}}
                </span>
                <span>
                    {{listItemMsg.lastMsgTiming}}
                </span>
            </div>
            <div class="userChatLastMsg">
                <p>
                    {{listItemMsg.lastMsg}}
                </p>
            </div>
        </div>
    </li>  
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useUserInformation } from '@/store/userInformation';
    import PubSub from 'pubsub-js';
    const props = defineProps(['user',"select"]);
    let user = ref(props.user);

    //记录用户点击了哪个id
    function selectChatUser(){
        user.value.onActive();
        props.select(user.value);
    }
    //当前list的信息设置
    const userInformation = useUserInformation();
    const listItemMsg = reactive({
        img:null,
        name:null,
        lastMsg:"暂时没有新的消息",
        lastMsgTiming:"2023",
    });

    //获取最后一条信息
    PubSub.subscribe(`chat${user.value.friendId}LastMsg`,(_,newChat)=>{
        if(!newChat){
            return;
        }
        listItemMsg.lastMsgTiming = `${newChat.timing.monthDay} ${newChat.timing.hourMinute}`;
        listItemMsg.lastMsg = newChat.text_content;
    });

    //获取当前用户信息
    userInformation.getUserInfoById(user.value.friendId).then((data)=>{
        listItemMsg.name = data.userName;
        listItemMsg.img = data.userProfile;
    }).catch((err)=>{
        console.log(err.message);
    });
</script>

<style>
    .chatUserItem{
        display: grid;
        grid-template-columns: 48px 1fr;
        width: 100%;
        padding: 15px;
        cursor: pointer;
    }
    .chatUserItem:hover{
        background: #e4e5e6;
    }
    .chatUserListAvatar{
        width: 40px;
        height: 40px;
    }
    .chatUserListAvatar > img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
        transition: all .1s linear;
    }
    .userChatInfo{
        display: flex;
        justify-content: space-between;
    }
    .userChatInfo > span{
        color: #052630;
        font-size: 14px;
    }
    .userChatInfo > span:nth-child(2){
        font-size: 8px;
        color:#8f8e94;
    }
    .userChatLastMsg{
        padding-top: 8px;
        font-size: 13px;
        margin-bottom: -6px;
        color: #8f8e94;
    }
    .chatActive{
        background: #e4e5e6;
    }
</style>