<template>
    <h1>
      这里是聊天页面
    </h1>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import PubSub from 'pubsub-js';

  onBeforeRouteLeave((to,from)=>{
    PubSub.publish(`${from.name}off`)
  });
</script>

<style>

</style>
  