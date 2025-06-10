
/**
 * Mock API for Furnace thermal efficiency data per plant.
 * Tracks Stack Loss, Wall Loss, and Blowdown Loss metrics.
 */

export interface FurnaceMetric {
  furnaceId: string;
  thermalEfficiency: number;
  stackLoss: {
    thermalLoss: number;
    excessOxygen: number;
    airLeak: number;
  };
  wallLoss: {
    refractoryLoss: number;
    convectionLoss: number;
  };
  blowdownLoss: number;
}

const mockFurnaceData: Record<string, FurnaceMetric[]> = {
  ROC: [
    { furnaceId: "A", thermalEfficiency: 85.2, stackLoss: { thermalLoss: 8.5, excessOxygen: 3.2, airLeak: 1.8 }, wallLoss: { refractoryLoss: 2.1, convectionLoss: 1.4 }, blowdownLoss: 1.0 },
    { furnaceId: "B", thermalEfficiency: 87.1, stackLoss: { thermalLoss: 7.8, excessOxygen: 2.9, airLeak: 1.5 }, wallLoss: { refractoryLoss: 1.9, convectionLoss: 1.2 }, blowdownLoss: 0.8 },
    { furnaceId: "C", thermalEfficiency: 83.9, stackLoss: { thermalLoss: 9.2, excessOxygen: 3.5, airLeak: 2.1 }, wallLoss: { refractoryLoss: 2.3, convectionLoss: 1.6 }, blowdownLoss: 1.2 },
    { furnaceId: "D", thermalEfficiency: 86.5, stackLoss: { thermalLoss: 8.1, excessOxygen: 3.0, airLeak: 1.7 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 0.9 },
    { furnaceId: "E", thermalEfficiency: 84.7, stackLoss: { thermalLoss: 8.8, excessOxygen: 3.3, airLeak: 1.9 }, wallLoss: { refractoryLoss: 2.2, convectionLoss: 1.5 }, blowdownLoss: 1.1 },
    { furnaceId: "F", thermalEfficiency: 88.3, stackLoss: { thermalLoss: 7.2, excessOxygen: 2.7, airLeak: 1.3 }, wallLoss: { refractoryLoss: 1.7, convectionLoss: 1.0 }, blowdownLoss: 0.7 },
    { furnaceId: "G", thermalEfficiency: 85.8, stackLoss: { thermalLoss: 8.3, excessOxygen: 3.1, airLeak: 1.6 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 0.9 },
    { furnaceId: "H", thermalEfficiency: 82.4, stackLoss: { thermalLoss: 9.8, excessOxygen: 3.7, airLeak: 2.3 }, wallLoss: { refractoryLoss: 2.5, convectionLoss: 1.8 }, blowdownLoss: 1.3 },
    { furnaceId: "I", thermalEfficiency: 86.9, stackLoss: { thermalLoss: 7.9, excessOxygen: 2.8, airLeak: 1.4 }, wallLoss: { refractoryLoss: 1.8, convectionLoss: 1.1 }, blowdownLoss: 0.8 },
    { furnaceId: "J", thermalEfficiency: 84.2, stackLoss: { thermalLoss: 9.0, excessOxygen: 3.4, airLeak: 2.0 }, wallLoss: { refractoryLoss: 2.2, convectionLoss: 1.6 }, blowdownLoss: 1.2 },
    { furnaceId: "K", thermalEfficiency: 87.6, stackLoss: { thermalLoss: 7.5, excessOxygen: 2.6, airLeak: 1.2 }, wallLoss: { refractoryLoss: 1.6, convectionLoss: 0.9 }, blowdownLoss: 0.6 },
    { furnaceId: "Q", thermalEfficiency: 83.1, stackLoss: { thermalLoss: 9.5, excessOxygen: 3.6, airLeak: 2.2 }, wallLoss: { refractoryLoss: 2.4, convectionLoss: 1.7 }, blowdownLoss: 1.3 },
    { furnaceId: "R", thermalEfficiency: 85.5, stackLoss: { thermalLoss: 8.4, excessOxygen: 3.1, airLeak: 1.7 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 1.0 },
  ],
  MOC: [
    { furnaceId: "A", thermalEfficiency: 84.8, stackLoss: { thermalLoss: 8.7, excessOxygen: 3.3, airLeak: 1.9 }, wallLoss: { refractoryLoss: 2.1, convectionLoss: 1.4 }, blowdownLoss: 1.1 },
    { furnaceId: "B", thermalEfficiency: 86.3, stackLoss: { thermalLoss: 8.0, excessOxygen: 3.0, airLeak: 1.6 }, wallLoss: { refractoryLoss: 1.9, convectionLoss: 1.2 }, blowdownLoss: 0.9 },
    { furnaceId: "C", thermalEfficiency: 83.5, stackLoss: { thermalLoss: 9.4, excessOxygen: 3.6, airLeak: 2.2 }, wallLoss: { refractoryLoss: 2.3, convectionLoss: 1.6 }, blowdownLoss: 1.3 },
    { furnaceId: "D", thermalEfficiency: 85.9, stackLoss: { thermalLoss: 8.2, excessOxygen: 3.1, airLeak: 1.7 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 1.0 },
    { furnaceId: "E", thermalEfficiency: 87.2, stackLoss: { thermalLoss: 7.6, excessOxygen: 2.8, airLeak: 1.4 }, wallLoss: { refractoryLoss: 1.8, convectionLoss: 1.1 }, blowdownLoss: 0.8 },
    { furnaceId: "F", thermalEfficiency: 84.1, stackLoss: { thermalLoss: 9.0, excessOxygen: 3.4, airLeak: 2.0 }, wallLoss: { refractoryLoss: 2.2, convectionLoss: 1.5 }, blowdownLoss: 1.2 },
    { furnaceId: "G", thermalEfficiency: 86.7, stackLoss: { thermalLoss: 7.8, excessOxygen: 2.9, airLeak: 1.5 }, wallLoss: { refractoryLoss: 1.8, convectionLoss: 1.2 }, blowdownLoss: 0.9 },
    { furnaceId: "H", thermalEfficiency: 83.8, stackLoss: { thermalLoss: 9.3, excessOxygen: 3.5, airLeak: 2.1 }, wallLoss: { refractoryLoss: 2.3, convectionLoss: 1.6 }, blowdownLoss: 1.2 },
    { furnaceId: "S", thermalEfficiency: 85.4, stackLoss: { thermalLoss: 8.5, excessOxygen: 3.2, airLeak: 1.8 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 1.0 },
    { furnaceId: "R", thermalEfficiency: 86.1, stackLoss: { thermalLoss: 8.1, excessOxygen: 3.0, airLeak: 1.6 }, wallLoss: { refractoryLoss: 1.9, convectionLoss: 1.2 }, blowdownLoss: 0.9 },
  ],
  LSP: [
    { furnaceId: "A", thermalEfficiency: 85.7, stackLoss: { thermalLoss: 8.3, excessOxygen: 3.1, airLeak: 1.7 }, wallLoss: { refractoryLoss: 2.0, convectionLoss: 1.3 }, blowdownLoss: 1.0 },
    { furnaceId: "B", thermalEfficiency: 87.4, stackLoss: { thermalLoss: 7.4, excessOxygen: 2.7, airLeak: 1.3 }, wallLoss: { refractoryLoss: 1.7, convectionLoss: 1.0 }, blowdownLoss: 0.8 },
    { furnaceId: "C", thermalEfficiency: 84.6, stackLoss: { thermalLoss: 8.8, excessOxygen: 3.3, airLeak: 1.9 }, wallLoss: { refractoryLoss: 2.1, convectionLoss: 1.4 }, blowdownLoss: 1.1 },
    { furnaceId: "D", thermalEfficiency: 86.8, stackLoss: { thermalLoss: 7.7, excessOxygen: 2.8, airLeak: 1.4 }, wallLoss: { refractoryLoss: 1.8, convectionLoss: 1.1 }, blowdownLoss: 0.9 },
    { furnaceId: "E", thermalEfficiency: 83.3, stackLoss: { thermalLoss: 9.5, excessOxygen: 3.6, airLeak: 2.2 }, wallLoss: { refractoryLoss: 2.4, convectionLoss: 1.7 }, blowdownLoss: 1.3 },
    { furnaceId: "R", thermalEfficiency: 85.9, stackLoss: { thermalLoss: 8.2, excessOxygen: 3.0, airLeak: 1.6 }, wallLoss: { refractoryLoss: 1.9, convectionLoss: 1.2 }, blowdownLoss: 0.9 },
  ],
};

/**
 * Simulate network fetch of furnace thermal efficiency data.
 */
export function fetchFurnaceData(plant: string): Promise<FurnaceMetric[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockFurnaceData[plant] || []);
    }, 300);
  });
}
