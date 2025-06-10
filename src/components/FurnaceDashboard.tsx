
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchFurnaceData, FurnaceMetric } from "@/lib/furnaceApi";
import FurnaceSelector from "./furnace/FurnaceSelector";
import FurnaceOverviewCards from "./furnace/FurnaceOverviewCards";
import FurnaceStackLossTab from "./furnace/FurnaceStackLossTab";
import FurnaceWallLossTab from "./furnace/FurnaceWallLossTab";
import FurnaceAllFurnacesTable from "./furnace/FurnaceAllFurnacesTable";

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

  return (
    <div className="space-y-6">
      <FurnaceSelector
        furnaceData={furnaceData}
        selectedFurnace={selectedFurnace}
        onFurnaceChange={setSelectedFurnace}
        selectedPlant={selectedPlant}
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="stack-loss">Stack Loss</TabsTrigger>
          <TabsTrigger value="wall-loss">Wall Loss</TabsTrigger>
          <TabsTrigger value="all-furnaces">All Furnaces</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {selectedFurnaceData && (
            <FurnaceOverviewCards furnaceData={selectedFurnaceData} />
          )}
        </TabsContent>

        <TabsContent value="stack-loss" className="space-y-4">
          {selectedFurnaceData && (
            <FurnaceStackLossTab furnaceData={selectedFurnaceData} />
          )}
        </TabsContent>

        <TabsContent value="wall-loss" className="space-y-4">
          {selectedFurnaceData && (
            <FurnaceWallLossTab furnaceData={selectedFurnaceData} />
          )}
        </TabsContent>

        <TabsContent value="all-furnaces" className="space-y-4">
          <FurnaceAllFurnacesTable furnaceData={furnaceData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FurnaceDashboard;
