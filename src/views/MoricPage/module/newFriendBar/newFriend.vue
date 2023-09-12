<template>
    <h1>
      这里是好友页面
    </h1>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import PubSub from 'pubsub-js';

  PubSub.publish(`newFriendBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`newFriendBaroff`);
  });
</script>

<style>

</style>