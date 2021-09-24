export function formatDate(date,isTime = false) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  let dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

  if (isTime) {
    dateStr += ` ${pad(date.getHours())}:${pad(date.getMinutes())}`
  }
  return dateStr;
}