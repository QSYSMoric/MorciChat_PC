import { createRouter,createWebHashHistory } from "vue-router";
import MoricLoginContentRoutes from "@/views/MoricLogin/routers";
import MoricPageContentRoutes from "@/views/MoricPage/routers/router";
import Loading from '@/utils/loading';
import cookies from "@/utils/cookies";

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
        meta:{
            requiresAuth: false // 不需要验证在线
        },
        component:()=>import('@/views/MoricLogin/MoricLogin.vue'),
        children:MoricLoginContentRoutes
    },
    {
        path:"/Page",
        name:"Page",
        meta:{
            requiresAuth: false // 不需要验证在线
        },
        component:()=>import('@/views/MoricPage/MoricPage.vue'),
        children:MoricPageContentRoutes,
    },
    {
        path:"/Error",
        name:"Error",
        meta:{
            requiresAuth: false // 不需要验证在线
        },
        component:()=>import('@/components/Error.vue'),
    }
];

const router = createRouter({
    routes,
    history:createWebHashHistory()
});

//验证下一个路由是否需要验证用户在线？
router.beforeEach((to,from,next)=>{
    if(to.meta.requiresAuth){
        if(cookies.getCookie()){
            return next();
        }
        next({path:"/Error",});
    }
    return next();
});

router.afterEach(()=>{
    Loading.unLoading();
})

export default router;