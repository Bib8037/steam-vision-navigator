
/**
 * API for Olefins Cracking Furnace Loss Scanner
 * Tracks Steam System, Boiler System, Furnace Efficiency, and Flare Loss
 */

export interface SteamSystemMetrics {
  headerLoss: number;
  ventLoss: number;
  insulationHeatLoss: number;
  headerConditionLoss: number;
}

export interface BoilerSystemMetrics {
  sootBlowOptimization: number;
  steamTurbineEfficiency: number;
  condensateReturn: number;
}

export interface FurnaceEfficiencyMetrics {
  thermalEfficiency: number;
  stackLoss: number;
  wallLoss: number;
  excessAir: number;
}

export interface FlareLossMetrics {
  flareGasFlow: number;
  flareEfficiency: number;
  heatLoss: number;
  fuelValue: number;
}

export interface PlantMetrics {
  plantId: string;
  steamSystem: SteamSystemMetrics;
  boilerSystem: BoilerSystemMetrics;
  furnaceEfficiency: FurnaceEfficiencyMetrics;
  flareLoss: FlareLossMetrics;
  totalLoss: number;
  timestamp: string;
}

const mockPlantData: Record<string, PlantMetrics> = {
  MOC: {
    plantId: "MOC",
    steamSystem: {
      headerLoss: 2.3,
      ventLoss: 1.8,
      insulationHeatLoss: 3.2,
      headerConditionLoss: 1.5
    },
    boilerSystem: {
      sootBlowOptimization: 85.2,
      steamTurbineEfficiency: 78.5,
      condensateReturn: 92.1
    },
    furnaceEfficiency: {
      thermalEfficiency: 87.3,
      stackLoss: 8.2,
      wallLoss: 2.1,
      excessAir: 3.4
    },
    flareLoss: {
      flareGasFlow: 1250,
      flareEfficiency: 94.2,
      heatLoss: 15.3,
      fuelValue: 2100
    },
    totalLoss: 18750,
    timestamp: new Date().toISOString()
  },
  ROC: {
    plantId: "ROC",
    steamSystem: {
      headerLoss: 2.1,
      ventLoss: 1.6,
      insulationHeatLoss: 2.8,
      headerConditionLoss: 1.3
    },
    boilerSystem: {
      sootBlowOptimization: 87.8,
      steamTurbineEfficiency: 81.2,
      condensateReturn: 94.5
    },
    furnaceEfficiency: {
      thermalEfficiency: 89.1,
      stackLoss: 7.5,
      wallLoss: 1.8,
      excessAir: 2.9
    },
    flareLoss: {
      flareGasFlow: 1180,
      flareEfficiency: 95.8,
      heatLoss: 13.7,
      fuelValue: 1950
    },
    totalLoss: 16200,
    timestamp: new Date().toISOString()
  },
  LSP: {
    plantId: "LSP",
    steamSystem: {
      headerLoss: 2.5,
      ventLoss: 2.0,
      insulationHeatLoss: 3.5,
      headerConditionLoss: 1.7
    },
    boilerSystem: {
      sootBlowOptimization: 83.5,
      steamTurbineEfficiency: 76.8,
      condensateReturn: 90.3
    },
    furnaceEfficiency: {
      thermalEfficiency: 85.7,
      stackLoss: 9.1,
      wallLoss: 2.4,
      excessAir: 3.8
    },
    flareLoss: {
      flareGasFlow: 1320,
      flareEfficiency: 93.1,
      heatLoss: 16.8,
      fuelValue: 2250
    },
    totalLoss: 20100,
    timestamp: new Date().toISOString()
  }
};

export function fetchPlantMetrics(plantId: string): Promise<PlantMetrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPlantData[plantId] || mockPlantData.MOC);
    }, 300);
  });
}

export function fetchAllPlantsMetrics(): Promise<PlantMetrics[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Object.values(mockPlantData));
    }, 400);
  });
}
