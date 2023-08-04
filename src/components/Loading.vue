<template>
  <div class="loading" v-show="isLoading">
    <div class="container">
        <div class="sun">
            <main class="sun_body">
                <span class="line" style="--i:1"></span>
                <span class="line" style="--i:2"></span>
                <span class="line" style="--i:3"></span>
                <span class="line" style="--i:4"></span>
                <span class="line" style="--i:5"></span>
                <span class="line" style="--i:6"></span>
                <span class="line" style="--i:7"></span>
                <span class="line" style="--i:8"></span>
            </main>
            <span class="eyes"></span>
        </div>
        <div class="horizon">
        </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from "vue";
    // const props = defineProps(['foo']);
    let isLoading = ref(true);
    //加载完毕前
    function isShow(){
        isLoading.value = true;
    }
    //加载完毕后
    function hide(){
        isLoading.value = false;
    }
</script>

<style>
    .loading{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #ffff;
        z-index: 99999;
    }
    .container{
        position: relative;
        width: 300px;
        height: 300px;
    }
    .container .sun{
        position: absolute;
        top: 135px;
        left: calc(50% - 136px / 2);
        width: 136px;
        height: 136px;
        animation: sun 2.7s linear infinite;
    }
    .sun_body{
        position: absolute;
        width: 100px;
        height: 100px;
        top: 18px;
        left: 18px;
        border-radius: 50%;
        border:solid 6px var(--background);
        animation: sun_body 2.7s linear infinite;
    }
    .sun_body .line{
        position: absolute;
        top: -24px;
        left: calc(50% - 3px);
        width: 6px;
        height: 12px;
        border-radius: 6px;
        background: var(--background);
        transform: rotate(calc(var(--i)*45deg));
        transform-origin: center 68px;
        
    }
    .sun .eyes{
        position: absolute;
        top: 60px;
        left: 40px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: var(--background);
        box-shadow: 16px 0 var(--background);
        animation: eyes 2.7s linear infinite;
    }
    .horizon{
        width: 100%;
        height: 115px;
        position: absolute;
        bottom: 0;
        background: #fff;
    }
    .horizon::before{
        content: "";
        position: absolute;
        left: 5%;
        width: 90%;
        height: 6px;
        border-radius: 6px;
        background: var(--background);
    }
    .horizon::after{
        position: absolute;
        content: "Loading....";
        font-family: 'Luckiest';
        letter-spacing: 5px;
        font-size: 25px;
        top: 30px;
        width: 100%;
        text-align: center;
        color: var(--background);
        animation: loading 2.7s linear infinite;
    }
    @keyframes sun{
        10%{
            transform: translate(0);
        }
        40%,70%{
            transform: translateY(-40px);
        }
    }
    @keyframes sun_body{
        40%{
            transform: rotate(0);
        }
        50%,100%{
            transform: rotate(45deg);
        }
    }
    @keyframes eyes{
        50%,60%{
            transform: scale(1);
        }
        55%{
            transform: scaleY(.1);
        }
        70%,100%{
            transform: translateX(34px);
        }
    }
    @keyframes loading{
        40%{
            opacity: 1;
        }
        60%{
            opacity: 0;
        }
    }
</style>