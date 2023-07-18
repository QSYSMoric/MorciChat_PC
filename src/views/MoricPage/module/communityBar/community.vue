<template>
  <div>
    <headPublishingArea/>
  </div>
</template>

<script setup>
  import { onBeforeRouteLeave,useRoute } from 'vue-router';
  import PubSub from 'pubsub-js';
  import headPublishingArea from '@/views/MoricPage/module/communityBar/components/headPublishingArea'
  const route = useRoute();
  PubSub.publish(`${route.name}on`);
  onBeforeRouteLeave((to,from)=>{
    PubSub.publish(`${from.name}off`)
  });
</script>

<style>

</style>
