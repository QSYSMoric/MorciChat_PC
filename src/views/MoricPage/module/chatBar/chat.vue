<template>
  <section class="chatBar">
    <!-- 聊天对象列表 -->
    <ChatUserList/>
    <!-- 对应的历史记录 -->
    <router-view></router-view>
  </section>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import PubSub from 'pubsub-js';
  import ChatUserList from '@/views/MoricPage/module/chatBar/controllers/ChatUserList';

  PubSub.publish(`chatBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`chatBaroff`);
  });
</script>

<style>
  .chatBar{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 240px 1fr;
  }
</style>
  