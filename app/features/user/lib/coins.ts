const XPFactors = {
  time: 0.7,
  weight: 0.4,
};

export const calculateCoins = (
  trainingTime: number,
  totalWeight: number,
): number => {
  return Math.round(
    (trainingTime * XPFactors.time + totalWeight * XPFactors.weight) * 10,
  );
};
