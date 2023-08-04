import Cookies from "js-cookie";

function getCookie(){
    return Boolean(Cookies.get("isLoggedin") === "true")?true:false;
}

function setCookie(){
    Cookies.set("isLoggedin",false);
}
export default{
    getCookie,
    setCookie
}