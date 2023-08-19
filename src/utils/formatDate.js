function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const monthDay = `${month}-${day < 10 ? '0' + day : day}`;
    const hour = date.getHours();
    const minute = date.getMinutes();
    const hourMinute = `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;

    return {
      year,
      monthDay,
      hourMinute
    };
}
export default formatDate;