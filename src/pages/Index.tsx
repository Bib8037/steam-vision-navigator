
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, TrendingDown, Settings, Bell, FileText, MapPin } from "lucide-react";
import KPICards from "@/components/KPICards";
import PlantSchematic from "@/components/PlantSchematic";
import LossTrendChart from "@/components/LossTrendChart";
import ParetoChart from "@/components/ParetoChart";
import TopLossesTable from "@/components/TopLossesTable";
import ShiftComparison from "@/components/ShiftComparison";
import AlertsPanel from "@/components/AlertsPanel";

const Index = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [alertCount, setAlertCount] = useState(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">AI Loss Scanner</h1>
                  <p className="text-sm text-gray-600">Steam System - Olefins Plant</p>
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
        <KPICards />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plant-map">Plant Map</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="losses">Top Losses</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LossTrendChart />
              <ParetoChart />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TopLossesTable limit={5} />
              </div>
              <ShiftComparison />
            </div>
          </TabsContent>

          <TabsContent value="plant-map">
            <PlantSchematic />
          </TabsContent>

          <TabsContent value="trends">
            <div className="space-y-6">
              <LossTrendChart detailed={true} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ShiftComparison />
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                      Year-over-Year Comparison
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium">Today vs Last Year</span>
                        <span className="text-green-600 font-bold">-15.3% ($2,100 saved)</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium">This Month vs Last Year</span>
                        <span className="text-blue-600 font-bold">-8.7% ($18,400 saved)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="losses">
            <TopLossesTable limit={20} showActions={true} />
          </TabsContent>

          <TabsContent value="alerts">
            <AlertsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
