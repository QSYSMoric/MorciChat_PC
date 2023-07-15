import { createRouter,createWebHashHistory } from "vue-router";
import MoricLoginContentRoutes from "@/views/MoricLogin/routers";
import Loading from '@/utils/loading';

const routes = [
    {
        path:"/",
        name:"Home",
        component:()=>import('@/views/MoricHome/MoricHome.vue')
    },
    {
        path:"/Login",
        name:"Login",
        redirect:"/Operatelogin",
        component:()=>import('@/views/MoricLogin/MoricLogin.vue'),
        children:MoricLoginContentRoutes
    }
]

const router = createRouter({
    routes,
    history:createWebHashHistory()
});

// router.beforeEach((from,to,next)=>{
//     Loading.showLoading();
//     setTimeout(() => {
//         next();
//     }, 500);
// });

router.afterEach(()=>{
    Loading.unLoading();
})

export default router;