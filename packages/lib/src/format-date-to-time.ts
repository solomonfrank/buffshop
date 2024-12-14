export const formatDateToTime = (dateStr: string): string => {
  const date = new Date(dateStr);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${period}`;
};
