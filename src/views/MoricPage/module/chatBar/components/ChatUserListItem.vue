<template>
    <li @click="selectChatUser" 
    :class="{
        chatActive:props.user.active,
        readed:chathistoty.getUnRead(props.user.lastContacttime,props.user.historyId)
    }" 
    :data_noRead="chathistoty.getUnRead(props.user.lastContacttime,props.user.historyId)" 
    class="chatUserItem">
        <div class="chatUserListAvatar">
            <img :src="listItemMsg.img" alt="头像" v-if="listItemMsg.img">
            <img src="@/assets/groupChat.png" alt="默认头像" v-else>
        </div>
        <div class="chatUserListChatMain">
            <div class="userChatInfo">
                <span>
                    {{listItemMsg.name}}
                </span>
                <span v-if="chathistoty.getLastHistory(props.user.historyId)">
                    {{ chathistoty.getLastHistory(props.user.historyId).timing.monthDay }}
                    {{ chathistoty.getLastHistory(props.user.historyId).timing.hourMinute }}
                </span>
            </div>
            <div class="userChatLastMsg">
                <p v-if="chathistoty.getLastHistory(props.user.historyId)">
                    {{ chathistoty.getLastHistory(props.user.historyId).text_content }}
                </p>
            </div>
        </div>
    </li>  
</template>

<script setup>
    import { reactive } from 'vue';
    import { useUserInformation } from '@/store/userInformation';
    import { useChatHistoryByUserId } from '@/store/chatHistoryByUserIdStore';
    const props = defineProps(['user',"select"]);
    const chathistoty = useChatHistoryByUserId();
    //记录用户点击了哪个id
    function selectChatUser(){
        props.user.onActive();
        props.select(props.user);
        chathistoty.updateLastContactTime(props.user);
    }
    //当前list的信息设置
    const userInformation = useUserInformation();
    const listItemMsg = reactive({
        img:null,
        name:null,
        lastMsg:chathistoty.getLastHistory(props.user.historyId)
    });
    //获取当前用户信息
    userInformation.getUserInfoById(props.user.friendId).then((data)=>{
        listItemMsg.name = data.userName;
        listItemMsg.img = data.userProfile;
    }).catch((err)=>{
        console.log(err.message);
    });
</script>

<style>
    .chatUserItem{
        display: grid;
        position: relative;
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
    .readed::before{
        content: attr(data_noRead);
        position: absolute;
        bottom: 12px;
        right: 15px;
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fc3d38;
        color: #fff;
        font-size: 2px;
        border-radius: 50%;
    }
</style>