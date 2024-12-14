export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC", // Modify this to the desired timezone if needed
  });

  return formatter.format(date);
};

export const formatLongDate = (isoString: string): string => {
  const date = new Date(isoString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
};
