import { createRouter,createWebHashHistory } from "vue-router";
import MoricLoginContentRoutes from "@/views/MoricLogin/routers";

const routes = [
    {
        path:"/",
        name:"Home",
        component:()=>import('@/views/MoricHome/MoricHome.vue')
    },
    {
        path:"/Login",
        name:"Login",
        component:()=>import('@/views/MoricLogin/MoricLogin.vue'),
        children:MoricLoginContentRoutes
    }
]

const router = createRouter({
    routes,
    history:createWebHashHistory()
});

export default router;