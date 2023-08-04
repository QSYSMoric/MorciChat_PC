import PubSub from 'pubsub-js';
const routes = [
    {
        path:"communityBar",
        name:"communityBar",
        component:()=>import('../module/communityBar/community.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter: (to, from, next) => {
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
    {
        path:"chatBar",
        name:"chatBar",
        component:()=>import('../module/chatBar/chat.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter: (to, from, next) => {
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
    {
        path:"selfBar",
        name:"selfBar",
        component:()=>import('../module/selfBar/self.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter(to,from,next){
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
    {
        path:"newFriendBar",
        name:"newFriendBar",
        component:()=>import('../module/newFriendBar/newFriend.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter(to,from,next){
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
    {
        path:"aboutBar",
        name:"aboutBar",
        component:()=>import('../module/aboutBar/about.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter(to,from,next){
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
    {
        path:"settingBar",
        name:"settingBar",
        component:()=>import('../module/settingBar/setting.vue'),
        meta:{
            requiresAuth: true // 需要验证在线
        },
        beforeEnter(to,from,next){
            PubSub.publish(`${to.name}on`);
            next();
        }
    },
];

export default routes;