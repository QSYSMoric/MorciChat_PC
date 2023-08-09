<template>
  <ul class="showMoments">
    <li class="moments">
      <div class="momentsLeft">
        <div class="userAvatar">
          <img src="../../../../../assets/IMG_6803.jpg" alt="">
        </div>
      </div>
      <div class="momentsRight">
        <section class="topInformation">
          <span class="userMsg">
            <span class="userName">
              测试用户1
            </span>
            <span class="timing">
              15:03
            </span>
          </span>
          <span class="more">
            
          </span>
        </section>
        <section class="copywriting">
          我是一名前端开发工程师，目前正在寻找适合自己的一份工作,
          可是我遇到了一个hr嫌我做的low我还嫌弃你不懂技术
        </section>
        <section class="moments_img">
          <ul class="portfolio">
            <li>
              <img src="../imgs/102829018_p0.jpg" alt="">
            </li>
            <li>
              <img src="../imgs/103791888_p0.png" alt="">
            </li>
            <li>
              <img src="../imgs/106089332_p0_W2xEX_3x_3n_W2xEX_1x_3n_W2xEX_1x_3n.jpg" alt="">
            </li>
            <li>
              <img src="../imgs/1.jpg" alt="">
            </li>
          </ul>
        </section>
        <section class="momentsTool">
          <ul>
            <li></li>
            <li @click="showComment" :class="{
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
            <button class="postCommentsButton">
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
  </ul>
</template>

<script setup>
  import { ref,computed,reactive } from "vue";
  const isComment = ref(false);
  const textareaNode = ref("");
  const isToolActive = ref(false);
  function showComment(){
    isComment.value = !isComment.value;
    isToolActive.value = !isToolActive.value;
  };
  const inputText = reactive({
      value:"",
  });
  const textareaHeight = computed(()=>{
      return inputText.value ? `${textareaNode.value.scrollHeight}px` : '2em';
  });
</script>

<style scoped>
  .showMoments{
    display: grid;
    width: 100%;
    border-radius: 15px;
    padding: 20px 0;
    gap: 20px;
  }
  .showMoments > li{
    width: 100%;
    border-radius: 15px;
    padding: 20px;
    background: #fff;
  }
  .moments{
    display: grid;
    grid-template-columns: 50pt 1fr;
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
    transform-origin: center;
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
    align-items: flex-end
  }
  .postComments textarea{
    position: relative;
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
  .postComments textarea::placeholder{
    position: absolute;
    top:5px;
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