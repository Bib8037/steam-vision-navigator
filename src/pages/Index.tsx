import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Settings,
  Bell,
  FileText,
  DollarSign
} from "lucide-react";
import logo from "../../image/logo.jpeg";
import KPICards from "@/components/KPICards";
import PlantSchematic from "@/components/PlantSchematic";
import LossTrendChart from "@/components/LossTrendChart";
import ParetoChart from "@/components/ParetoChart";
import TopLossesTable from "@/components/TopLossesTable";
import ShiftComparison from "@/components/ShiftComparison";
import AlertsPanel from "@/components/AlertsPanel";
import { fetchKpiData, KpiMetric } from "@/lib/api";
import FurnaceDashboard from "@/components/FurnaceDashboard";
import OlefinsDashboard from "@/components/OlefinsDashboard";

const iconMap: Record<string, React.ComponentType<any>> = {
  "Total Steam Loss": DollarSign,
  "Boiler Blowdown": AlertTriangle,
  "Trap & Valve Leakage": TrendingDown,
  "Flash & Venting": TrendingUp,
  "H/E Fouling & Insulation": TrendingDown
};
const colorMap: Record<string, string> = {
  "Total Steam Loss": "blue",
  "Boiler Blowdown": "red",
  "Trap & Valve Leakage": "green",
  "Flash & Venting": "orange",
  "H/E Fouling & Insulation": "purple"
};

const Index = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [alertCount, setAlertCount] = useState(3);
  const [selectedPlant, setSelectedPlant] = useState("MOC");
  const [kpiMetrics, setKpiMetrics] = useState<(KpiMetric & { icon: React.ComponentType<any>; color: string })[]>([]);

  useEffect(() => {
    fetchKpiData(selectedPlant).then((metrics) => {
      const enriched = metrics.map((m) => ({
        title: m.title,
        value: m.value,
        unit: m.unit,
        change: m.change,
        target: m.target,
        icon: iconMap[m.title] || DollarSign,
        color: colorMap[m.title] || "blue"
      }));
      setKpiMetrics(enriched);
    });
  }, [selectedPlant]);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom right, #009989, #313283, #FAA61B, #FF0000)' }}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-24 h-12 bg-white rounded-lg flex items-center justify-center">
                  <img src={logo} alt="Company Logo" className="h-12 w-24 object-contain" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI Loss Scanner - Olefins Cracking Furnace</h1>
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedPlant}
                      onChange={(e) => setSelectedPlant(e.target.value)}
                      className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="MOC">MOC</option>
                      <option value="ROC">ROC</option>
                      <option value="LSP">LSP</option>
                    </select>
                    <p className="text-sm text-gray-600">Olefins Plant - {selectedPlant}</p>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Live Monitoring
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {alertCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {alertCount}
                  </Badge>
                )}
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* KPI Cards */}
        <KPICards data={kpiMetrics} plant={selectedPlant} />
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="steam">Steam System</TabsTrigger>
            <TabsTrigger value="boiler">Boiler System</TabsTrigger>
            <TabsTrigger value="furnace">Furnace Efficiency</TabsTrigger>
            <TabsTrigger value="flare">Flare Loss</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <OlefinsDashboard selectedPlant={selectedPlant} />
          </TabsContent>
          
          <TabsContent value="steam" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Steam System Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Detailed steam system loss analysis will be displayed here.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LossTrendChart />
                    <ParetoChart />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="boiler" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Boiler System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Boiler system optimization and performance metrics.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ShiftComparison />
                    <TopLossesTable limit={5} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="furnace" className="space-y-6">
            <FurnaceDashboard selectedPlant={selectedPlant} />
          </TabsContent>
          
          <TabsContent value="flare" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Flare Loss Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Flare system efficiency and loss reduction strategies.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <LossTrendChart />
                    <AlertsPanel />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
