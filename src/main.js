import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import "@/assets/fonts/icomoon/style.css"
// 引入animate.css
import 'animate.css';
//全局组件

const app = createApp(App);
app.use(router);
app.mount('#app');