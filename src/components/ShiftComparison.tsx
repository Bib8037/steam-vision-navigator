
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Clock } from "lucide-react";

const ShiftComparison = () => {
  const shiftData = [
    { 
      day: "Mon", 
      dayShift: 4200, 
      eveningShift: 4100, 
      nightShift: 4000,
      total: 12300
    },
    { 
      day: "Tue", 
      dayShift: 4300, 
      eveningShift: 4200, 
      nightShift: 4000,
      total: 12500
    },
    { 
      day: "Wed", 
      dayShift: 4100, 
      eveningShift: 3900, 
      nightShift: 3800,
      total: 11800
    },
    { 
      day: "Thu", 
      dayShift: 4000, 
      eveningShift: 4000, 
      nightShift: 3900,
      total: 11900
    },
    { 
      day: "Fri", 
      dayShift: 4400, 
      eveningShift: 4300, 
      nightShift: 4100,
      total: 12800
    },
    { 
      day: "Sat", 
      dayShift: 3800, 
      eveningShift: 3700, 
      nightShift: 3600,
      total: 11100
    },
    { 
      day: "Sun", 
      dayShift: 3900, 
      eveningShift: 3800, 
      nightShift: 3700,
      total: 11400
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-green-600" />
          Daily Shift Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={shiftData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis label={{ value: 'Loss ($/day)', angle: -90, position: 'insideLeft' }} />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, 'Loss']}
                labelFormatter={(label) => `Day: ${label}`}
              />
              <Legend />
              <Bar dataKey="dayShift" stackId="a" fill="#3b82f6" name="Day Shift (6AM-2PM)" />
              <Bar dataKey="eveningShift" stackId="a" fill="#06b6d4" name="Evening Shift (2PM-10PM)" />
              <Bar dataKey="nightShift" stackId="a" fill="#0891b2" name="Night Shift (10PM-6AM)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2 text-sm">
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-medium text-blue-700">Day Shift Avg</div>
            <div className="text-lg font-bold text-blue-800">$4,100</div>
          </div>
          <div className="bg-cyan-50 p-2 rounded text-center">
            <div className="font-medium text-cyan-700">Evening Avg</div>
            <div className="text-lg font-bold text-cyan-800">$4,000</div>
          </div>
          <div className="bg-blue-50 p-2 rounded text-center">
            <div className="font-medium text-blue-700">Night Avg</div>
            <div className="text-lg font-bold text-blue-800">$3,900</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShiftComparison;
