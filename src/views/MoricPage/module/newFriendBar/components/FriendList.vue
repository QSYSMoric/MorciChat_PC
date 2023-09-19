<template>
    <div class="friends">
        <nav class="friendTitle">
            <span>
                
            </span>
            <span>
                好友列表
            </span>
        </nav>
        <ul class="fridendLsit" v-if="friendList.getFriendUserList.length">
            <FriendListItem 
            v-for=" node in friendList.getFriendUserList" 
            :friend = "node"
            :key="node"
            ></FriendListItem>
        </ul>
    </div>
</template>

<script setup>
    import FriendListItem from './FriendListItem.vue';
    import { useFriendListStore } from '@/store/friendListSessionStore';
    const friendList = useFriendListStore();
</script>

<style>
    .friends{
        width: 100%;
        height: 100%;
        /* background: #ffffff; */
        border-radius: 10px;
        display: grid;
        grid-template-rows: max-content 1fr;
        gap: 5px;
    }
    .friendTitle{
        width: 100%;
        padding: 5px 15px;
        /* background-color: #157efb; */
        font-size: 0.7em;
        background: #ffffff;
        border-radius: 5px;
    }
    .fridendLsit{
        width: 100%;
        height: 100%;
        border-radius: 5px;
        overflow: auto;
        background: #ffffff;
    }
</style>
