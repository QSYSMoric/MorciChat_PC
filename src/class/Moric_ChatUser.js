import day from '@/utils/day';

export default class Moric_ChatUser{
    constructor(id,friendStatus='pending',historyId = null,remark = null,lastContacttime = day.getFullDateTime()){
        this.friendId = id;
        this.active = false;
        this.remark = remark;
        this.friendStatus = friendStatus;
        this.historyId = historyId;
        this.lastContacttime = lastContacttime;
        this.lastMsg = {
            timing:"",
            text_content:"",
        };
    }
    onActive(){
        this.active = true;
    }
    offActive(){
        this.active = false;
    }
    setLastMsg(text){
        this.lastMsg = text;
    }
}