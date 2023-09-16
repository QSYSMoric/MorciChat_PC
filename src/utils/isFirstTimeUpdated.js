import dayjs from "dayjs";

export default function compareDates(dateString1, dateString2) {
    if(!dayjs(dateString1).isValid() || !dayjs(dateString2).isValid()){
        throw Error("输入参数为空");
    }
    const date1 = dayjs(dateString1);
    const date2 = dayjs(dateString2);
    return date1.diff(date2)>0?true:false;
}
