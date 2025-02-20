const XPFactors = {
  time: 0.7,
  weight: 0.4,
};

export const calculateCoins = (
  trainingTime: number,
  totalWeight: number,
): number => {
  return Math.round(
    (Math.min(trainingTime, 7200) * XPFactors.time +
      totalWeight * XPFactors.weight) *
      10,
  );
};
