import { useChatUserList } from '@/store/chatFriendListSessionStore';

export default async function(){
    //获取好友列表
    let chatUserList = useChatUserList();
    chatUserList.getFriendUserList();
}