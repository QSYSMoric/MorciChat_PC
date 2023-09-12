export default class Moric_ChatUser{
    constructor(id,historyId,remark,friendStatus){
        this.active = false;
        this.remark = remark;
        this.friendStatus = friendStatus;
        this.id = id;
        this.historyId = historyId;
    }
    onActive(){
        this.active = true;
    }
    offActive(){
        this.active = false;
    }
}