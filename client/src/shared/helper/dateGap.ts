export const dateGap = (date: Date, otherDate: Date = new Date()) => {
  const diff = Math.abs(date.getTime() - otherDate.getTime());

  const yearMillis = 1000 * 60 * 60 * 24 * 365;
  const monthMillis = 1000 * 60 * 60 * 24 * 30;
  const dayMillis = 1000 * 60 * 60 * 24;
  const hourMillis = 1000 * 60 * 60;
  const minuteMillis = 1000 * 60;

  if (diff >= yearMillis) {
    const years = Math.floor(diff / yearMillis);
    return `${years}년`;
  }

  if (diff >= monthMillis) {
    const months = Math.floor(diff / monthMillis);
    return `${months}월`;
  }

  if (diff >= dayMillis) {
    const days = Math.floor(diff / dayMillis);
    return `${days}일`;
  }

  if (diff >= hourMillis) {
    const hours = Math.floor(diff / hourMillis);
    return `${hours}시간`;
  }

  if (diff >= minuteMillis) {
    const minutes = Math.floor(diff / minuteMillis);
    return `${minutes}분`;
  }

  return "방금";
}