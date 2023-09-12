<template>
    <aside class="chatUserList">
        <div class="chatUserListTitle">我的消息</div>
        <ul class="chatUserListContent">    
            <ChatUserListItem v-for="(user,index) in userList" :user="user" :key="index"></ChatUserListItem>
        </ul>
    </aside>
</template>

<script setup>
    import ChatUserListItem from './ChatUserListItem.vue';
    import { useRouter } from 'vue-router';
    import { useChatUserList } from '@/store/chatFriendListSessionStore';

    //获取后台聊天历史记录对象
    const chatUserList = useChatUserList();
    let userList = chatUserList.getChatUserList;

    //默认导航第一个聊天页面
    const router= useRouter();
    router.push({
        path:`chatBar/chatRoom`,
        name:"chatRoom",
        params: {
            chatObjId:Boolean(userList[0])?userList[0].id:90000
        }
    });
    

</script>

<style scoped>
    .chatUserList{
        width: 100%;
        height: 100%;
        background: #ffff;
        overflow: auto;
        border-radius: 10px;
    }
    .chatUserList::-webkit-scrollbar{
        opacity: 0;
        display: none;
        position: absolute;
        z-index: 1;
    }
    .chatUserListTitle{
        padding: 15px;
        font-size: 18px;
    }
</style>@/store/chatFriendListSessionStore