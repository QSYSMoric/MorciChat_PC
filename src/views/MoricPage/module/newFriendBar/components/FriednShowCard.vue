<template>
  <section class="friendCard">
    <div class="friendCardTop">
        <div class="friendCardTopAvator">
            <img :src="searchMsg.avatar" v-if="searchMsg.avatar" alt="">
            <div class="tempBox" v-else></div>
        </div>
        <ul class="friendIntroduce">
            <li>
                <span class="friendIcon">：</span>
                <span class="text">{{searchMsg.name}}</span>
            </li>
            <li>
                <span class="friendIcon">：</span>
                <span class="text">{{searchMsg.email}}</span> 
            </li>
        </ul>
    </div>
    <div class="personalSignature">
        {{searchMsg.userSignature}}
    </div>
    <ul class="fridendUserTool">
        <li class="fridendUserToolButton" @click.stop="searchPrivateLetter" style="background-color: #fc3159;"> 私信</li>
        <li class="fridendUserToolButton" @click.stop="searcgAddFriend" style="background-color: #595ad3;"> 添加好友</li>
    </ul>
  </section>
</template>

<script setup>
    import { reactive } from "vue";
    import { useUserInformation } from "@/store/userInformation";
    import { useChatUserList } from '@/store/chatFriendListSessionStore';
    import { useSelfStore } from "@/store/selfStore";
    import {  useRouter } from "vue-router";
    import Prompt from "@/components/GlobalPrompt/index";
    import sortAndJoin from "@/utils/sortAndJoin";
    import socketIO from "@/utils/socketIO";
    import PubSub from "pubsub-js";
    const props = defineProps(["ladingSearchOff"]);
    const userInformation = useUserInformation();
    const chatUserList = useChatUserList();
    const router = useRouter();
    let searchMsg = reactive({
        userId:"",
        name:"用户名",
        avatar:"",
        email:"邮箱",
        userSignature:"这个人很懒什么都没写",
    });
    //搜索按钮
    PubSub.subscribe("searchUserByID",(_,userId)=>{
        if(!userId){
            props.ladingSearchOff();
            return;
        }
        userInformation.getUserInfoById(userId).then((data)=>{
            searchMsg.name = data.userName;
            searchMsg.avatar = data.userProfile;
            searchMsg.email = data.userEmail;
            searchMsg.userSignature = data.userSignature?data.userSignature:"这个人很懒什么都没写";
            searchMsg.userId = data.userId;
            props.ladingSearchOff();
        }).catch((err)=>{
            console.log(err);
            Prompt("查无此人",false,1000,props.ladingSearchOff);
        });
    });
    //私信按钮
    function searchPrivateLetter(){
        if(!searchMsg.userId){
            Prompt("该用户信息出错",false);
            return;
        }
        let selfStore = useSelfStore();
        let tempUser = chatUserList.addNewChatUser(searchMsg.userId,sortAndJoin(selfStore.getId(),searchMsg.userId));
        router.replace({
            path:"/Page/chatBar",
            name:"chatBar",
            query:{
                tempUser
            }
        });
    }
    //添加好友
    function searcgAddFriend(){
        if(!searchMsg.userId){
            Prompt("该用户信息出错",false);
            return;
        }
        socketIO.addNewFiendToServe(searchMsg.userId).then((data)=>{
            console.log(data);
        }).catch((err)=>{
            console.log(err);
        });
    }
</script>

<style scoped>
    .friendCard{
        width: 90%;
        height: 100%;
        background: #ffffff;
        border-radius: 12px;
        padding: 15px 20px;
    }
    .friendCardTop{
        width: 100%;
        display: grid;
        border-radius: 12px;
        grid-template-columns: max-content 1fr;
    }
    .friendCardTopAvator{
        width: 100%;
        padding-right: 15px;
    }
    .friendCardTopAvator > img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
    }
    .friendIntroduce{
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .friendIntroduce li{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .text{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        font-size: 18px;
    }
    .friendIcon{
        font-size: 21px;
    }
    /* .friendIntroduce li span:first-child{
        width: 100px;
    } */
    .personalSignature{
        padding:10px;
        font-size: 16px;
        width: 100%;
        height: 100px;
        margin-top: 10px;
        background: #e6e5eb;
        border-radius: 12px;
    }
    .tempBox{
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
    }
    .fridendUserTool{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .fridendUserToolButton{
        user-select: none;
        font-size: 16px;
        padding: 5px 15px;
        white-space: nowrap;
        overflow: hidden;
        min-width: 50px;
        font-size: 16px;
        text-overflow: ellipsis;
        background: #157efb;
        color: #ffffff;
        transition: transform .2s linear;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .fridendUserToolButton:hover{
        transform:translateY(-3px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .fridendUserToolButton:active{
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
</style>