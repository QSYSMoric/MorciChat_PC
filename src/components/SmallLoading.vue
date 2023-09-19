<template>
    <div class="loadingSeven">
        <div class="loadingAn">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
</script>

<style>
    .loadingSeven{
        width: 90%;
        height: 100%;
        position: absolute;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        background: #ffffff;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999;
    }
    .loadingAn{
        width: 100px;
        display: flex;
    }
    .loadingSeven span{
        display: block;
        margin-left: 5px;
        width: 8px;
        height: 100%;
        border-radius: 4px;
        background: var(--background);
        animation: loadsaven 1.04s ease infinite;
    }
    @keyframes loadsaven{
        0%,100%{
            height: 40px;
            background: #ffffff;
        }
        50%{
            height: 60px;
            margin-top: -20px;
            background: var(--background);
        }
    }
    .loadingSeven span:nth-child(2){
        animation-delay:0.13s;
    }
    .loadingSeven span:nth-child(3){
        animation-delay:0.26s;
    }
    .loadingSeven span:nth-child(4){
        animation-delay:0.39s;
    }
    .loadingSeven span:nth-child(5){
        animation-delay:0.52s;
    }
</style>