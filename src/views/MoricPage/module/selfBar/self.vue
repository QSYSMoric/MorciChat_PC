<template>
    <h1>
      这里是个人页面
    </h1>
</template>

<script setup>
  import { onBeforeRouteLeave,useRoute } from 'vue-router';
  import PubSub from 'pubsub-js';

  PubSub.publish(`selfBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`selfBaroff`)
  });
</script>

<style>

</style>
  