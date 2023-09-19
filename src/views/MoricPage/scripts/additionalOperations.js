import { useChatUserList } from '@/store/chatFriendListSessionStore';
import { useFriendListStore } from '@/store/friendListSessionStore';

export default async function(){
    //获取好友列表
    let chatUserList = useChatUserList();
    chatUserList.getFriendUserList();
    //获取好友申请列表
    let friendApplication = useFriendListStore();
    friendApplication.getFriendApplicationListToServe();
}