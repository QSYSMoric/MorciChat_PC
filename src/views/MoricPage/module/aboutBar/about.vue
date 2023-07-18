<template>
    <h1>
      这里是关于页面
    </h1>
</template>

<script setup>
  import { onBeforeRouteLeave,useRoute } from 'vue-router';
  import PubSub from 'pubsub-js';
  const route = useRoute();
  PubSub.publish(`${route.name}on`);
  onBeforeRouteLeave((to,from)=>{
    PubSub.publish(`${from.name}off`)
  });
</script>

<style>

</style>