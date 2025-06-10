
import { FurnaceMetric } from "@/lib/furnaceApi";
import { getEfficiencyColor, getLossColor } from "./furnaceUtils";

interface FurnaceAllFurnacesTableProps {
  furnaceData: FurnaceMetric[];
}

const FurnaceAllFurnacesTable = ({ furnaceData }: FurnaceAllFurnacesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-3 text-left">Furnace</th>
            <th className="border p-3 text-center">Thermal Efficiency</th>
            <th className="border p-3 text-center">Thermal Loss</th>
            <th className="border p-3 text-center">Excess Oxygen</th>
            <th className="border p-3 text-center">Air Leak</th>
            <th className="border p-3 text-center">Refractory Loss</th>
            <th className="border p-3 text-center">Convection Loss</th>
            <th className="border p-3 text-center">Blowdown Loss</th>
          </tr>
        </thead>
        <tbody>
          {furnaceData.map((furnace) => (
            <tr key={furnace.furnaceId} className="hover:bg-gray-50">
              <td className="border p-3 font-medium">{furnace.furnaceId}</td>
              <td className={`border p-3 text-center font-bold ${getEfficiencyColor(furnace.thermalEfficiency).split(' ')[0]}`}>
                {furnace.thermalEfficiency}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.stackLoss.thermalLoss, 8)}`}>
                {furnace.stackLoss.thermalLoss}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.stackLoss.excessOxygen, 3)}`}>
                {furnace.stackLoss.excessOxygen}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.stackLoss.airLeak, 1.5)}`}>
                {furnace.stackLoss.airLeak}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.wallLoss.refractoryLoss, 2)}`}>
                {furnace.wallLoss.refractoryLoss}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.wallLoss.convectionLoss, 1.2)}`}>
                {furnace.wallLoss.convectionLoss}%
              </td>
              <td className={`border p-3 text-center ${getLossColor(furnace.blowdownLoss, 1)}`}>
                {furnace.blowdownLoss}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FurnaceAllFurnacesTable;
