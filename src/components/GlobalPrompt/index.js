import { h, render } from 'vue';
import GlobalPromptVue from './GlobalPrompt.vue';

function Prompt(content,done,timing = 3000,callback = null){
    // 销毁组件
    const destroyFn = () => {
        render(null, document.body);
    };
    // 生成组件
    const vnode = h(GlobalPromptVue, {
        alertMsg: content,
        state: done,
        during: timing,
        destroyFn,
        callback
    });
    render(vnode, document.body);
};

export default Prompt;
