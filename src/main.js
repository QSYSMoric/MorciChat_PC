import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/index';
import "@/assets/fonts/icomoon/style.css";
import api from "@/utils/api";
// 引入animate.css
import 'animate.css';
//全局组件


const app = createApp(App);
app.use(router);
app.mount('#app');