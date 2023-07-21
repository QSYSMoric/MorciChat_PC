<template>
    <div class="page">
        <nav :class="{subWidth:isHided}" class="sideBar">
            <div class="logo">
                <span class="icon">
                    M
                </span>
                <span class="title" :class="{hide:isHided}">
                    Chat Room
                </span>
            </div>
            <ul class="navigationBar">
                <li 
                    v-for="(navBar,index) in navigationBars"
                    :class="{active:navBar.isActive}" 
                    :style="{'--bgc':navBar.bgColor}"
                    :key="index"
                    @click.stop="navigation(navBar.subscribleName,navBar.linkTo)">
                    <span class="icon">{{navBar.icon}}</span>
                    <span class="title" :class="{hide:isHided}">{{navBar.nameBar}}</span>
                </li>
            </ul>
            <div class="toolBar">
                <div class="user">
                    <span class="icon">
                        <img src="../../assets/IMG_6803.jpg" alt="">
                    </span>
                    <span class="title" :class="{hide:isHided}">
                        admin
                    </span>
                </div>
                <div class="black">
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">下次再会</span>
                </div>
            </div>
        </nav>
        <main class="operationArea">
            <router-view>
            </router-view>
        </main>
        <footer class="viewsArea">

        </footer>
    </div>
    <MoricHomeHamburgButton :clickFn="toggleWidth"></MoricHomeHamburgButton>
</template>

<script setup>
    import PubSub from 'pubsub-js';
    import MoricHomeHamburgButton from '@/views/MoricHome/components/MoricHomeHamburgButton';
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import NavigationBarObj from '@/views/MoricPage/scripts/NavigationBarObj';
    //整个导航栏的样式变换
    const isHided  = ref(true);
    function toggleWidth(){
        isHided .value = !isHided .value;
    }
    //导航栏中的导航对象
    const communityBar = reactive(new NavigationBarObj("社区","","#fc3159",false,{
        path:"/Page/communityBar",
        name:"communityBar"
    },"communityBar"));
    const chatBar = reactive(new NavigationBarObj("聊天","","#fc3d38",false,{
        path:"/Page/chatBar",
        name:"chatBar"
    },"chatBar"));
    const selfBar = reactive(new NavigationBarObj("用户","","#53d86a",false,{
        path:"/Page/selfBar",
        name:"selfBar"
    },"selfBar"));
    const newFriendBar = reactive(new NavigationBarObj("新的朋友","","#fd9426",false,{
        path:"/Page/newFriendBar",
        name:"newFriendBar"
    },"newFriendBar"));
    const aboutBar = reactive(new NavigationBarObj("关于","","#595ad3",false,{
        path:"/Page/aboutBar",
        name:"aboutBar"
    },"aboutBar"));
    const settingBar = reactive(new NavigationBarObj("设置","","#157efb",false,{
        path:"/Page/settingBar",
        name:"settingBar"
    },"settingBar"));
    const navigationBars = reactive([communityBar,chatBar,selfBar,newFriendBar,aboutBar,settingBar]);
    navigationBars.forEach((node)=>{
        //为每个导航对象安装回调事件
        PubSub.subscribe(`${node.subscribleName}on`,(_)=>{
            node.onActive();
        }); 
        PubSub.subscribe(`${node.subscribleName}off`,()=>{
            node.offActive();
        });
    });
    //导航按钮的点击事件
    const router = useRouter();
    function navigation(nav,linkTo){
        router.replace(linkTo);
    }
</script>

<style scoped>
    .page{
        align-items: center;
        width: 100%;
        height: 100vh;
        padding: 30px;
        display: grid;
        grid-template-columns: max-content 1fr 20%;
        background: #f0eff5;
    }
    .sideBar{
        width: 3rem;
        height: 100%;
        display: flex;
        position: relative;
        padding: .1em 0 .1em 10px;
        flex-direction: column;
        justify-content: space-between;
        transition:all 0.5s linear;
        overflow: hidden;
        background-color: #ffff;
        border-radius: 15px;
        z-index: 1001;
    }
    @media(max-width:767px){
        .sideBar{
            width: 90pt;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius:0 15px 15px 0;
            width: 0;
            padding: 30px 0;
            z-index: 1001;
        }
        .page{
            grid-template-columns: 1fr;
        }
    }
    .logo,.toolBar>div{
        display: flex;
    }   
    .logo .icon{
        font-size: 2em;
        font-family: "Luckiest";
    }
    .logo .title{
        font-weight: 600;
    }
    .icon{
        display: flex;
        justify-content: center;
        align-items: center; 
        cursor: pointer;
        width: max-content;
        height: max-content;
        padding: 8px;
        font-size: 1em;
        border-radius: 50%;
    }
    .title{
        display: flex;
        cursor: pointer;
        align-items: center;
        width: 0;
        height: 100%;
        font-size: .9em;
        padding-left: .8rem;
        overflow: hidden;
        opacity: 0;
    }
    .hide{
        width: 100%;
        opacity: 1;
        transition: opacity .4s linear;
        transition-delay: .4s;
    }
    @media(max-width:767px){
        .hide{
            display: flex;
        }
        /* .title{
            font-size: 2em;
        }
        .icon{
            font-size: 2.1em;
        } */
    }
    .subWidth{
        width: 250px;
        min-width:max-content;
        overflow: hidden;
    }
    @media(max-width:767px){  
        .subWidth{
            width: 150pt;
        }
    }   
    .navigationBar li{
        padding: 5px 0 5px 10px;
        height: 2.5rem;
        display: grid;
        align-items: center;
        grid-template-columns: max-content 1fr;
        transition: all .2s linear;
    }
    @media(max-width:767px){  
        .navigationBar li{
            height: max-content;
        }
    }   
    .navigationBar li:hover{
        transform: scale(1.1);
    }
    .toolBar{
        width: 100%;
    }
    .toolBar .icon{
        width: 3em;
        height: 3em;
        padding: 0;
        font-size: .8em;
        transition: all .2s linear;
    }
    .toolBar .icon:hover{
        transform: scale(1.1);
    }
    .toolBar .title{
        width: 100%;
        font-size: .8em;
        display: none;
        padding-left: 10px;
        overflow: hidden;
        transition: all .2s linear;
    }
    .subWidth .toolBar .title{
        display: block;
    }
    .toolBar div{
        display: flex;
        align-items: center;
    }
    .user .icon {
        height: 100%;
        width: 2.2rem;
        border-radius: 50%;
        padding-left: .2em;
    }
    .user .title{
        padding-left: 1em;
    }
    .user > .icon > img{
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 50%;
        object-position: bottom;
    }
    .black{
        margin-top: 10px;
        padding-bottom: 0.2rem;
    }
    .black .icon{
        display: flex;
        justify-content: center;
        align-items: center; 
        font-size: .8em;
    }
    .black .title{
        font-size: .8em;
    }

    .active{
        position: relative;
        background: #f0eff5;
        border-radius: 50px 0 0 50px;
    }
    .active::before{
        content: "";
        position: absolute;
        top: -20px;
        right: 0;
        width: 20px;
        height: 20px;
        border-bottom-right-radius: 10px;
        background: transparent;
        box-shadow: 5px 1px 0px 1px #f0eff5;
    }
    .active::after{
        content: "";
        position: absolute;
        bottom: -20px;
        right: 0;
        width: 20px;
        height: 20px;
        border-top-right-radius: 10px;
        background: transparent;
        box-shadow: 5px -1px 0px 1px #f0eff5;
    }
    .navigationBar .active .icon{
        background: var(--bgc);
        color: #ffff;
        border-radius: 50%;
    }
    .navigationBar .active>.icon:hover{
        transform: scale(1);
    }
    .navigationBar .active:hover{
        transform: scale(1);
    }
    .operationArea{
        width: 100%;
        height: 100%;
        overflow: auto;
        border-radius: 15px;
        padding: 0 24px;
    }
    .operationArea h1{
        font-size: 2em;
    }
    .viewsArea{
        width: 100%;
        height: 100%;
        /* background: #ffff; */
    }
</style>