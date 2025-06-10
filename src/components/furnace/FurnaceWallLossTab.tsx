
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FurnaceMetric } from "@/lib/furnaceApi";
import { getLossColor } from "./furnaceUtils";

interface FurnaceWallLossTabProps {
  furnaceData: FurnaceMetric;
}

const FurnaceWallLossTab = ({ furnaceData }: FurnaceWallLossTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Refractory Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getLossColor(furnaceData.wallLoss.refractoryLoss, 2)}`}>
            {furnaceData.wallLoss.refractoryLoss}%
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: ≤2%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-600">Convection Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${getLossColor(furnaceData.wallLoss.convectionLoss, 1.2)}`}>
            {furnaceData.wallLoss.convectionLoss}%
          </div>
          <p className="text-xs text-gray-500 mt-2">Target: ≤1.2%</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FurnaceWallLossTab;
