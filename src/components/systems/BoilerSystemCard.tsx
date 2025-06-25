
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Cog, Droplet } from "lucide-react";
import { BoilerSystemMetrics } from "@/lib/olefinsApi";

interface BoilerSystemCardProps {
  metrics: BoilerSystemMetrics;
}

const BoilerSystemCard = ({ metrics }: BoilerSystemCardProps) => {
  const getEfficiencyColor = (efficiency: number, threshold: number) => {
    if (efficiency >= threshold) return "text-green-600 bg-green-50";
    if (efficiency >= threshold * 0.9) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Flame className="h-5 w-5 mr-2 text-orange-600" />
          Boiler System Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cog className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Soot Blow Optimization</span>
            </div>
            <Badge className={getEfficiencyColor(metrics.sootBlowOptimization, 85)}>
              {metrics.sootBlowOptimization}%
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Cog className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Steam Turbine Efficiency</span>
            </div>
            <Badge className={getEfficiencyColor(metrics.steamTurbineEfficiency, 80)}>
              {metrics.steamTurbineEfficiency}%
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Droplet className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Condensate Return</span>
            </div>
            <Badge className={getEfficiencyColor(metrics.condensateReturn, 90)}>
              {metrics.condensateReturn}%
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoilerSystemCard;
