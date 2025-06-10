/**
 * Mock API for KPI data per plant.
 * Use this function to fetch KPI metrics, including Total Steam Loss.
 */

export interface KpiMetric {
  title: string;
  value: string;
  unit: string;
  change: number;
  target: string;
}

const mockApiData: Record<string, KpiMetric[]> = {
  ROC: [
    { title: "Total Steam Loss", value: "$11,200", unit: "/day", change: -12, target: "$13,400" },
    { title: "Boiler Blowdown", value: "$2,100", unit: "/day", change: 12, target: "$1,900" },
    { title: "Trap & Valve Leakage", value: "$5,400", unit: "/day", change: -5, target: "$5,700" },
    { title: "Flash & Venting", value: "$1,800", unit: "/day", change: 25, target: "$1,400" },
    { title: "H/E Fouling & Insulation", value: "$3,000", unit: "/day", change: -3, target: "$3,100" },
  ],
  MOC: [
    { title: "Total Steam Loss", value: "$14,800", unit: "/day", change: 2, target: "$16,000" },
    { title: "Boiler Blowdown", value: "$2,800", unit: "/day", change: 10, target: "$2,500" },
    { title: "Trap & Valve Leakage", value: "$6,100", unit: "/day", change: -4, target: "$6,500" },
    { title: "Flash & Venting", value: "$2,400", unit: "/day", change: 15, target: "$1,600" },
    { title: "H/E Fouling & Insulation", value: "$3,200", unit: "/day", change: -2, target: "$3,300" },
  ],
  LSP: [
    { title: "Total Steam Loss", value: "$19,500", unit: "/day", change: -3, target: "$18,000" },
    { title: "Boiler Blowdown", value: "$3,500", unit: "/day", change: 20, target: "$3,000" },
    { title: "Trap & Valve Leakage", value: "$7,200", unit: "/day", change: -3, target: "$7,500" },
    { title: "Flash & Venting", value: "$3,000", unit: "/day", change: 30, target: "$2,200" },
    { title: "H/E Fouling & Insulation", value: "$4,100", unit: "/day", change: -1, target: "$4,300" },
  ],
};

/**
 * Simulate network fetch of KPI metrics.
 * Returns a promise resolving after a short delay.
 */
export function fetchKpiData(plant: string): Promise<KpiMetric[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiData[plant] || []);
    }, 300);
  });
}
