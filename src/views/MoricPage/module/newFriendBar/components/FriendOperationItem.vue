<template>
    <li class="useOperationItem">
        <div class="useOperationItemAvatar">
            <img :src="friendApplicationMsg.avatar" v-if="friendApplicationMsg.avatar" alt="头像">
            <div class="tempAvatar" v-else></div>
        </div>
        <div class="useOperationItemRight">
            <div class="useOperationItemMsg">
                <span class="useOperationItemName">{{friendApplicationMsg.name}}</span>
                <span class="useOperationItemSignature">签名</span>
            </div>
            <div class="useOperationItemToFriend">
                <div class="pending" 
                v-if="!(props.friendApplication.friendId == selfMsg.getSelf && props.friendApplication.status != `Approved`)">
                   <p v-if="(props.friendApplication.status == `Approved`)">已通过 </p>
                   <p v-if="(props.friendApplication.status == `Pending`)">申请中...</p>
                   <p v-if="(props.friendApplication.status == `Rejected`)">已拒绝 X</p>
                </div>
                <div v-else class="operationButtonState">
                    <div class="operationButton" @click.stop="agreeWith" style="background-color: #0e9d48;">
                        
                    </div>
                    <div class="operationButton" @click.stop="refuse" style="background-color: #fc3d38;">
                        
                    </div>
                </div>
            </div>
        </div>
    </li>
</template>

<script setup>
    import { useUserInformation } from '@/store/userInformation';
    import { reactive } from 'vue';
    import { useSelfStore } from '@/store/selfStore';
    import { useFriendListStore } from '@/store/friendListSessionStore';
    import Moric_FriendOperation from '@/class/Moric_FriendOperation'
    import SocketModule from '@/utils/socketIO';
    import Prompt from '@/components/GlobalPrompt';
    const userInformation = useUserInformation();
    const selfMsg = useSelfStore();
    const friendListStore = useFriendListStore();
    const props = defineProps(["friendApplication"]);
    //页面信息
    const friendApplicationMsg = reactive({
        avatar:"",
        name:"",
    });
    //比较来自谁的请求
    let toUser = props.friendApplication.friendId == selfMsg.getSelf?props.friendApplication.userId:props.friendApplication.friendId;
    //获取用户信息
    userInformation.getUserInfoById(toUser).then((data)=>{
        friendApplicationMsg.name = data.userName;
        friendApplicationMsg.avatar = data.userProfile;
    }).catch((err)=>{
        console.log(err);
    });
    //同意好友请求
    function agreeWith(){
        SocketModule.operateFriendRequests(new Moric_FriendOperation(props.friendApplication.userId,props.friendApplication.friendId,"Approved")).then((data)=>{
            Prompt("已同意好友申请",true);
        }).catch((err)=>{
            Prompt(err.alertMsg,false);
            friendListStore.updatingFriendApplicationStatus(props.friendApplication.userId,props.friendApplication.friendId,"Approved");
        });
    }
    //拒绝好友请求
    function refuse(){
        SocketModule.operateFriendRequests(new Moric_FriendOperation(props.friendApplication.userId,props.friendApplication.friendId,"Rejected")).then((data)=>{
            Prompt("已拒绝好友申请",true);
        }).catch((err)=>{
            Prompt(`未知错误:${err.alertMsg}`,true);
        }).finally(()=>{
            friendListStore.updatingFriendApplicationStatus(props.friendApplication.userId,props.friendApplication.friendId,"Rejected");
        })
    }
</script>

<style scoped>
    .useOperationItem{
        display: grid;
        grid-template-columns: 45px 1fr;
        width: 100%;
        padding: 10px 15px;
        background: #ffff;
        border-radius: 12px;
        transition:all .2s linear;
    }
    li + li{
        margin-top: 10px;
    }
    .useOperationItem:hover{
        background: #c8c7cd;
        /* transform: scale(1.1); */
    }
    .useOperationItemAvatar{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        overflow: hidden;
    }
    .useOperationItemAvatar img{
        width: 35px;
        height: 35px;
        border-radius: 50%;
        object-fit: cover;
    }
    .tempAvatar{
        font-size: 20px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000000;
        color: #ffff;
    }
    .useOperationItemRight{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        width: 100%;
        color: #8f8e94;
    }
    .useOperationItemName{
        font-size: 14px;
        color: #000000;
    }
    .useOperationItemMsg{
        display:flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .useOperationItemSignature{
        color: #8f8e94;
    }
    .useOperationItemToFriend{
        width: 130px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .operationButtonState{
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
    .operationButton{
        padding: 4px 20px;
        font-size: 16px;
        color: #ffff;
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
    }
    .operationButton:hover{
        transform:translateY(-2px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .operationButton:active{
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
    .pending{
        font-size: 14px;
    }
</style>