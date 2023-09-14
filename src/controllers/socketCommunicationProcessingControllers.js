import bufferToBase64 from "@/utils/bufferToBase64";
import { useMomentsStore } from "@/store/momentsSessionStore";
import { useCommentStore } from "@/store/commentSessionStore";
import { useChatHistoryByUserId } from "@/store/chatHistoryByUserIdStore";
import formatDate from "@/utils/formatDate";
import PubSub from "pubsub-js";

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
        chatHistory.addNewChatByServe(chatMsg);
        PubSub.publish(`chat${chatMsg.dynamic_id}LastMsg`,{
            text_content:chatMsg.text_content,
            timing:chatMsg.timing
        });
    }
}