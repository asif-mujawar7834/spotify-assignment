export const convertPercentageToValue = (
  percentage: number,
  maxValue: number = 190
): number => {
  if (percentage < 0 || percentage > 100) {
    throw new Error("Percentage must be between 0 and 100");
  }
  return (percentage / 100) * maxValue;
};
