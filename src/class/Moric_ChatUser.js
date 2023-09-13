export default class Moric_ChatUser{
    constructor(id ,historyId = null,remark = null,friendStatus = null){
        this.active = false;
        this.remark = remark;
        this.friendStatus = friendStatus;
        this.friendId = id;
        this.historyId = historyId;
    }
    onActive(){
        this.active = true;
    }
    offActive(){
        this.active = false;
    }
}