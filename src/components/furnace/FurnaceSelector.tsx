
import { FurnaceMetric } from "@/lib/furnaceApi";

interface FurnaceSelectorProps {
  furnaceData: FurnaceMetric[];
  selectedFurnace: string;
  onFurnaceChange: (furnaceId: string) => void;
  selectedPlant: string;
}

const FurnaceSelector = ({ furnaceData, selectedFurnace, onFurnaceChange, selectedPlant }: FurnaceSelectorProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-900">Furnace Thermal Efficiency - {selectedPlant} Plant</h2>
      <select
        value={selectedFurnace}
        onChange={(e) => onFurnaceChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {furnaceData.map((furnace) => (
          <option key={furnace.furnaceId} value={furnace.furnaceId}>
            Furnace {furnace.furnaceId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FurnaceSelector;
