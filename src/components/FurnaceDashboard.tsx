
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFurnaceData, FurnaceMetric } from "@/lib/furnaceApi";
import { flame, thermometer, wind, droplet, gauge } from "lucide-react";

interface FurnaceDashboardProps {
  selectedPlant: string;
}

const FurnaceDashboard = ({ selectedPlant }: FurnaceDashboardProps) => {
  const [furnaceData, setFurnaceData] = useState<FurnaceMetric[]>([]);
  const [selectedFurnace, setSelectedFurnace] = useState<string>("");

  useEffect(() => {
    fetchFurnaceData(selectedPlant).then((data) => {
      setFurnaceData(data);
      if (data.length > 0) {
        setSelectedFurnace(data[0].furnaceId);
      }
    });
  }, [selectedPlant]);

  const selectedFurnaceData = furnaceData.find(f => f.furnaceId === selectedFurnace);

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 85) return "text-green-600 bg-green-50";
    if (efficiency >= 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const getLossColor = (loss: number, threshold: number) => {
    if (loss <= threshold) return "text-green-600";
    if (loss <= threshold * 1.5) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Furnace Thermal Efficiency - {selectedPlant} Plant</h2>
        <select
          value={selectedFurnace}
          onChange={(e) => setSelectedFurnace(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {furnaceData.map((furnace) => (
            <option key={furnace.furnaceId} value={furnace.furnaceId}>
              Furnace {furnace.furnaceId}
            </option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stack-loss">Stack Loss</TabsTrigger>
          <TabsTrigger value="wall-loss">Wall Loss</TabsTrigger>
          <TabsTrigger value="all-furnaces">All Furnaces</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {selectedFurnaceData && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Thermal Efficiency</CardTitle>
                  <thermometer className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{selectedFurnaceData.thermalEfficiency}%</div>
                  <Badge className={getEfficiencyColor(selectedFurnaceData.thermalEfficiency)}>
                    Target: 85%+
                  </Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Stack Loss</CardTitle>
                  <wind className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {(selectedFurnaceData.stackLoss.thermalLoss + selectedFurnaceData.stackLoss.excessOxygen + selectedFurnaceData.stackLoss.airLeak).toFixed(1)}%
                  </div>
                  <Badge className="text-orange-600 bg-orange-50">Stack Losses</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Wall Loss</CardTitle>
                  <flame className="h-5 w-5 text-red-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {(selectedFurnaceData.wallLoss.refractoryLoss + selectedFurnaceData.wallLoss.convectionLoss).toFixed(1)}%
                  </div>
                  <Badge className="text-red-600 bg-red-50">Wall Losses</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Blowdown Loss</CardTitle>
                  <droplet className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{selectedFurnaceData.blowdownLoss}%</div>
                  <Badge className="text-blue-600 bg-blue-50">Blowdown</Badge>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="stack-loss" className="space-y-4">
          {selectedFurnaceData && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Thermal Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getLossColor(selectedFurnaceData.stackLoss.thermalLoss, 8)}`}>
                    {selectedFurnaceData.stackLoss.thermalLoss}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: ≤8%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Excess Oxygen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getLossColor(selectedFurnaceData.stackLoss.excessOxygen, 3)}`}>
                    {selectedFurnaceData.stackLoss.excessOxygen}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: ≤3%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Air Leak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getLossColor(selectedFurnaceData.stackLoss.airLeak, 1.5)}`}>
                    {selectedFurnaceData.stackLoss.airLeak}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: ≤1.5%</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="wall-loss" className="space-y-4">
          {selectedFurnaceData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Refractory Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getLossColor(selectedFurnaceData.wallLoss.refractoryLoss, 2)}`}>
                    {selectedFurnaceData.wallLoss.refractoryLoss}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: ≤2%</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-gray-600">Convection Loss</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${getLossColor(selectedFurnaceData.wallLoss.convectionLoss, 1.2)}`}>
                    {selectedFurnaceData.wallLoss.convectionLoss}%
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Target: ≤1.2%</p>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="all-furnaces" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FurnaceDashboard;
