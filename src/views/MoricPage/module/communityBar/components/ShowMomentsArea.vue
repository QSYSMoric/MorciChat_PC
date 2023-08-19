<template>
  <ul class="showMoments">
    <TransitionGroup 
    name="list"
    enter-active-class="animate__animated animate__fadeInRight">
      <Moments v-for="element in momentList.getMomentsList" :momentsObj="element" :key="element"/>
    </TransitionGroup>
  </ul>
</template>

<script setup>
    import Moments from './Moments.vue';
    import { useMomentsStore } from '@/store/momentsSessionStore';

    let momentList = useMomentsStore();

</script>

<style scoped>
  .showMoments{
    display: grid;
    width: 100%;
    border-radius: 15px;
    padding: 20px 0;
    gap: 20px;
  }
  .showMoments > li{
    width: 100%;
    border-radius: 15px;
    padding: 20px;
    overflow: hidden;
    background: #fff;
  }
  .list-move, /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }
</style>