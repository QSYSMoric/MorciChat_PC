<template>
  <router-view></router-view>
</template>

<script>
import '@/assets/styles/err.css';
import SocketModule from "@/utils/socketIO";
import { onBeforeUnmount } from "vue";
export default {
  name: 'App',
  setup(){
    onBeforeUnmount(()=>{
      SocketModule.end();
    })
  }
}
</script>

<style>
  html {
    overflow-y: scroll;
    box-sizing: border-box;
    --background:#052630;
    --color:#f2efe5;
  }
  *,
  ::before,
  ::after {
      font-family: 'icomoon','IOS';
      box-sizing: inherit;
  }
  :root{
      font-size: calc(0.5em + 1vw);
  }
  body {
      margin: 0;
  }
  div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,form,fieldset,input,textarea,blockquote,p {
      padding: 0;
      margin: 0;
  }
  table,td,tr,th {
      font-size: 12px;
  }
  li {
      list-style-type: none;
  }
  img {
      vertical-align: top;
      border: 0;
  }
  ol,ul {
      list-style: none;
  }
  h1,h2,h3,h4,h5,h6 {
      font-size: 12px;
      font-weight: normal;
  }
  address,cite,code,em,th {
      font-weight: normal;
      font-style: normal;
  }
  @font-face {
    font-family: "Luckiest";
    src: url("@/assets/fonts/LuckiestGuy.ttf") format('truetype');
  }
  @font-face {
    font-family: "IOS";
    src:url("@/assets/fonts/ios.ttf") format('truetype');
  }
  button{
    outline: none;
    border:none;
    cursor:pointer;
  }
  .animate__animated{
      animation-direction: .4s;
      /* animation-timing-function:ease-in; */
  }
  *::-webkit-scrollbar{
      background-color: transparent;
      width: 12px;
  }
  *::-webkit-scrollbar-thumb{
      background-color: #d2d1d7;
      border-radius: 8px;
      background-clip: content-box;
      border: 2px solid transparent;
  }
  body[scroll],
  *::-webkit-scrollbar-thumb:hover{
      background-color: rgba(0,0,0,.5);
      transition: 0s;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: contain;
    user-select: none;
  }
  @media(max-width:767px){
    *::-webkit-scrollbar-thumb{
      background-color:transparent;
    }
  }
  .imgLoading{
    background: linear-gradient(110deg,
    rgba(255,255,255, 0) 40%,
    rgba(255,255,255,.5) 50%,
    rgba(255,255,255,0) 60%) #d9d9d9;
    background-size: 200% 100%;
    background-position-x: 120%;
    overflow: hidden;
    animation: 1s loading ease-in-out infinite;
  }
  @keyframes loading{
    to{
        background-position-x: -20%;
    }
  }
</style>
