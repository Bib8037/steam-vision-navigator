
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, AlertTriangle, DollarSign, Brain, Sparkles } from "lucide-react";
import { useState } from "react";

const KPICards = () => {
  const [showAIInsights, setShowAIInsights] = useState(false);

  const kpiData = [
    {
      title: "Total Steam Loss",
      value: "$12,300",
      unit: "/day",
      change: -8,
      target: "$13,400",
      icon: DollarSign,
      color: "blue",
      aiInsight: "Trend analysis shows 15% improvement over last month. AI predicts further 12% reduction possible with targeted trap maintenance program.",
      aiAction: "Focus on top 5 steam traps - potential $1,800/day savings"
    },
    {
      title: "Boiler Blowdown",
      value: "$2,100",
      unit: "/day",
      change: 12,
      target: "$1,900",
      icon: AlertTriangle,
      color: "red",
      aiInsight: "Above target due to increased TDS levels. AI correlates with recent feedwater quality changes and recommends TDS setpoint optimization.",
      aiAction: "Adjust TDS setpoint from 3000 to 2800 ppm - estimated $240/day savings"
    },
    {
      title: "Trap & Valve Leakage",
      value: "$5,400",
      unit: "/day",
      change: -5,
      target: "$5,700",
      icon: TrendingDown,
      color: "green",
      aiInsight: "Recent maintenance cycle showing positive results. AI identifies 3 critical traps requiring immediate attention to prevent degradation.",
      aiAction: "Replace T-45, T-62, T-89 before next shutdown - prevent $2,100/day losses"
    },
    {
      title: "Flash & Venting",
      value: "$1,800",
      unit: "/day",
      change: 25,
      target: "$1,400",
      icon: TrendingUp,
      color: "orange",
      aiInsight: "Significant increase indicates potential condensate recovery optimization opportunity. AI suggests flash tank pressure adjustment.",
      aiAction: "Lower flash tank pressure by 5 psi - recover additional 2.1 tons/day steam"
    },
    {
      title: "H/E Fouling & Insulation",
      value: "$3,000",
      unit: "/day",
      change: -3,
      target: "$3,100",
      icon: TrendingDown,
      color: "purple",
      aiInsight: "Stable performance with slight improvement. AI predicts optimal cleaning cycle timing to maximize efficiency and minimize downtime.",
      aiAction: "Schedule HE-01 cleaning in 6 days during planned maintenance window"
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Key Performance Indicators</h2>
        <Button 
          variant={showAIInsights ? "default" : "outline"} 
          size="sm"
          onClick={() => setShowAIInsights(!showAIInsights)}
          className="flex items-center"
        >
          <Brain className="h-4 w-4 mr-2" />
          {showAIInsights ? "Hide" : "Show"} AI Insights
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {kpi.title}
              </CardTitle>
              <div className="flex items-center space-x-1">
                <kpi.icon className={`h-5 w-5 ${getIconColor(kpi.color)}`} />
                {showAIInsights && (
                  <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                )}
              </div>
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

              {/* AI Insights Panel */}
              {showAIInsights && (
                <div className="mt-4 space-y-2">
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Brain className="h-3 w-3 mr-1 text-purple-600" />
                      <span className="text-xs font-medium text-purple-700">AI Insight</span>
                    </div>
                    <p className="text-xs text-gray-700">{kpi.aiInsight}</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Sparkles className="h-3 w-3 mr-1 text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Recommended Action</span>
                    </div>
                    <p className="text-xs text-gray-700 font-medium">{kpi.aiAction}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KPICards;
