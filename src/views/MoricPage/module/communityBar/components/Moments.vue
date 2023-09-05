<template>
    <li v-moriclist class="moments" :class="{backdrop:moreActive}">
      <div class="momentsLeft">
        <div class="userAvatar">
          <img :src="userMsg.avater" alt="头像">
        </div>
      </div>
      <div class="momentsRight">
        <section class="topInformation">
          <span class="userMsg">
            <span class="userName">
              {{userMsg.userName}}
            </span>
            <span class="timing">
              {{moment.publishTiming.hourMinute}}
            </span>
          </span>
          <span class="more">
            <div class="moreIcon" @click="moreClick" :class="{moreIconClick:moreActive}">
              
            </div> 
            <ul class="moreOptions" v-if="moreActive">
              <li>删除</li>
              <li>更多</li>
            </ul>
          </span>
        </section>
        <section class="copywriting">
          {{moment.friendCircleCopy}}
        </section>
        <section class="moments_img" v-if="moment.friendCircleImg.length">
          <ul class="portfolio">
            <li v-for="(img,index) of moment.friendCircleImg" :key="index">
                <img :src="img" alt="">
            </li>
          </ul>
        </section>
        <section class="momentsTool">
          <ul>
            <li></li>
            <li @click="showComment" 
            :class="{
              momentsToolActive:isToolActive
            }"><span></span> 99</li>
            <li><span></span> 99</li>
          </ul>
        </section>
        <section class="comment" v-if="isComment">
          <div class="postComments">
            <textarea
            placeholder="发表评论"
            :style="{ height: textareaHeight }"
            v-model="inputText.value"
            ref="textareaNode">
            </textarea>
            <button class="postCommentsButton" @click.stop="postComments">
              发表
            </button>
          </div>
          <ul>
            <li>
              <div class="commentUser">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
              </div>
              <div class="commentUserMag">
                <div class="commentUserName">
                  测试用户1
                </div>
                <div class="commentUserData">
                  666
                </div>
              </div>
            </li>
            <li>
              <div class="commentUser">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
              </div>
              <div class="commentUserMag">
                <div class="commentUserName">
                  测试用户1
                </div>
                <div class="commentTiming">
                  19:05
                </div>
                <div class="commentUserData">
                  666
                </div>
              </div>
            </li>
            <li>
              <div class="commentUser">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
              </div>
              <div class="commentUserMag">
                <div class="commentUserName">
                  测试用户1
                </div>
                <div class="commentTiming">
                  19:05
                </div>
                <div class="commentUserData">
                  666
                </div>
              </div>
            </li>
            <li>
              <div class="commentUser">
                <img src="../../../../../assets/IMG_6803.jpg" alt="">
              </div>
              <div class="commentUserMag">
                <div class="commentUserName">
                  测试用户1
                </div>
                <div class="commentTiming">
                  19:05
                </div>
                <div class="commentUserData">
                  其实在 iPhone 上显示的色域要比我们作图时的 RGB 色域要广。
                  所以在 iPhone 上设计怎样的颜色都可以。只要符合产品气质并且在色彩心理学理论上思考，
                  用什么颜色是设计师的自由。官方建议的系统色彩如下：
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </li>
</template>

<script setup>
  import Prompt from "@/components/GlobalPrompt";
  import { ref,computed,reactive } from "vue";
  import { useUserInformation } from "@/store/userInformation";
  import { useCommentStore } from "@/store/commentSessionStore";
  import { useSelfStore } from "@/store/selfStore";
  const isComment = ref(false);
  const textareaNode = ref("");
  const isToolActive = ref(false);
  const moreActive = ref(false);
  const userSelf = useSelfStore();
  //是否展示品论区
  function showComment(){
    isComment.value = !isComment.value;
    isToolActive.value = !isToolActive.value;
  };
  //绑定评论内容
  const inputText = reactive({
      value:"",
  });
  //点击更多
  function moreClick(){
    moreActive.value = !moreActive.value;
  }
  //控制评论高度自动增长
  const textareaHeight = computed(()=>{
      return inputText.value ? `${textareaNode.value.scrollHeight}px` : '2em';
  });
  //当前评论信息
  const props = defineProps(['momentsObj']);
  const moment = props.momentsObj;
  const userMsg = reactive({
    avater:"",
    userName:"",
  });
  //用户信息
  const userInfo = useUserInformation();
  userInfo.getUserInfoById(moment.publisherId).then((data)=>{
    userMsg.avater = data.userProfile;
    userMsg.userName = data.userName;
  });

  //评论信息
  const commentInfo = useCommentStore();
  commentInfo.getCommentList(moment.publishId).then((data)=>{
    
  }).catch((err)=>{
    console.log(err);
  });

  //发布评论
  function postComments(){
    if(!inputText.value){
      Prompt("请输入内容",false);
      return;
    }
    commentInfo.postCommentToServe({
      user_id:userSelf.selfId,
      text_content:inputText.value,
      comment_img:null,
      dynamic_id:moment.publishId
    }).then((data)=>{
      Prompt(data,true);
    }).catch((err)=>{
      Prompt(err,false);
    });
  }

</script>

<style scoped>
  .moments{
    position: relative;
    display: grid;
    grid-template-columns: 50pt 1fr;
  }
  .backdrop::before{
    content: "";
    position: absolute;
    background: rgba(0,0,0,.4);
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .momentsLeft{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
  .userAvatar{
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
  .userAvatar img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
  .topInformation{
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: space-between;
  }
  .userMsg{
    display: flex;
    flex-direction: column;
  }
  .userName{
    font-size: 1em;
    font-weight: 400;
    color: var(--background);
  }
  .timing{
    font-size: 8pt;
    color: rgb(143, 142, 148);
  }
  .more{
    cursor: pointer;
    width: max-content;
    height: max-content;
    z-index: 11;
  }
  .moreIcon{
    text-align: right;
    width: 100%;
    transform-origin: right;
    transition: transform .1s;
    user-select: none;
  }
  .more:hover .moreIcon{
    transform: scale(1.1);
  }
  .moreIconClick{
    color: #fff;
    font-size: 18pt;
  }
  .moreOptions{
    margin-top: 10px;
    padding: 10px 0;
    position: relative;
    font-size: 12pt;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: -2px 2px #8f8e94;
    z-index: 10;
    user-select: none;
  }
  .moreOptions li{
    padding: 5px 20px;
    letter-spacing: 3px;
    user-select: none;
  }
  .moreOptions li:hover{
    background: #c8c7cd;
  }
  .copywriting{
    font-size: .8em;
    font-weight: 400;
    color: var(--background);
    padding: 5px 0;
    letter-spacing: 1px;
    line-height: 1.5em;
  }
  .moments_img{
    padding: 10px 0;
    width: 100%;
  }
  .portfolio{
    display: grid;
    grid-template-columns: repeat(auto-fill,minmax(168px,1fr));
    grid-auto-rows: 1fr;
    grid-auto-flow: row dense;
    gap: 10px;
  }
  .portfolio > li{
    width: 100%;
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }
  .portfolio>li>img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .momentsTool{
    width: 100%;
  }
  .momentsTool ul{
    display: flex;
    padding-top: 10px;
    width: 100%;
    justify-content: space-between;
  }
  .momentsTool ul>li{
    cursor: pointer;
    width: 104px;
    font-size: .7rem;
    color: #8f8e94;
    transition: transform .2s linear;
    transform-origin: left;
    user-select: none;
  }
  .momentsTool ul>li:hover{
    color: #157efb;
    transform: scale(1.1);
  }
  .momentsToolActive{
    color: #157efb !important;
  }
  .comment{
    width: 100%;
  }
  .comment ul{
    /* display: grid;
    gap: 10px; */
    /* margin-top: 10px; */
    padding-top: 10px;
    /* border-top: solid 1px var(--background); */
  }
  .comment li{
    display: grid;
    grid-template-columns: 50px 1fr;
    padding: 10px 0;
  }
  .postComments{
    width: 100%;
    padding: 10px 0 0 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .postComments textarea{
    appearance: none;
    border: none;
    background: #e6e5eb;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    padding: 6px 5px;
    resize: none;
    border-radius: 5px;
    overflow: hidden;
    font-size: .8em;
  }
  .postCommentsButton{
    width: 80px;
    cursor: pointer;
    background: none;
    margin-top: 10px;
    padding: 5px 20px;
    background: #157efb;
    color: #ffffff;
    transition: transform .2s linear;
    border-radius: 5px;
  }
  .postCommentsButton:hover{
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
  }
  .postCommentsButton:active{
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
  }
  .commentUser{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .commentUser>img{
    width: 100%;
    height: 100%;
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
    font-size: .8em;
    /* letter-spacing: 1px; */
    padding-bottom: 15px;
    border-bottom: solid 1px #e6e5eb;
  }
</style>