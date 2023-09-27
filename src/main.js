import { createApp } from 'vue';
import App from './App.vue';
import router from './routers/index';
import "@/assets/fonts/icomoon/style.css";
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import animateLodingList from './directives/animateLodingList';
import animateDirective from './directives/animateDirective';
//导入代码高亮样式
import 'highlight.js/styles/monokai-sublime.css';
import 'highlight.js/lib/common';
// 引入animate.css
import 'animate.css';
//全局组件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.directive('moriclist',animateLodingList);
app.directive('moricchat',animateDirective);
app.use(router);
app.use(pinia);
app.mount('#app');