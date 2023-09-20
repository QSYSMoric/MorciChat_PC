<template>
    <div class="friendSearch">
        <div class="searchBox">
            <div class="MoricSearchInput">
                <input type="text" title="search" v-model="userId.serachText" placeholder="寻找好友Id">
                <div class="friendSearchButton" @click.stop="searchUser">
                    
                </div>
            </div>
        </div>
        <div class="friendCardShow">
            <SmallLoading v-if="userId.state"></SmallLoading>
            <FriednShowCard :ladingSearchOff="loadingOff"></FriednShowCard>
        </div>
    </div>
</template>

<script  setup>
    import FriednShowCard from './FriednShowCard.vue';
    import SmallLoading from '@/components/SmallLoading';
    import PubSub from 'pubsub-js';
    import { reactive } from 'vue';
    import { onBeforeRouteLeave } from 'vue-router';

    let userId = reactive({
        serachText:"",
        state:false
    });

    function loadingOn(){
        userId.state = true;
    }
    function loadingOff(){
        let searchAn = setTimeout(() => {
            userId.state = false;
            clearTimeout(searchAn);               
        }, 500);
    }

    onBeforeRouteLeave(()=>{
        userId.serachText = "";
    });

    //搜索按钮
    function searchUser(){
        loadingOn();
        PubSub.publish("searchUserByID",userId.serachText);
    }

</script>

<style scoped>
    .friendSearch{
        width: 100%;
        height: 100%;
        display: grid;
        overflow: hidden;
        grid-template-rows: max-content 1fr;
        gap: 10px;
    }
    .MoricSearchInput{
        width: 90%;
        height: 30px;
        /* margin: 5px 0; */
        display: grid;
        grid-template-columns: 1fr 50px;
        /* padding: 0 24px; */
    }
    .searchBox{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .MoricSearchInput input{
        display: flex;
        align-items: center;
        width: 100%;
        /* min-width: 50px; */
        height: 100%;
        font-size: 12pt;
        outline: none;
        border: none;
        /* color: #d2d0da; */
        background-color: #ffff;
        border-radius: 5px 0 0 5px;
        text-indent: 1em;
    }
    .friendSearchButton{
        width: 100%;
        height: 100%;
        display: flex;
        font-size: 16px;
        justify-content: center;
        align-items: center;
        border-radius: 0 5px 5px 0;
        /* background: #157efb; */
        font-size: 18px;
        color: var(--background);
        background: #d2d1d7;
        font-weight: 600;
        user-select: none;
        transition: transform .2s linear;
        cursor: pointer;
    }
    .friendSearchButton:hover{
        background: var(--background);
        color: #ffff;
        transform:translateY(-1px) scale(1.02);
        box-shadow: 0 2px 3px rgba(0, 0, 0,.2);
    }
    .friendSearchButton:active{
        transform:translateY(-2px) scale(1.02);
        box-shadow: 0 2px 1px rgba(0, 0, 0,.2);
    }
    .friendCardShow{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>