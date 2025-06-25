
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingDown, AlertTriangle } from "lucide-react";
import { fetchPlantMetrics, PlantMetrics } from "@/lib/olefinsApi";
import SteamSystemCard from "./systems/SteamSystemCard";
import BoilerSystemCard from "./systems/BoilerSystemCard";
import FurnaceEfficiencyCard from "./systems/FurnaceEfficiencyCard";
import FlareLossCard from "./systems/FlareLossCard";

interface OlefinsDashboardProps {
  selectedPlant: string;
}

const OlefinsDashboard = ({ selectedPlant }: OlefinsDashboardProps) => {
  const [plantMetrics, setPlantMetrics] = useState<PlantMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchPlantMetrics(selectedPlant).then((data) => {
      setPlantMetrics(data);
      setLoading(false);
    });
  }, [selectedPlant]);

  if (loading || !plantMetrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading plant metrics...</div>
      </div>
    );
  }

  const totalSteamLoss = plantMetrics.steamSystem.headerLoss + 
                        plantMetrics.steamSystem.ventLoss + 
                        plantMetrics.steamSystem.insulationHeatLoss + 
                        plantMetrics.steamSystem.headerConditionLoss;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Daily Loss</CardTitle>
            <DollarSign className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${plantMetrics.totalLoss.toLocaleString()}</div>
            <Badge className="text-red-600 bg-red-50 mt-2">
              High Priority
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Furnace Efficiency</CardTitle>
            <TrendingDown className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{plantMetrics.furnaceEfficiency.thermalEfficiency}%</div>
            <Badge className="text-green-600 bg-green-50 mt-2">
              Target: 85%+
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Steam Loss</CardTitle>
            <AlertTriangle className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalSteamLoss.toFixed(1)}%</div>
            <Badge className="text-yellow-600 bg-yellow-50 mt-2">
              Needs Attention
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* System Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SteamSystemCard metrics={plantMetrics.steamSystem} />
        <BoilerSystemCard metrics={plantMetrics.boilerSystem} />
        <FurnaceEfficiencyCard metrics={plantMetrics.furnaceEfficiency} />
        <FlareLossCard metrics={plantMetrics.flareLoss} />
      </div>
    </div>
  );
};

export default OlefinsDashboard;
