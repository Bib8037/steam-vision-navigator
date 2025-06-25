
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Wind, Thermometer, Settings } from "lucide-react";
import { SteamSystemMetrics } from "@/lib/olefinsApi";

interface SteamSystemCardProps {
  metrics: SteamSystemMetrics;
}

const SteamSystemCard = ({ metrics }: SteamSystemCardProps) => {
  const getLossColor = (loss: number, threshold: number) => {
    if (loss <= threshold) return "text-green-600 bg-green-50";
    if (loss <= threshold * 1.5) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplets className="h-5 w-5 mr-2 text-blue-600" />
          Steam System Losses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Header Loss</span>
              <Badge className={getLossColor(metrics.headerLoss, 2)}>
                {metrics.headerLoss}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vent Loss</span>
              <Badge className={getLossColor(metrics.ventLoss, 1.5)}>
                {metrics.ventLoss}%
              </Badge>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Insulation Heat Loss</span>
              <Badge className={getLossColor(metrics.insulationHeatLoss, 3)}>
                {metrics.insulationHeatLoss}%
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Header Condition Loss</span>
              <Badge className={getLossColor(metrics.headerConditionLoss, 1.5)}>
                {metrics.headerConditionLoss}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SteamSystemCard;
