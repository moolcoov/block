export const LEVEL_TO_XP = 212;

const XPFactors = {
  time: 0.9,
  weight: 0.2,
};

export const calculateXP = (
  trainingTime: number,
  totalWeight: number,
): number => {
  return Math.round(
    (Math.min(trainingTime, 7200) * XPFactors.time +
      totalWeight * XPFactors.weight) *
      10,
  );
};

export const getXPLevel = (xp?: number) => {
  return xp ? Math.round(xp / LEVEL_TO_XP) + 1 : 1;
};
