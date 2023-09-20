import bufferToBase64 from "@/utils/bufferToBase64";
import { useMomentsStore } from "@/store/momentsSessionStore";
import { useCommentStore } from "@/store/commentSessionStore";
import { useChatHistoryByUserId } from "@/store/chatHistoryByUserIdStore";
import { useChatUserList } from "@/store/chatFriendListSessionStore";
import { useFriendListStore } from "@/store/friendListSessionStore";
import formatDate from "@/utils/formatDate";
import { useSelfStore } from "@/store/selfStore";

export default {
    //处理最新的动态
    newMomentsProcess(newMoment){
        const moment = useMomentsStore();
        newMoment.publishTiming = formatDate(newMoment.publishTiming);
        if(newMoment.friendCircleImg){
            bufferToBase64.buffersToBase64Array(newMoment.friendCircleImg).then((data)=>{
                newMoment.friendCircleImg = data;
                return moment.addNewMoment(newMoment);
            });
        }else{
            return moment.addNewMoment(newMoment);
        }
    },
    //处理最新的评论
    newCommentsProcess(newComment){
        const comment = useCommentStore();
        newComment.timing = formatDate(newComment.timing);
        comment.addNewComment(newComment);
    },
    //处理频道消息
    newchannelMessages(chatMsg){
        const chatHistory = useChatHistoryByUserId();
        chatMsg.timing = formatDate(chatMsg.timing);
        chatHistory.addNewChatByServe(chatMsg.historyId,chatMsg);
    },
    //处理私信
    privateMessage(chatMsg){
        const chatHistory = useChatHistoryByUserId();
        const chatUserList = useChatUserList();
        chatMsg.timing = formatDate(chatMsg.timing);
        const self = useSelfStore();
        let fromId = chatMsg.senderId
        if(chatMsg.senderId == self.getId()){
            fromId = chatMsg.dynamic_id;
        }else{
            fromId = chatMsg.senderId;
        }
        //为这个私聊用户创建一条信息
        chatUserList.addNewChatUser(fromId,chatMsg.historyId);
        //添加信息
        chatHistory.addNewChatByServe(chatMsg.historyId,chatMsg);
    },
    //处理好友请求
    friendRequest(friendRequest){
        const friendList = useFriendListStore();
        friendList.addNewFriendRequest(friendRequest);
    },
    //通过好友验证后操作
    friendsThrough(friendOperation){
        const friendApplication = useFriendListStore();
        friendApplication.updateFriendApplication(friendOperation);
    }
}