
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wind, Brick, Zap } from "lucide-react";
import { FurnaceEfficiencyMetrics } from "@/lib/olefinsApi";

interface FurnaceEfficiencyCardProps {
  metrics: FurnaceEfficiencyMetrics;
}

const FurnaceEfficiencyCard = ({ metrics }: FurnaceEfficiencyCardProps) => {
  const getEfficiencyColor = (efficiency: number, threshold: number) => {
    if (efficiency >= threshold) return "text-green-600 bg-green-50";
    if (efficiency >= threshold * 0.95) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getLossColor = (loss: number, threshold: number) => {
    if (loss <= threshold) return "text-green-600 bg-green-50";
    if (loss <= threshold * 1.2) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Thermometer className="h-5 w-5 mr-2 text-red-600" />
          Furnace Efficiency
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Thermal Efficiency</span>
              <Badge className={getEfficiencyColor(metrics.thermalEfficiency, 85)}>
                {metrics.thermalEfficiency}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Stack Loss</span>
              <Badge className={getLossColor(metrics.stackLoss, 8)}>
                {metrics.stackLoss}%
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Wall Loss</span>
              <Badge className={getLossColor(metrics.wallLoss, 2)}>
                {metrics.wallLoss}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Excess Air</span>
              <Badge className={getLossColor(metrics.excessAir, 3)}>
                {metrics.excessAir}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FurnaceEfficiencyCard;
