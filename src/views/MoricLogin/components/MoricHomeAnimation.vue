<template>
    <div class="container">
        <div class="loader">
            <div class="snow">
                <span style="--i:11"></span>
                <span style="--i:12"></span>
                <span style="--i:15"></span>
                <span style="--i:18"></span>
                <span style="--i:12"></span>
                <span style="--i:17"></span>
                <span style="--i:12"></span>
                <span style="--i:11"></span>
                <span style="--i:16"></span>
                <span style="--i:14"></span>
            </div>
        </div>
    </div>
</template> 

<script setup>
</script>

<style scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loader{
        position: relative;
        width: 200px;
        height: 40px;
        border-radius: 100px;
        background: var(--background);
    }
    .loader::before{
        content: "";
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--background);
        box-shadow: 60px 0 0 20px var(--background);
        left: 30px;
        top: -30px;
    }
    .loader::after{
        content: "";
        position: absolute;
        right: 15px;
        top: -20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--background);
    }
    .snow{
        width: 100%;
        position: relative;
        margin-top: 5px;
        display: flex;
        justify-content: space-evenly;
        z-index: -1;
    }
    .snow span{
        position: relative;
        font-size: 16px;
        /* width: 5px;
        height: 5px; */
        /* background: var(--background); */
        margin: 0 2px;
        border-radius: 50%;
        animation: snowing 5s linear infinite;
        animation-duration: calc( 15s /var( --i ));
        z-index: -1;
    }
    @keyframes snowing{
        0%{
            transform: translateY(0px);
        }
        70%{
            transform: translateY(120px) scale(1);
        }
        100%{
            transform: translateY(120px) scale(0);
        }
    }
</style>