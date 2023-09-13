<template>
    <li class="chatItem" :class="{myChat:chat.senderId === mySelf.getSelf}" :index="props.index" ref="chatListRef">
        <div class="chatUserMsg">
            <img :src="chtItem.avator" alt="用户头像" v-if="chtItem.avator">
            <img src="@/assets/self.png" alt="默认头像" v-else>
        </div>
        <div class="chatUserText">
            {{chat.text_content}}
        </div>
        <div class="chatUserTextTiming">{{chat.timing.monthDay}}_{{chat.timing.hourMinute}}</div>
    </li>
</template>

<script setup>
    import { useUserInformation } from '@/store/userInformation';
    import { useSelfStore } from '@/store/selfStore';
    import { onMounted, reactive, ref } from 'vue';

    //至底部最新消息
    let chatListRef = ref();
    onMounted(()=>{
        chatListRef.value.scrollIntoView();
    });

    //本人信息
    const mySelf = useSelfStore();
    //获取用户信息
    const userInformation = useUserInformation();
    //本页动态数据
    let props = defineProps(["chat","index"]);
    const chat = props.chat;
    let chtItem = reactive({
        avator:null,
    });
    //获取发布消息用户信息
    userInformation.getUserInfoById(chat.senderId).then((data)=>{
        chtItem.avator = data.userProfile;
    }).catch((err)=>{
        console.log(err);
    })

</script>

<style scoped>
    .chatItem{
        display: flex;
        padding: 0 16px 16px;
    }
    .myChat{
        flex-direction: row-reverse;
    }
    .myChat .chatUserText{
        border-radius: 10px 0 10px 10px;
    }
    .chatUserMsg{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .chatUserMsg img{
        object-fit: cover;
        border-radius: 50%;
    }
    .chatUserText{
        margin: 0 10px;
        padding: 8px 16px;
        line-height: 1.5;
        font-size: 14px;
        min-height: 37px;
        max-width: 70%;
        word-wrap: break-word;
        word-break: break-word;
        border-radius: 0 10px 10px 10px;
        overflow: hidden;
        position: relative;
        background: #fff;
    }
    .chatUserTextTiming{
        display: flex;
        align-items: flex-end;
        font-size: 8px;
        color: #8f8e94;
    }
</style>