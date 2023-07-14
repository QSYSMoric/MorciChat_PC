<template>
  <div class="MoricHome">
      <div class="MoricHome_homeContent">
        <MoricHomeHamburgButton/>
        <transition name="fade">
          <div 
          class="MoricHome_homeMask" 
          v-show="maskLayerDisplay">
            <h1 class="homeMaskFont homeMaskTitle">
              MORIC CHAT
            </h1>
            <p class="homeMaskFont homeMaskMsg">
              基于Vue、Node、Mysql的在线聊天室
            </p>
            <button class="homeMaskFont homeMaskSing" @click="go">
              click
            </button>
          </div>
        </transition>
        <div class="MoricHome_login" v-if="!maskLayerDisplay">
        </div>
      </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
import Pubsub from 'pubsub-js'
import { useRouter } from 'vue-router';
import MoricHomeHamburgButton from '@/views/MoricHome/components/MoricHomeHamburgButton';
export default {
    name:"MoricHome",
    setup(){
      const maskLayerDisplay = ref(true);
      const router = useRouter();
      function hideMaskLayer(){
        maskLayerDisplay.value = !maskLayerDisplay.value;
      }
      Pubsub.subscribe("Scale",hideMaskLayer);

      function go(){
        router.push({
          path:"/Login/Operatelogin",
          name:"Operatelogin"
        });
      }

      return {
        maskLayerDisplay,
        hideMaskLayer,
        go
      }
    },
    components:{
      MoricHomeHamburgButton,
    }
}
</script>

<style lang="scss">
  .MoricHome{
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .MoricHome_homeContent{
    position: relative;
    width: 95%;
    height: 95%;
    border-radius: 12px;
    /* background: #c8c7cd; */
  }
  @media(max-width:767px){
    .MoricHome_homeContent{
      width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }

  .MoricHome_homeMask{
    position:absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-wrap: wrap;
    /* background-image:linear-gradient(to right bottom,
    rgba(126,213,111,.8),
    rgba(40,180,131,.8)),
    url(../../assets/103791888_p0.png); */
    background: var(--background);
    background-size: cover;
    background-position: center;
    box-shadow: 0 0 10px #c8c7cd;
    clip-path: polygon(0 0,100% 0,100% 85%,0 100%);
    border-radius: 12px;
    transition: all .5s;
  }
  @media(max-width:767px){
    .MoricHome_homeMask{
      padding: 24px;
      clip-path: none;
      border-radius: 0;
    }
  }
  .homeMaskFont{
    font-family: 'Luckiest';
    color: var(--color);
  }
  .homeMaskTitle{
    text-align: center;
    font-size: 5rem;
    word-spacing: 1rem;
    letter-spacing: 5px;
    margin-bottom: 20px;
    animation:moveInLeft 1s ease-out;
  }
  .homeMaskMsg{
    font-size: 1rem;
    word-spacing: 2rem;
    letter-spacing: 5px;
    font-weight: 400;
    animation:moveInRight 1s ease-out;
  }
  .homeMaskSing{
    width: 12rem;
    height: 3rem;
    margin-top: 3rem;
    color: var(--background);
    font-size: 2rem;
    position: relative;
    border-radius: 15px;
    animation:moveBottom .5s ease-out .75s;
    animation-fill-mode: backwards;
  }
  .homeMaskSing::after{
    content: "";
    position: absolute;
    display: inline-block;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    border-radius: 15px;
    z-index: -1;
    transition: all .4s;
    background: #ffff;
  }
  .homeMaskSing:hover:after{
    transform:scaleX(1.4) scaleY(1.6);
    opacity: 0;
  }
  .homeMaskSing:hover{
    transform: translateY(-3px);
    box-shadow: 0 10px 10px rgba(0, 0, 0,.8);
  }
  .homeMaskSing:active{
    transform: translateY(-1px);
    box-shadow: 0 5px 5px rgba(0, 0, 0,.8);
  }
  .homeMaskSing:active .MoricHome_homeContent{
    width: 0;
    height: 0;
  }
  @keyframes moveInLeft{
    0%{
      opacity: 0;
      transform: translateX(-100px);
    }
    80%{
      transform: translateX(10px);
    }
    100%{
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes moveInRight{
    0%{
      opacity: 0;
      transform: translateX(100px);
    }
    80%{
      transform: translateX(-10px);
    }
    100%{
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes moveBottom{
    0%{
      opacity: 0;
      transform: translateY(30px);
    }
    100%{
      opacity: 1;
      transform: translateY(0);
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all .5s ease-out;
  }
  /* 进入的终点，离开的起点 */
  .fade-enter-to,.fade-leave{
    transform: scale(1);
    opacity: 1;
  }
  /* 离开的终点，进入的起点 */
  .fade-leave-to,.fade-enter{
    transform-origin:right top;
    transform: scale(0);
    opacity: 0;
  }
  .MoricHome_login{
    width: 50%;
    height: 100%;
  }
</style>