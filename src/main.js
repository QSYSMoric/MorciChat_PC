import { createApp } from 'vue'
import App from './App.vue'
import router from './routers/index'
import "@/assets/fonts/icomoon/style.css"

const app = createApp(App);
app.use(router);
app.mount('#app');