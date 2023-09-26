<template>
  <ul class="myWorkArea">
    <li class="area">
        <h1>其他信息</h1>
        <ul class="areaContent">
            <li>
                <div class="areaContentItemIcon">
                    <i></i>
                    <p>好友数量：</p>
                </div>
                <div class="areaContentItemText">
                    {{ useFriendListStore().getFriendLength }}
                </div>
            </li>
            <li>
                <div class="areaContentItemIcon">
                    <i style="background-color: #fdd3d6;"></i>
                    <p>发布文章：</p>
                </div>
                <div class="areaContentItemText">
                    {{ useSelfStore().myMoments.length }}
                </div>
            </li>
            <li>
                <div class="areaContentItemIcon">
                    <i style="background-color: #242221;"></i>
                    <p>注册时间：</p>
                </div>
                <div class="areaContentItemText" v-if="useSelfStore().userCreateAt">
                    {{ useSelfStore().userCreateAt.now }}
                </div>
            </li>
        </ul>
    </li>
    <li class="myMoment">
        <h1>我发布的</h1>
        <div class="myMomentContent">
            <ul class="showMoments">
                <TransitionGroup 
                name="list"
                enter-active-class="animate__animated animate__fadeInRight">
                    <Moments v-for="element in useSelfStore().myMoments" :momentsObj="element" :key="element"/>
                </TransitionGroup>
            </ul>
        </div>
    </li>
  </ul>
</template>

<script setup>
    import Moments from "../communityBar/components/Moments.vue";
    import { useFriendListStore } from '@/store/friendListSessionStore';
    import { useSelfStore } from '@/store/selfStore';
</script>

<style scoped>
    .myWorkArea{
        width: 100%;
        height: 100%;
        padding: 0px 20px;
        display: grid;
        grid-template-rows: max-content 1fr;
    }
    .area{
        width: 100%;
    }
    .area h1{
        font-size: 24px;
        font-weight: 400;
    }
    .areaContent{
        width: 100%;
        margin-top: 15px;
    }
    .areaContent li{
        width: 100%;
        background: #ffff;
        display: flex;
        border-radius: 10px;
    }
    .areaContent li + li{
        margin-top: 10px;
    }
    .areaContentItemIcon{
        display: flex;
        width: 100%;
        padding: 10px;
    }
    .areaContentItemIcon i{
        display: flex;
        justify-content: center;
        align-items: center;
        font-style: normal;
        font-size: 24px;
        font-weight: 600;
        padding: 10px;
        border-radius: 10px;
        background: #aae5e5;
        color: #f8f8f8;
    }
    .areaContentItemIcon p{
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        margin-left: 15px;
    }
    .areaContentItemText{
        display: flex;
        flex-grow: 1;
        justify-content: center;
        text-align: center;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 10px;
        margin-right: 10px;
        font-size: 12px;
    }
    .myMoment{
        margin-top: 15px;
        width: 100;
        height: 100%;
    }
    .myMoment h1{
        font-size: 24px;
        font-weight: 400;
    }
    .myMomentContent{
        width: 100%;
        border-radius: 12px;
        height: 382px;
        overflow: auto;
    }

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
    overflow: hidden;
    background: #fff;
  }
  .list-move, /* 对移动中的元素应用的过渡 */
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }

  /* 确保将离开的元素从布局流中删除
    以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }
</style>