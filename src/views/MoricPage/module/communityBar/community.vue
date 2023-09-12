<template>
  <div class="community">
    <div>
      <HeadPublishingArea/>
    </div>
    <div>
      <ShowMomentsArea/>
    </div>
  </div>
</template>

<script setup>
  import { onBeforeRouteLeave,useRoute } from 'vue-router';
  import PubSub from 'pubsub-js';
  import HeadPublishingArea from './components/HeadPublishingArea.vue';
  import ShowMomentsArea from './components/ShowMomentsArea.vue';
  const route = useRoute();
  PubSub.publish(`${route.name}on`);
  onBeforeRouteLeave((to,from)=>{
    PubSub.publish(`${from.name}off`);
  });
</script>

<style>
  .community{
    width: 100%;
    overflow: auto;
    height: 100%;
  }
</style>
