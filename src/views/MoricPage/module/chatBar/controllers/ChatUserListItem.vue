<template>
    <li @click="tempFn()" :class="{chatActive:user.active}" class="chatUserItem">
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
                    13:00
                </span>
            </div>
            <div class="userChatLastMsg">
                <p>
                    最后一条消息
                </p>
            </div>
        </div>
    </li>  
</template>

<script setup>
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserInformation } from '@/store/userInformation';
    import PubSub from 'pubsub-js';
    const router= useRouter();
    const props = defineProps(['user']);
    let user = ref(props.user);
    //安装状态选中效果，根据聊天历史记录决定选中谁
    //被选中
    PubSub.subscribe(`chat${user.value.id}ActiveOn`,()=>{
        user.value.onActive();
    });
    //未选中
    PubSub.subscribe(`chat${user.value.id}ActiveOff`,()=>{
        user.value.offActive();
    });
    //当前list的信息设置
    const userInformation = useUserInformation();
    const listItemMsg = reactive({
        img:null,
        name:null,
    });

    userInformation.getUserInfoById(user.value.id).then((data)=>{
        listItemMsg.name = data.userName;
        listItemMsg.img = data.userProfile;
    }).catch((err)=>{
        console.log(err.message);
    });

    function tempFn(){
        router.push({
            path:`chatBar/chatRoom`,
            name:"chatRoom",
            params: {
                chatObjId:user.value.id
            }
        });
    }
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