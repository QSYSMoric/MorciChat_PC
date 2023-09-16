import dayjs from "dayjs";

function formatDate(dateString) {
  const dateTime = dayjs(dateString);
  const year = dateTime.year();
  const monthDay = dateTime.format("MM-DD");
  const hourMinute = dateTime.format("HH:mm");
  const now = dateTime.format('YYYY-MM-DD HH:mm:ss');

  return {
    year,
    monthDay,
    now,
    hourMinute
  };
}

export default formatDate;