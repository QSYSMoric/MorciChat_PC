<template>
    <div class="systemNotifications">
        <h3>温馨提示</h3>
        <div class="systemNotificationsText">
            <p>
                本作者由于未做软件测试，想必有不小的bug，如果遇到bug请刷新页面，因为本人也不知道有什么bug会发生
            </p>
            <p>
                感谢理解
            </p>
        </div>
    </div>
</template>

<script setup>
</script>

<style>
    .systemNotifications{
        margin-top: 40%;
        width: 100%;
        height: 400px;
        overflow: auto;
        padding: 15px 21px;
        background: #f8f8f8;
    }
    .systemNotifications h3{
        font-size: 25px;
        font-weight: 500;
    }
    .systemNotificationsText{
        line-height: 1.6em;
        text-indent: 2em;
        margin-top: 30px;
        font-size: 19px;
    }
</style>