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
                <li class="active">
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">社区</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">聊天</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">用户</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">新的朋友</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">关于</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="title" :class="{hide:isHided}">设置</span>
                </li>
            </ul>
            <div class="toolBar">
                <div class="user">
                    <span class="icon">
                        
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
    </div>
    <MoricHomeHamburgButton :clickFn="toggleWidth"></MoricHomeHamburgButton>
</template>

<script setup>
    import MoricHomeHamburgButton from '@/views/MoricHome/components/MoricHomeHamburgButton';
    import { ref } from 'vue';
    const isHided  = ref(true);
    function toggleWidth(){
        isHided .value = !isHided .value;
    }
</script>

<style scoped>
    .page{
        display: flex;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        padding: 30px;
        display: grid;
        grid-template-columns: max-content 1fr;
        background: #f0eff5;
    }
    .sideBar{
        width: 3rem;
        height: 98%;
        display: flex;
        padding: 1em 0 1em 10px;
        flex-direction: column;
        justify-content: space-between;
        transition:all 0.5s;
        overflow: hidden;
        background: #ffff;
        border-radius: 15px;
        /* box-shadow: -5px 2px 10px rgba(0,0,0,.2); */
    }
    @media(max-width:767px){
        .sideBar{
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            border-radius:0 15px 15px 0;
            width: 0;
            padding: 30px 0;
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
        transition: opacity .4s;
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
    }   
    .navigationBar li{
        padding: 5px 0 5px 10px;
        height: 2.5rem;
        display: grid;
        align-items: center;
        grid-template-columns: max-content 1fr;
        transition: all .2s linear;
    }
    .navigationBar li:hover{
        transform: scale(1.1);
    }
    .toolBar{
        width: 100%;
    }
    .toolBar .icon{
        width: 2em;
        height: 2em;
        font-size: .8em;
    }
    .toolBar .title{
        font-size: .8em;
    }
    .toolBar .title{
        display: none;
    }
    .subWidth .toolBar .title{
        display: block;
    }
    .toolBar div{
        display: flex;
        align-items: center;
    }
    .black{
        margin-top: 10px;
        padding-bottom: 0.8rem;
    }
    .black .icon{
        display: flex;
        justify-content: center;
        align-items: center; 
        height: 1rem;
        font-size: .8em;
    }
    .black .title{
        height: 1rem;
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
        background: #fc3159;
        color: #ffff;
        border-radius: 50%;
    }
</style>