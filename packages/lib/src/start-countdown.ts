export const startCountdown = (
  time: string,
  onTick: (formattedTime: string) => void,
  intervalRef: { current: number | null }
) => {
  const [hours = 0, minutes = 0, seconds = 0] = time
    .split(":")
    .map((part) => Number(part) || 0);
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;

  intervalRef.current = window.setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(intervalRef.current!);
      onTick("00:00:00");
      return;
    }

    totalSeconds--;
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const formattedTime = `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    onTick(formattedTime);

    // Sync countdown with localStorage for cross-tab communication
    localStorage.setItem("countdown", formattedTime);
  }, 1000);
};
