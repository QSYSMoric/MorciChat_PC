import axios from "@/utils/api"

class Moric_Moments{
    constructor(friendCircleCopy,friendCircleImg){
        this.friendCircleCopy = friendCircleCopy;
        this.friendCircleImg = friendCircleImg;
    }
    async publish(){
        try {
            const response = await axios({
                method: "post",
                url: "/moric/publishMoments",
                data: this
            });
            console.log(response);
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error.message);
        }
    }
}

export default Moric_Moments;