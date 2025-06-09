
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, Brain, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";

const AlertsPanel = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const alerts = [
    {
      id: "alert-1",
      title: "Steam Trap T-45 Critical Failure",
      severity: "critical",
      location: "HPS Header - Section B",
      loss: 1200,
      timestamp: "2 hours ago",
      description: "Trap stuck open, continuous steam blow-through detected",
      aiSuggestion: "Based on historical data and similar failures, this trap type typically fails due to worn seat surfaces. Immediate replacement recommended. Consider upgrading to thermodynamic trap design which has 40% longer lifespan in this service.",
      rootCause: "Thermal cycling fatigue on valve seat",
      confidence: 92
    },
    {
      id: "alert-2", 
      title: "Let-down Station LV2 Efficiency Drop",
      severity: "high",
      location: "Low Pressure Skid",
      loss: 900,
      timestamp: "4 hours ago",
      description: "Pilot system showing irregular control patterns",
      aiSuggestion: "Pattern analysis indicates pilot diaphragm degradation. Recommend pneumatic system calibration followed by diaphragm inspection. Similar patterns in Unit 3 were resolved with pilot replacement, reducing losses by 85%.",
      rootCause: "Pilot diaphragm wear affecting control response",
      confidence: 87
    },
    {
      id: "alert-3",
      title: "Heat Exchanger HE-01 Fouling",
      severity: "medium",
      location: "Process Unit A",
      loss: 750,
      timestamp: "6 hours ago", 
      description: "Increasing pressure drop across tubes, efficiency declining",
      aiSuggestion: "Fouling prediction model suggests chemical cleaning cycle now will prevent 60% more loss accumulation. Optimal cleaning window identified based on production schedule. Consider upgrading to enhanced heat transfer tubes for 25% better fouling resistance.",
      rootCause: "Organic deposit buildup on tube surfaces",
      confidence: 89
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-800 border-red-200";
      case "high": return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
              Active Loss Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-md ${
                    alert.severity === "critical" ? "border-l-red-500 bg-red-50" :
                    alert.severity === "high" ? "border-l-orange-500 bg-orange-50" :
                    "border-l-yellow-500 bg-yellow-50"
                  } ${selectedAlert === alert.id ? "ring-2 ring-blue-500" : ""}`}
                  onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{alert.title}</h3>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{alert.location}</p>
                      <p className="text-sm text-gray-700">{alert.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-600">${alert.loss}/day</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {alert.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-purple-600" />
            AI Loss Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedAlert ? (
            <div className="space-y-4">
              {(() => {
                const alert = alerts.find(a => a.id === selectedAlert);
                if (!alert) return null;
                
                return (
                  <>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{alert.title}</h3>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <div className="flex items-center text-blue-600 mb-1">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            <span className="text-sm font-medium">Daily Loss Impact</span>
                          </div>
                          <div className="text-xl font-bold">${alert.loss}</div>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-purple-600">AI Confidence</span>
                            <span className={`text-sm font-bold ${getConfidenceColor(alert.confidence)}`}>
                              {alert.confidence}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${alert.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                          AI-Generated Root Cause
                        </h4>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {alert.rootCause}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium flex items-center mb-2">
                          <Brain className="h-4 w-4 mr-1 text-purple-500" />
                          AI Recommendation
                        </h4>
                        <p className="text-sm text-gray-700 bg-purple-50 p-3 rounded-lg">
                          {alert.aiSuggestion}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-3">
                      <Button size="sm" className="flex-1">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept AI Suggestion
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Generate Alternative
                      </Button>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="mb-2">Select an alert to view AI analysis</p>
              <p className="text-sm">Our AI analyzes patterns, predicts failures, and suggests optimal solutions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPanel;
