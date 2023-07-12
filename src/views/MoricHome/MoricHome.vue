<template>
  <div class="MoricHome">
      <div class="MoricHome_homeContent">
        <transition name="fade">
          <div 
          class="MoricHome_homeMask" 
          :class="maskClass"
          v-if="maskLayerDisplay">
            <h1 class="homeMaskFont homeMaskTitle">
              MORIC CHAT
            </h1>
            <p class="homeMaskFont homeMaskMsg">
              基于Vue、Node、Mysql的在线聊天室
            </p>
            <button class="homeMaskFont homeMaskSing" @click="hideMaskLayer">
              click
            </button>
          </div>
        </transition>
        <div class="MoricHome_login">
        </div>
      </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
    name:"MoricHome",
    setup(){
      const maskLayerDisplay = ref(true);
      const maskClass = reactive({
        MoricHome_homeMask_Hiden:false
      });

      function hideMaskLayer(){
        maskClass.MoricHome_homeMask_Hiden = true;
        maskLayerDisplay.value = false;
      }

      return {
        maskLayerDisplay,
        maskClass,
        hideMaskLayer
      }
    }
}
</script>

<style>
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
    width: 80%;
    height: 80%;
    border-radius: 12px;
  }
  @media(max-width:767px){
    .homeContent{
      width: 100%;
      height: 100%;
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
    clip-path: polygon(0 0,100% 0,100% 90%,0 100%);
    border-radius: 12px;
    transition: all .5s;
  }
  .MoricHome_homeMask_Hiden{
    /* width: 0;
    height: 0; */
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
    transition: all .5s;
  }
  .fade-enter{
    opacity: 1;
  }
  .fade-leave-to {
    overflow: hidden;
    transform-origin: center center;
    transform: scale(0);
    /* display: none; */
    opacity: 0;
  }
  /* .MoricHome_login{
    width: 50%;
    height: 100%;
    background: #c8c7cd;
  } */
</style>