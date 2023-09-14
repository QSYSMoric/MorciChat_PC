export default class Moric_ChatUser{
    constructor(id ,historyId = null,remark = null,friendStatus = null){
        this.active = false;
        this.remark = remark;
        this.friendStatus = friendStatus;
        this.friendId = id;
        this.historyId = historyId;
        this.lastMsg = null;
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