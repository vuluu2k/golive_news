export const WEEK_DAYS = {
  1: "Thứ hai",
  2: "Thứ ba",
  3: "Thứ tư",
  4: "Thứ năm",
  5: "Thứ sáu",
  6: "Thứ bảy",
  0: "Chủ nhật",
};

export const isDateInThisWeek = (date) => {
  const todayObj = new Date();
  const todayDate = todayObj.getDate();
  const todayDay = todayObj.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay + 1));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // if date is equal or within the first and last dates of the week
  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

export const formatAMPM = (time) => {
  const date = new Date(time);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};

export const timeAgos = (time) => {
  const date = new Date(time * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffDays > 0) {
    if (diffDays === 1) {
      return "Hôm qua";
    }
    if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    }
    if (isDateInThisWeek(date)) {
      return `${WEEK_DAYS[date.getDay()]}`;
    }
    return `${("0" + date.getDate()).substr(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).substr(-2)}/${date.getFullYear()}`;
  }
  if (diffHours > 0) {
    return `${diffHours} giờ trước`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} phút trước`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} giây trước`;
  }
  return "Vừa xong";
};

export const format_Date_YYYYMMDD = (time) => {
  const date = new Date(time * 1000);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffDays = Math.floor(diff / (1000 * 3600 * 24));
  const diffHours = Math.floor(diff / (1000 * 3600));
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffSeconds = Math.floor(diff / 1000);
  if (diffDays > 0) {
    if (diffDays === 1) {
      return "Hôm qua";
    }
    if (diffDays < 7) {
      return `${diffDays} ngày trước`;
    }
    if (isDateInThisWeek(date)) {
      return `${WEEK_DAYS[date.getDay()]}`;
    }
    return `${date.getFullYear() + "-" + ("0" +(date.getMonth() + 1)).substr(-2) + "-" + ("0" + date.getDate()).substr(-2)}`;
  }
  if (diffHours > 0) {
    return `${diffHours} giờ trước`;
  }
  if (diffMinutes > 0) {
    return `${diffMinutes} phút trước`;
  }
  if (diffSeconds > 0) {
    return `${diffSeconds} giây trước`;
  }
  return "Vừa xong";
};
