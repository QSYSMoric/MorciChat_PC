<template>
    <!-- <transition
    enter-active-class="animate__animated animate__jackInTheBox"
    leave-active-class="animate__animated animate__rotateOutDownLeft"> -->
    <div class="Prompt animate__animated animate__jackInTheBox" v-if="isPromt">
        <div class="state">
            <div :class="{
                iconTrue:isState,
                iconFalse:!isState
            }">
                {{Prompt.icon}}
            </div>
        </div>
        <p>
            {{Prompt.data}}
        </p>
    </div>
    <!-- </transition> -->
</template>

<script setup>
    import { onMounted, reactive, ref } from "vue";
    const props = defineProps(["alertMsg","state","during","destroyFn"]);
    const isPromt = ref(true);
    const isState = ref(props.state);
    const Prompt = reactive({
        icon:"",
        data:props.alertMsg,
    });
    if(isState.value){
        Prompt.icon = "";
    }else{
        Prompt.icon = "";
    }
    onMounted(()=>{
        let showPromt = setTimeout(() => {
            isPromt.value = false;
            clearTimeout(showPromt);
            props.destroyFn();
        }, props.during);
    });
</script>

<style scoped>
    .Prompt{
        display: grid;
        position: fixed;
        padding: 7px;
        border-radius: 2px;
        font-size: 14pt;
        top: 30px;
        left: 47%;
        grid-template-columns: 30px 1fr;
        box-shadow: 0px 2px 10px rgba(0,0,0,.2);
        z-index: 99999;
    }
    .state{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .iconTrue{
        padding: 3px;
        font-size: 8pt;
        background: #53d86a;
        color: #ffff;
        border-radius: 50%;
    }
    .iconFalse{
        padding: 3px;
        font-size: 8pt;
        background: #fc3d38;
        color: #ffff;
        border-radius: 50%;
    }
</style>