
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { TrendingDown } from "lucide-react";

interface LossTrendChartProps {
  detailed?: boolean;
}

const LossTrendChart = ({ detailed = false }: LossTrendChartProps) => {
  const data = [
    { date: "Day 1", total: 13400, target: 11000, boiler: 2200, traps: 5800, venting: 1600, fouling: 3800 },
    { date: "Day 2", total: 12800, target: 11000, boiler: 2000, traps: 5600, venting: 1700, fouling: 3500 },
    { date: "Day 3", total: 13600, target: 11000, boiler: 2300, traps: 5900, venting: 1800, fouling: 3600 },
    { date: "Day 4", total: 12100, target: 11000, boiler: 1900, traps: 5200, venting: 1600, fouling: 3400 },
    { date: "Day 5", total: 12900, target: 11000, boiler: 2100, traps: 5500, venting: 1900, fouling: 3400 },
    { date: "Day 6", total: 11800, target: 11000, boiler: 1800, traps: 5100, venting: 1700, fouling: 3200 },
    { date: "Day 7", total: 12300, target: 11000, boiler: 2100, traps: 5400, venting: 1800, fouling: 3000 },
  ];

  return (
    <Card className={detailed ? "col-span-full" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingDown className="h-5 w-5 mr-2 text-blue-600" />
          {detailed ? "Detailed 24-Day Loss Trend" : "Daily Steam Loss Trend"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis 
                label={{ value: 'Loss ($/day)', angle: -90, position: 'insideLeft' }}
                domain={['dataMin - 1000', 'dataMax + 1000']}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Loss']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              
              {/* Target band */}
              <ReferenceLine y={11000} stroke="#22c55e" strokeDasharray="5 5" label="Target" />
              <ReferenceLine y={12100} stroke="#f59e0b" strokeDasharray="5 5" label="Warning" />
              
              {/* Main trend line */}
              <Line 
                type="monotone" 
                dataKey="total" 
                stroke="#3b82f6" 
                strokeWidth={3}
                name="Total Loss"
                dot={{ r: 6 }}
              />
              
              {detailed && (
                <>
                  <Line 
                    type="monotone" 
                    dataKey="boiler" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Boiler Blowdown"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="traps" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    name="Trap Leakage"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="venting" 
                    stroke="#eab308" 
                    strokeWidth={2}
                    name="Flash & Venting"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="fouling" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="H/E Fouling"
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-700 font-medium">Average Daily Loss</div>
            <div className="text-lg font-bold text-green-800">$12,571</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-blue-700 font-medium">7-Day Trend</div>
            <div className="text-lg font-bold text-blue-800">-8.2% ↓</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-purple-700 font-medium">Days Above Target</div>
            <div className="text-lg font-bold text-purple-800">7 of 7</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LossTrendChart;
