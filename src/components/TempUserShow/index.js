import { h, render } from 'vue';
import showUserVue from './ShowUser.vue';

function ShowUser(userId){
    // 销毁组件
    const destroyFn = () => {
        render(null, document.body);
    };
    // 生成组件
    const vnode = h(showUserVue, {
        destroyFn,
        userId
    });
    render(vnode, document.body);
};

export default ShowUser;
