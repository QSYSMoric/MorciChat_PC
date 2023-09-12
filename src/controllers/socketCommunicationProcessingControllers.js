import bufferToBase64 from "@/utils/bufferToBase64";
import { useMomentsStore } from "@/store/momentsSessionStore";
import { useCommentStore } from "@/store/commentSessionStore";

import formatDate from "@/utils/formatDate";

export default {
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
    newCommentsProcess(newComment){
        const comment = useCommentStore();
        newComment.timing = formatDate(newComment.timing);
        comment.addNewComment(newComment);
    }
}