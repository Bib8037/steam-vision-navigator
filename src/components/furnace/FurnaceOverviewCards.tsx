
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wind, Flame, Droplet } from "lucide-react";
import { FurnaceMetric } from "@/lib/furnaceApi";
import { getEfficiencyColor } from "./furnaceUtils";

interface FurnaceOverviewCardsProps {
  furnaceData: FurnaceMetric;
}

const FurnaceOverviewCards = ({ furnaceData }: FurnaceOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Thermal Efficiency</CardTitle>
          <Thermometer className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{furnaceData.thermalEfficiency}%</div>
          <Badge className={getEfficiencyColor(furnaceData.thermalEfficiency)}>
            Target: 85%+
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Stack Loss</CardTitle>
          <Wind className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {(furnaceData.stackLoss.thermalLoss + furnaceData.stackLoss.excessOxygen + furnaceData.stackLoss.airLeak).toFixed(1)}%
          </div>
          <Badge className="text-orange-600 bg-orange-50">Stack Losses</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Wall Loss</CardTitle>
          <Flame className="h-5 w-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">
            {(furnaceData.wallLoss.refractoryLoss + furnaceData.wallLoss.convectionLoss).toFixed(1)}%
          </div>
          <Badge className="text-red-600 bg-red-50">Wall Losses</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Blowdown Loss</CardTitle>
          <Droplet className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{furnaceData.blowdownLoss}%</div>
          <Badge className="text-blue-600 bg-blue-50">Blowdown</Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default FurnaceOverviewCards;
