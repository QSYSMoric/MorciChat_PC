const routes = [
    {
        path:"chatRoom/:chatObjId",
        name:"chatRoom",
        component:()=>import('../controllers/ChatRoom.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
    },
];

export default routes;