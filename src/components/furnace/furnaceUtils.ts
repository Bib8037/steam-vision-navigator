
export const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 85) return "text-green-600 bg-green-50";
  if (efficiency >= 80) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};

export const getLossColor = (loss: number, threshold: number) => {
  if (loss <= threshold) return "text-green-600";
  if (loss <= threshold * 1.5) return "text-yellow-600";
  return "text-red-600";
};
