<template>
    <li class="friendListItem">
        <div class="friendAvatar">
            <img v-if="friendItem.avatar" :src="friendItem.avatar" alt="">
            <div v-else class="tempAvatar"></div>
        </div>
        <div class="friendRight">
            <div class="friendMsg">
                <span class="friendName">{{friendItem.name}}</span>
                <span class="friendSignature">
                    <p v-if="friendItem.signature">
                        friendItem.signature
                    </p> 
                    <p v-else>无签名</p>
                </span>
            </div>
            <div class="chatToFriend">
                <div class="chatButton" @click.stop="chagtPrivate">
                    
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
    import { useUserInformation } from '@/store/userInformation';
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    const props = defineProps(["friend"]);
    const userInformation = useUserInformation();
    const router = useRouter();    

    //私信
    function chagtPrivate(){
        router.replace({
            path:"/Page/chatBar",
            name:"chatBar",
            query:{
                tempUser:props.friend
            }
        });
    }

    const friendItem = reactive({
        name:"",
        signature:"",
        avatar:""
    });

    userInformation.getUserInfoById(props.friend).then((data)=>{
        friendItem.name = data.userName;
        friendItem.avatar = data.userProfile;
        friendItem.signature = data.userSignature;
    }).catch((err)=>{
        console.log(err);
    });

</script>

<style scoped>
    .friendListItem{
        display: grid;
        grid-template-columns: 45px 1fr;
        width: 100%;
        padding: 8px 10px;
    }
    .friendListItem:hover{
        background: #c8c7cd;
    }
    .friendAvatar{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
    }
    .tempAvatar{
        font-size: 24px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffff;
        color: var(--background);
    }
    .friendRight{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        width: 100%;
        color: #8f8e94;
    }
    .friendName{
        font-size: 14px;
        color: #000000;
    }
    .friendMsg{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .friendSignature{
        color: #8f8e94;
    }
    .chatToFriend{
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .chatButton{
        padding: 3px 14px;
        font-size: 12px;
        color: #ffff;
        border-radius: 5px;
        background: #157efb;
        cursor: pointer;
        user-select: none;
    }
    .chatButton:hover{
        transform:translateY(-2px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .chatButton:active{
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
</style>