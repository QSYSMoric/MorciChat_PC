<template>
    <div class="MoricLogin">
        <div class="login_background">
            <div class="login_background_content">
                <div class="background_top">
                    <span class="top_icon">
                        
                    </span>
                    <span class="top_titile">
                        首页
                    </span>
                </div>
                <div class="background_middle">
                    <h1>
                        Moric Chat
                    </h1>
                    <p>
                        Explore our own value and cultivate our hobbies
                    </p>
                    <div class="background_img">
                        <MoricHomeAnimation></MoricHomeAnimation>
                    </div>
                </div>
            </div>
        </div>
        <div class="MoricLoginOperate">
            <router-view #default="{route,Component}">
                <transition 
                :leave-active-class="`animate__animated ${route.meta.outTransition}`"
                :enter-active-class="`animate__animated ${route.meta.inTransition}`">
                    <component :is="Component">
                    </component>
                </transition>
            </router-view>
        </div>
    </div>
</template>

<script setup>
    import MoricHomeAnimation from './components/MoricHomeAnimation.vue';
    import Loading from '@/utils/loading';
    import { onMounted } from 'vue';
    onMounted(()=>{
        setTimeout(() => {
            Loading.unLoading();
        }, 1200);
    });
    Loading.showLoading();
</script>

<style>
    .MoricLogin{
        font-family: 'icomoon';
        width: 100%;
        height: 100vh;
        display: grid;
        grid-template-columns: 50% 50%;
    }
    .login_background{
        width: 100%;
        height: 100%;
        padding: 30pt 30pt 40pt 30pt;
    }
    .login_background_content{
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
    }
    @media(max-width:767px){
        .login_background{
            display: none;
        }
    }
    .background_top{
        width: 100%;
        padding: 20px 0;
        display: flex;
        align-items: center;
    }
    .top_icon{
        color: #157efb;
        font-size: 1em;
        cursor: pointer;
    }
    .top_titile{
        margin-left: .6em;
        font-size: 1em;
    }
    .background_middle{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .background_middle h1{
        font-size: 60pt;
        text-align: center;
        font-family: 'Luckiest';
        margin-top: 1em;
        color: var(--background);
    }
    .background_middle p{
        text-align: center;
        font-family: 'Luckiest';
        letter-spacing: 2px;
        color: var(--background);
        word-spacing: .1em;
        margin-top: 1em;
        text-indent: 2em;
    }
    .background_img {
        width: 100%;
        height: 80%;
    }
    .MoricLoginOperate{
        width: 100%;
        height: 100%;
        padding-left: 25px;
        display: flex;
        overflow: hidden;
        align-items: center;
    }
    @media(max-width:767px){
        .MoricLogin{
            font-family: 'icomoon';
            width: 100%;
            height: 100vh;
            display: grid;
            padding: 0;
            grid-template-columns: 1fr;
        }
        .MoricLoginOperate{
            padding-left: 0;
            width: 100%;
            height: 100%;
        }
    }
</style>