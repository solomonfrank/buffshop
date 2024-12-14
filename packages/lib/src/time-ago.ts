export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (daysAgo > 0) {
    return rtf.format(-daysAgo, "day");
  } else if (hoursAgo > 0) {
    return rtf.format(-hoursAgo, "hour");
  } else if (minutesAgo > 0) {
    return rtf.format(-minutesAgo, "minute");
  } else {
    return rtf.format(-secondsAgo, "second");
  }
}
