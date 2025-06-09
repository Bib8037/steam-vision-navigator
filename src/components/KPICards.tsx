
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, AlertTriangle, DollarSign } from "lucide-react";

const KPICards = () => {
  const kpiData = [
    {
      title: "Total Steam Loss",
      value: "$12,300",
      unit: "/day",
      change: -8,
      target: "$13,400",
      icon: DollarSign,
      color: "blue"
    },
    {
      title: "Boiler Blowdown",
      value: "$2,100",
      unit: "/day",
      change: 12,
      target: "$1,900",
      icon: AlertTriangle,
      color: "red"
    },
    {
      title: "Trap & Valve Leakage",
      value: "$5,400",
      unit: "/day",
      change: -5,
      target: "$5,700",
      icon: TrendingDown,
      color: "green"
    },
    {
      title: "Flash & Venting",
      value: "$1,800",
      unit: "/day",
      change: 25,
      target: "$1,400",
      icon: TrendingUp,
      color: "orange"
    },
    {
      title: "H/E Fouling & Insulation",
      value: "$3,000",
      unit: "/day",
      change: -3,
      target: "$3,100",
      icon: TrendingDown,
      color: "purple"
    }
  ];

  const getChangeColor = (change: number) => {
    if (change < 0) return "text-green-600 bg-green-50";
    if (change > 10) return "text-red-600 bg-red-50";
    return "text-yellow-600 bg-yellow-50";
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: "text-blue-600",
      red: "text-red-600",
      green: "text-green-600",
      orange: "text-orange-600",
      purple: "text-purple-600"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {kpiData.map((kpi, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {kpi.title}
            </CardTitle>
            <kpi.icon className={`h-5 w-5 ${getIconColor(kpi.color)}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-1">
              <div className="text-2xl font-bold text-gray-900">
                {kpi.value}
              </div>
              <div className="text-sm text-gray-500">
                {kpi.unit}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-3">
              <Badge 
                variant="secondary" 
                className={`${getChangeColor(kpi.change)} text-xs font-medium`}
              >
                {kpi.change > 0 ? '+' : ''}{kpi.change}% vs target
              </Badge>
              
              <div className="text-xs text-gray-500">
                Target: {kpi.target}
              </div>
            </div>
            
            {/* Progress indicator */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full ${
                    kpi.change < 0 ? 'bg-green-500' : 
                    kpi.change > 10 ? 'bg-red-500' : 'bg-yellow-500'
                  }`}
                  style={{ 
                    width: `${Math.min(100, Math.max(0, 100 - Math.abs(kpi.change)))}%` 
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default KPICards;
