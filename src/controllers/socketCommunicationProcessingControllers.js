import bufferToBase64 from "@/utils/bufferToBase64";
import { useMomentsStore } from "@/store/momentsSessionStore";
import formatDate from "@/utils/formatDate";

export default {
    newMomentsProcess(newComent){
        const moment = useMomentsStore();
        if(newComent.friendCircleImg){
            bufferToBase64.buffersToBase64Array(newComent.friendCircleImg).then((data)=>{
                newComent.friendCircleImg = data;
                newComent.publishTiming = formatDate(newComent.publishTiming);
                return moment.addNewMoment(newComent);
            });
        }else{
            newComent.publishTiming = formatDate(newComent.publishTiming);
            return moment.addNewMoment(newComent);
        }
    }
}