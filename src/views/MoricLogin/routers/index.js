const routes = [
    {
        path:"",
        name:"MoricLoginIndex",
        redirect:{
            path:"/Login/Operatelogin",
            name:"Operatelogin"
        }
    },
    {
        path:"Operatelogin",
        name:"Operatelogin",
        component:()=>import('../components/MoricLoginContent.vue'),
        meta:{
            inTransition:"animate__fadeInRight",
            outTransition:"animate__fadeOutDown"
        }
    },
    {
        path:"OperateRegister",
        name:"OperateRegister",
        component:()=>import('../components/MoricRegisterContent.vue'),
        meta:{
            inTransition:"animate__fadeInRight",
            outTransition:"animate__fadeOutDown"
        }        
    }
];

export default routes;