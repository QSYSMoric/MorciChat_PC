export default class Moric_ChatMsg{
    constructor(senderId,timing,text_content,img,dynamic_id,historyId){
        this.senderId = senderId;
        this.timing = timing;
        this.text_content = text_content;
        this.img = img;
        this.dynamic_id = dynamic_id;
        this.historyId = historyId;
    }
}