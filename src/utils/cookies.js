import Cookies from "js-cookie";

function getCookie(){
    return Cookies.get("isLoggedin")?true:false;
}

function setCookie(){
    Cookies.set("isLoggedin",false);
}
export default{
    getCookie,
    setCookie
}