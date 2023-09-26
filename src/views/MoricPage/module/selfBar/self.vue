<template>
  <div class="personalInformation">
    <div class="personCard">
      <div class="personAvatar">
          <img v-if="editPersonInfoButton" :src="mySelf.selfProfileURL" alt="">
          <div v-else class="inputheadSculpture">
              <input type="file" title="headSculpture" 
              @change="handleFileUpload"
              placeholder="上传头像">
          </div>
          <div class="personAvatorTool">
            
          </div>
          <h1 v-if="editPersonInfoButton">{{mySelf.selfName}}</h1>
          <input v-else class="editMsg editName" v-model="selfMsg.userName" type="text" placeholder="姓名">
      </div>
      <ul class="personInfoConetnetList">
        <li>
          <span class="icon">年龄 :</span>
          <span v-if="editPersonInfoButton" class="text">
            <p v-if="!mySelf.selfAge">未填写</p>
            <p v-else>{{mySelf.selfAge}}</p>
          </span>
          <input v-else class="editMsg" v-model="selfMsg.userAge" type="text" placeholder="年龄">
        </li>
        <li>
          <span class="icon">性别 :</span>
          <span v-if="editPersonInfoButton" class="text">这个功能还没做</span>
          <input v-else class="editMsg" type="text" placeholder="性别">
        </li>
        <li>
          <span class="icon">邮箱 :</span>
          <span v-if="editPersonInfoButton" class="text">{{mySelf.selfEmail}}</span>
          <input v-else class="editMsg" v-model="selfMsg.userEmail" type="text" placeholder="邮箱">
        </li>
        <li>
          <span class="icon">签名 :</span>
          <span v-if="editPersonInfoButton" class="text">
            <p v-if="!mySelf.selfSignature">这个人什么都没写</p>
            <p v-else>{{mySelf.selfSignature}}</p>
          </span>
          <input v-else class="editMsg" v-model="selfMsg.userSignature" type="text" placeholder="签名">
        </li>
      </ul>
      <div class="editPersonInfoButton">
        <button v-if="editPersonInfoButton" class="button" @click.stop="edit">
          编辑
        </button>
        <button v-else class="button save" @click.stop="save">
          保存
        </button>
      </div>
    </div>
    <myWorkArea/>
  </div>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import axios from '@/utils/api';
  import myWorkArea from './myWorkArea.vue';
  import PubSub from 'pubsub-js';
  import { reactive, ref } from 'vue';
  import Prompt from '@/components/GlobalPrompt';
  import { useSelfStore } from '@/store/selfStore';
  //切换模式
  let editPersonInfoButton = ref(true);
  //个人信息
  let mySelf = useSelfStore();
  //头像处理
  let selfMsg = reactive({
    userProfile:"",
    userProfileType:"",
    userName:"",
    userAge:"",
    userEmail:"",
    userSignature:""
  });
  //上传头像
  function handleFileUpload(event){
      //获取到上传的头像
      let files = event.target.files[0];
      //创建读取文件读取对象
      let reader = new FileReader();
      //判断文件类型
      if(/image/.test(files.type)){
          reader.readAsDataURL(files);
          selfMsg.userProfileType = "jpg";
      }else if(/png/.test(files.type)){
          reader.readAsDataURL(files);
          selfMsg.userProfileType = "png";
      }else if(/jpg/.test(files.type)){
          reader.readAsDataURL(files);
          selfMsg.userProfileType = "jpg";
      }else{
          reader.readAsText(files);
          selfMsg.userProfileType = "test";
      };
      //当文件加载完毕后调用这个函数
      reader.onload = () => {
        selfMsg.userProfile = reader.result;
        Prompt("头像上传成功",true);
      }
  }

  //保存按钮
  function save(){
    editPersonInfoButton.value = true;
    axios({
      method:"post",
      url:"/moric/changePersonalInformation",
      data:{
        selfMsg
      }
    }).then((data)=>{
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  //编辑按钮
  function edit(){
    editPersonInfoButton.value = false;
  }


  PubSub.publish(`selfBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`selfBaroff`)
  });
</script>

<style scoped>
  .editMsg{
    outline: none;
    border: none;
    flex-grow: 1;
    font-size: 18px;
    background: #f8f8f8;
    text-indent: 1em;
  }
  .personalInformation{
    width: 100%;
    height: 100%;
    padding: 0 15px;
    display: grid;
    grid-template-columns: 350px 1fr;
  }
  .personCard{
    position: relative;
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    border-radius: 10px;
  }
  .personAvatar{
    width: 100%;
    height: 300px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .inputheadSculpture{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20pt;
      height: 20pt;
      border-radius: 50%;
      font-size: 30px;
      font-weight: 400;
      background-color:  #ffff;
      opacity: 0.8;
      color:  #052630;
      cursor:pointer;
  }
  .inputheadSculpture input{
      padding: 80px;
      opacity: 0;
      cursor: pointer;
  }
  .inputheadSculpture::after{
      display: flex;
      justify-content: center;
      overflow: hidden;
      align-items: center;
      position: absolute;
      width: 150px;
      height: 150px;
      content: '';
      z-index: -10;
      cursor: pointer;
      border-radius: 50%;
      border: 1px solid black;
  }
  .personAvatar img{
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
  }
  .personAvatar > h1,.editName{
    position: absolute;
    font-size: 30px;
    bottom: 0;
    font-weight: 600;
  }
  .editName{
    display: block;
    width: 60px;
    height: 1.1em;
    text-indent: 0;
  }
  .personAvatorTool{
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 24px;
    cursor: pointer;
    user-select: none;
    font-weight: 600;
  }
  .personInfoConetnetList{
    width: 100%;
    padding: 15px;
    user-select: none;
  }
  .personInfoConetnetList li{
    display: flex;
    padding: 16px 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    flex-wrap: nowrap;
    -webkit-text-wrap: nowrap;
    justify-content: space-between;
    border-bottom: 1px solid #e9e8ec;
  }
  .icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
  .text{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .editPersonInfoButton{
    margin-top: 20px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .button{
    display:block;
    background: var(--background);
    color: var(--color);
    width: 80%;
    padding: 10px 0;
    font-size: 20px;
    border-radius: 10px;
    user-select: none;
    cursor: pointer;
    transition: all .1s linear;
  }
  .button:hover{
      transform: translateY(-3px);
      box-shadow: 0 10px 10px rgba(0, 0, 0,.2);
  }
  .button:active{
      transform: translateY(-1px);
      box-shadow: 0 5px 5px rgba(0, 0, 0,.2);
  }
  .button:hover:after{
      transform:scaleX(1.4) scaleY(1.6);
      opacity: 0;
  }
  .save{
    background: #9174d8;
  }
</style>
