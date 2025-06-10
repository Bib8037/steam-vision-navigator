
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { BarChart3 } from "lucide-react";

const ParetoChart = () => {
  const data = [
    { category: "Trap Leakage", loss: 5400, cumulative: 43.9 },
    { category: "H/E Fouling", loss: 3000, cumulative: 68.3 },
    { category: "Boiler Blowdown", loss: 2100, cumulative: 85.4 },
    { category: "Flash & Venting", loss: 1800, cumulative: 100.0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="h-5 w-5 mr-2 text-[#009989]" />
          Pareto Analysis - Loss Categories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="category" 
                angle={-45}
                textAnchor="end"
                height={80}
                fontSize={12}
              />
              <YAxis yAxisId="left" label={{ value: 'Loss ($/day)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Cumulative %', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                formatter={(value, name) => {
                  if (name === 'loss') return [`$${value.toLocaleString()}`, 'Daily Loss'];
                  if (name === 'cumulative') return [`${value}%`, 'Cumulative %'];
                  return [value, name];
                }}
              />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="loss" 
                fill="#009989" 
                name="Daily Loss ($)"
                radius={[4, 4, 0, 0]}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="cumulative" 
                stroke="#313283" 
                strokeWidth={3}
                name="Cumulative %"
                dot={{ r: 6 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="text-sm text-gray-600">
            <strong>80/20 Analysis:</strong> Top 2 categories represent 68% of total losses
          </div>
          <div className="flex flex-wrap gap-2">
            {data.map((item, index) => (
              <div key={index} className="bg-purple-50 px-3 py-1 rounded-full text-sm">
                <span className="font-medium">{item.category}:</span>
                <span className="text-purple-700 ml-1">${item.loss.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParetoChart;
