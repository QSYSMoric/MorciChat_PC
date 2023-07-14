const routes = [
    {
        path:"",
        name:"MoricLoginIndex",
        redirect:{
            name:"Operatelogin"
        },
    },
    {
        path:"Operatelogin",
        name:"Operatelogin",
        component:()=>import('../components/MoricLoginContent.vue')
    }
];

export default routes;