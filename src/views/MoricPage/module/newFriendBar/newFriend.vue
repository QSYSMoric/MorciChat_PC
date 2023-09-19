<template>
    <main class="myFriends">
      <BriefIntroduction/>
      <div class="myFriendList">
        <FriendList></FriendList>
      </div>
      <div class="friendOperation">
        <FriendOperation></FriendOperation>
      </div>
    </main>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import BriefIntroduction from "./components/BriefIntroduction.vue";
  import FriendList from './components/FriendList.vue';
  import FriendOperation from './components/FriendOperation.vue';
  import PubSub from 'pubsub-js';

  PubSub.publish(`newFriendBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`newFriendBaroff`);
  });
</script>

<style>
  .myFriends{
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 50% 1fr;
    grid-template-rows: 46% 54%;
    grid-template-areas: "topLeft topRight"
                          "bottom bottom";

  }
  .myFriendList{
    grid-area: topRight;
  }
  .friendOperation{
    grid-area: bottom;
    padding: 15px 0px 0 22px;
  }
</style>