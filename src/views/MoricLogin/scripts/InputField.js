//输入类对象
class InputField {
    constructor() {
        this.data = "";
        this.class = {
            err: false,
            animate__headShake: false,
        };
    }        
    onErr() {
        this.class.err = true;
        this.class.animate__headShake = true;
    }        
    offErr() {
        this.class.err = false;
        this.class.animate__headShake = false;
    }
}

export default InputField