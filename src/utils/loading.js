import { render,h } from 'vue';
import LoadingVue from '@/components/Loading.vue';

const toastComp = h(LoadingVue);

function showLoading(){
    render(toastComp,document.body);
}
function unLoading(){
    render(null,document.body);
}

export default {
    showLoading,
    unLoading
}