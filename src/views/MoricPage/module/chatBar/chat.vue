<template>
  <section class="chatBar">
    <!-- 聊天对象列表 -->
    <aside class="chatUserList">
        <div class="chatUserListTitle">我的消息</div>
        <ul class="chatUserListContent">    
          <li v-for="(node,index) in userLists.getChatUserList" :key="index">
            <ChatUserListItem :user="node" :select="select"/>
          </li>
        </ul>
    </aside>
    <ChatRoom :chatToUser="selectUser.newSelect"/>
  </section>
</template>

<script setup>
  import { onBeforeRouteLeave } from 'vue-router';
  import PubSub from 'pubsub-js';
  import ChatUserListItem from './components/ChatUserListItem.vue';
  import ChatRoom from './components/ChatRoom.vue';
  import { useChatUserList } from '@/store/chatFriendListSessionStore';
  import { reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  const userLists = useChatUserList();

  //用户选中的聊天对象
  const selectUser = reactive({
    oldSelect:null,
    newSelect:userLists.getChatUserList[0]
  });
  //初始化
  if(selectUser.newSelect){
    selectUser.newSelect.onActive();
  }
  //页面刷新时订阅好友列表的第一个人
  PubSub.subscribe("chatSelectFrist",(_,defaultChatUser)=>{
    defaultChatUser.onActive();
    selectUser.newSelect = defaultChatUser;
  });
  //接收最新的用户并且显示它的历史聊天记录
  const route = useRoute();
  // console.log( userLists.getChatUserList[route.query.tempUser])
  // selectUser.newSelect = userLists.getChatUserList[route.query.tempUser];
  watch(()=>{
    return route.query.tempUser;
  },()=>{
    if(userLists.getChatUserList[route.query.tempUser]){
      selectUser.newSelect = userLists.getChatUserList[route.query.tempUser];
      userLists.getChatUserList[route.query.tempUser].onActive();
    }
  });

  //切换选中目标
  function select(Chatuser){
    selectUser.newSelect = Chatuser;
  }
  //切换选中状态
  watch(()=>{
    return selectUser.newSelect
  },(newValue,oldValue)=>{
    if(oldValue){
      oldValue.offActive();
    }
  },{
    deep:true
  });

  //实时反映功能列表
  PubSub.publish(`chatBaron`);
  onBeforeRouteLeave(()=>{
    PubSub.publish(`chatBaroff`);
  });
</script>

<style>
  .chatBar{
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: grid;
    grid-template-columns: 240px 1fr;
  }
  .chatUserList{
        width: 100%;
        height: 100%;
        background: #ffff;
        overflow: auto;
        border-radius: 10px;
    }
    .chatUserList::-webkit-scrollbar{
        opacity: 0;
        display: none;
        position: absolute;
        z-index: 1;
    }
    .chatUserListTitle{
        padding: 15px;
        font-size: 18px;
    }
</style>
  