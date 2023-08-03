import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/index';
import "@/assets/fonts/icomoon/style.css";
import api from "@/utils/api";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 引入animate.css
import 'animate.css';
//全局组件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');