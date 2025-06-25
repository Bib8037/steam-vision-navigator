
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Gauge, Thermometer, DollarSign } from "lucide-react";
import { FlareLossMetrics } from "@/lib/olefinsApi";

interface FlareLossCardProps {
  metrics: FlareLossMetrics;
}

const FlareLossCard = ({ metrics }: FlareLossCardProps) => {
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
          <Flame className="h-5 w-5 mr-2 text-orange-600" />
          Flare Loss Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Gas Flow (kg/h)</span>
              <Badge variant="outline">
                {metrics.flareGasFlow}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Flare Efficiency</span>
              <Badge className={getEfficiencyColor(metrics.flareEfficiency, 95)}>
                {metrics.flareEfficiency}%
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Heat Loss (%)</span>
              <Badge className={getLossColor(metrics.heatLoss, 15)}>
                {metrics.heatLoss}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Fuel Value ($/day)</span>
              <Badge variant="outline" className="text-red-600">
                ${metrics.fuelValue}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlareLossCard;
