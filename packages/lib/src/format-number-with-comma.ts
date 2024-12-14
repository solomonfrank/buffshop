export const formatNumberWithCommas = (amount: string): string => {
  const cleanData = amount.toString().includes(",")
    ? amount.replaceAll(",", "")
    : amount;
  const number = parseInt(cleanData);
  return number.toLocaleString("en-US");
};
