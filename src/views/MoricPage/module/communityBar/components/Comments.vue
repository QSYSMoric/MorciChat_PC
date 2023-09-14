<template>
    <div class="commentUser" @click.stop="ShowUser(commentobj.user_id)">
        <img :src="commentUser.avatar" alt="头像" v-if="commentUser.avatar">
        <img src="@/assets/self.png" alt="默认头像" v-else>
    </div>
    <div class="commentUserMag">
        <div class="commentUserName">
            {{commentUser.name}}
        </div>
        <div class="commentTiming">
            {{commentUser.timing.monthDay}} 
            {{commentUser.timing.hourMinute}}
        </div>
        <div class="commentUserData">
            {{commentUser.text_content}}
        </div>
    </div>
</template>

<script setup>
    import { useUserInformation } from "@/store/userInformation";
    import ShowUser from "@/components/TempUserShow/index";
    import { reactive } from "vue";
    //当前评论信息
    const props = defineProps(['commentobj']);
    const { commentobj } = props;
    const userInfo = useUserInformation();
    const commentUser = reactive({
        avatar:null,
        name:"",
        timing:"",
        text_content:"",
    });
    commentUser.timing = commentobj.timing;
    commentUser.text_content = commentobj.text_content;
    userInfo.getUserInfoById(commentobj.user_id).then((data)=>{
        commentUser.avatar = data.userProfile;
        commentUser.name = data.userName;
    }).catch((err)=>{
        console.log(err);
    });
</script>

<style scoped>  
    .commentUser{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        cursor: pointer;
    }
    .commentUser>img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
    .commentUserMag{
        width: 100%;
        height: max-content;
    }
    .commentUserName{
        font-size: .6em;
        color: #8f8e94;
    } 
    .commentTiming{
        font-size: 8pt;
        color:#8f8e94;
    }
    .commentUserData{
        font-size: 12pt;
        /* letter-spacing: 1px; */
        padding-bottom: 6px;
        border-bottom: solid 1px #e6e5eb;
    }
</style>