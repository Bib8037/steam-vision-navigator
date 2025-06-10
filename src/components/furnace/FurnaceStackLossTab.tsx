
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FurnaceMetric } from "@/lib/furnaceApi";
import { getLossColor } from "./furnaceUtils";

interface FurnaceStackLossTabProps {
  furnaceData: FurnaceMetric;
}

const FurnaceStackLossTab = ({ furnaceData }: FurnaceStackLossTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Thermal Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getLossColor(furnaceData.stackLoss.thermalLoss, 8)}`}>
            {furnaceData.stackLoss.thermalLoss}%
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: ≤8%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Excess Oxygen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getLossColor(furnaceData.stackLoss.excessOxygen, 3)}`}>
            {furnaceData.stackLoss.excessOxygen}%
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: ≤3%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Air Leak</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getLossColor(furnaceData.stackLoss.airLeak, 1.5)}`}>
            {furnaceData.stackLoss.airLeak}%
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: ≤1.5%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FurnaceStackLossTab;
