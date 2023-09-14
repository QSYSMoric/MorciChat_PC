<template>
    <div class="curtain">
        <div class="showUserCard">
            <div class="userAvatar">
                <img :src="user.avator" alt="用户头像" v-if="user.avator">
                <div class="defautAvator" v-else>
                    
                </div>
            </div>
            <div class="userMsg">
                <h2>
                    {{user.userName}}<br>
                    <span>
                    {{ user.email }}
                    </span>
                </h2>
            </div>
            <div class="userTool">
                <div  class="button" style="background-color: #fc3159;"> 私信</div>
                <div @click.stop="addFriend" class="button" style="background-color: #595ad3;" ref="temp"> 添加好友</div>
            </div>
            <div class="exit" @click.stop="exit">
                <h2></h2>
            </div>
        </div>
        <div class="fly" v-if="go">
            
        </div>
    </div>
</template>

<script setup>
    import { useUserInformation } from '@/store/userInformation';
    import { reactive, ref } from 'vue';
    const userInformation = useUserInformation();
    let props = defineProps(["destroyFn","userId"]);
    //用户信息

    // 获取元素在视口中的位置信息
    //添加好友
    //页面动画元素
    let go = ref(false);
    function addFriend(){
        go.value = true;
        let goMove = setTimeout(() => {
            go.value = false;
            clearTimeout(goMove);
        }, 1000);
    }

    let user = reactive({
        userName:"",
        avator:"",
        email:""
    })
    userInformation.getUserInfoById(props.userId).then((data)=>{
        user.userName = data.userName;
        user.avator = data.userProfile;
        user.email = data.userEmail;
    }).catch((err)=>{
        console.log(err);
    });
    //退出
    function exit(){
        props.destroyFn();
    }
</script>

<style scoped>
    .curtain{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10003;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.6);
        color: #666;
    }
    .showUserCard{
        width: 300px;
        /* height: 200px; */
        position: relative;
        height: 270px;
        background: #fff;
        word-wrap: break-word;
        word-break: break-word;
        border-radius: 10px;
        box-shadow: 0 0 2em 0.5em rgba(0,0,0,0.2);
        animation: curtainStart .3s linear;
    }
    @keyframes curtainStart{
        0%{
            opacity: 0;
            transform: scale(.1) translate(-300px,150px);
        }
        40%{
            opacity: .4;
            transform: scale(.4) translate(-200px,110px);
        }
        100%{
            transform: scale(1) translate(0,0);
        }
    }
    .userAvatar{
        width: 100%;
        height: 90px;
        position: relative;
    }
    .userAvatar > img{
        position: absolute;
        top: -46%;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
        height: 110px;
        border-radius: 50%;
        object-fit: cover;
        box-shadow: 0px 7px 12px rgba(0,0,0,0.3);
    }
    .userAvatar .defautAvator{
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -46%;
        left: 50%;
        transform: translateX(-50%);
        padding: 20px;
        font-size: 70px;
        color: var(--background);
        background: #fff;
        border-radius: 50%;
        box-shadow: 0px 7px 12px rgba(0,0,0,0.3);
    }
    .userMsg{
        padding: 13px 21px;
    }
    .userMsg h2{
        font-size: 24px;
        font-weight: 600;
        color: #555;
        text-align: center;
        line-height: 1.5em;
    }
    .userMsg h2 > span{
        font-size: 0.75em;
        font-weight: 500;
        opacity: .8;
    }
    .userTool{
        width: 100%;
        padding: 0 21px;
        height: 60px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .button{
        user-select: none;
        font-size: 16px;
        padding: 5px 15px;
        background: #157efb;
        color: #ffffff;
        transition: transform .2s linear;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .button:hover{
        transform:translateY(-3px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .button:active{
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
    .exit{
        user-select: none;
        position: absolute;
        padding: 4px;
        border-radius: 50%;
        background:#fc3d38;;
        top: 10px;
        right: 15px;
        cursor: pointer;
        transition: all .2s linear;
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .exit:hover{
        transform:translateY(-2px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .exit:active{
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
    .exit h2{
        font-size: 18px;
        font-weight: 400;
        color: #fff;
    }
    .fly{
        position: fixed;
        user-select: none;
        top: 5%;
        right: 5%;
        color: #fff;
        font-size: 50px;
        transition: all .2s linear;
        text-shadow: 0 2px 3px rgba(0, 0, 0,.2);
        animation: flyGo 1s linear;
    }
    @keyframes flyGo{
        0%{
            transform: translate(-580px,400px);
            color: black;
        }
        20%{
            transform: scale(1.4) translate(-300px,300px);
        }
        60%{
            transform: scale(.5) translate(-200px,200px);
        }
        100%{
            color: #fff;
            transform: translate(0,0);
        }
    }
</style>