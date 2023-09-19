<template>
    <section class="useOperation">
        <nav class="useOperationTitle">
            <i></i> 好友申请
        </nav>
        <ul class="useOperationList">
            <FriendOperationItem 
            v-for="node in friendList.getFriendApplicationList" 
            :friendApplication="node"
            :key="node"></FriendOperationItem>
        </ul>
    </section>
</template>

<script setup>
    import FriendOperationItem from './FriendOperationItem.vue';
    import { useFriendListStore } from '@/store/friendListSessionStore';
    const friendList = useFriendListStore();

</script>

<style>
    .useOperation{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        gap: 10px;
    }
    .useOperationTitle{
        width: 100%;
        font-size: 18px;
        background: #ffff;
        padding: 8px 15px;
        border-radius: 8px;
    }
    .useOperationTitle > i{
        font-style: normal;
        font-weight: 600;
    }
    .useOperationList{
        width: 100%;
        height: 100%;
        background: #ffff;
        border-radius: 8px;
        overflow: auto;
    }
</style>