export function convertUTCToWAT(utcTimeString: string) {
  // Parse the UTC time string into a Date object
  const utcDate = new Date(utcTimeString);

  // Check if the provided date is valid
  if (isNaN(utcDate.getTime())) {
    throw new Error("Invalid UTC time string");
  }

  // Add one hour to the UTC time to get WAT
  const watDate = new Date(utcDate.getTime());

  // Format the WAT time in 12-hour format with AM/PM
  return watDate.toLocaleString("en-GB", {
    timeZone: "Africa/Lagos",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}
