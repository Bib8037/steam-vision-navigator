
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react";

const AlertsPanel = () => {
  const alerts = [
    {
      id: 1,
      type: "Critical",
      title: "Steam Trap T-45 Failure",
      description: "Trap stuck open causing $1,200/day loss",
      location: "HPS Header",
      timestamp: "2 minutes ago",
      threshold: "$1,000/day",
      currentValue: "$1,200/day",
      status: "Active"
    },
    {
      id: 2,
      type: "High",
      title: "Boiler Blowdown Exceeds Limit",
      description: "Blowdown frequency increased 25% above normal",
      location: "Boiler House",
      timestamp: "15 minutes ago",
      threshold: "$1,500/day",
      currentValue: "$2,100/day",
      status: "Active"
    },
    {
      id: 3,
      type: "Medium",
      title: "Flash Tank Venting High",
      description: "Venting losses increased due to pressure control issue",
      location: "Condensate Recovery",
      timestamp: "1 hour ago",
      threshold: "$1,200/day",
      currentValue: "$1,800/day",
      status: "Acknowledged"
    },
    {
      id: 4,
      type: "Low",
      title: "Insulation Degradation Alert",
      description: "Thermal imaging detected hot spots on main steam line",
      location: "Main Steam Line",
      timestamp: "3 hours ago",
      threshold: "$300/day",
      currentValue: "$480/day",
      status: "Resolved"
    }
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case "Critical": return "bg-red-50 border-red-200 text-red-800";
      case "High": return "bg-orange-50 border-orange-200 text-orange-800";
      case "Medium": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "Low": return "bg-blue-50 border-blue-200 text-blue-800";
      default: return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "Acknowledged": return <Clock className="h-4 w-4 text-yellow-600" />;
      case "Resolved": return <CheckCircle className="h-4 w-4 text-green-600" />;
      default: return <X className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-red-800">2</div>
                <div className="text-sm text-red-600">Critical Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-orange-800">1</div>
                <div className="text-sm text-orange-600">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-green-800">1</div>
                <div className="text-sm text-green-600">Resolved Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <div className="text-2xl font-bold text-blue-800">$3,300</div>
                <div className="text-sm text-blue-600">Active Loss/Day</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Alerts</span>
            <Button variant="outline" size="sm">
              Configure Thresholds
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <Badge className={getBadgeColor(alert.type)}>
                        {alert.type}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(alert.status)}
                        <span className="text-sm font-medium">{alert.status}</span>
                      </div>
                      <span className="text-sm text-gray-500">{alert.timestamp}</span>
                    </div>
                    
                    <h3 className="font-semibold text-lg mb-1">{alert.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Location:</span>
                        <div className="text-gray-600">{alert.location}</div>
                      </div>
                      <div>
                        <span className="font-medium">Threshold:</span>
                        <div className="text-gray-600">{alert.threshold}</div>
                      </div>
                      <div>
                        <span className="font-medium">Current Value:</span>
                        <div className="font-bold text-red-600">{alert.currentValue}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    {alert.status === "Active" && (
                      <>
                        <Button variant="outline" size="sm">
                          Acknowledge
                        </Button>
                        <Button variant="default" size="sm">
                          Create Work Order
                        </Button>
                      </>
                    )}
                    {alert.status === "Acknowledged" && (
                      <Button variant="default" size="sm">
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Email Notifications</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Daily management summary</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Critical alerts (>$1000/day)</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Weekly trend reports</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Mobile/Slack Alerts</h4>
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Critical equipment failures</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Threshold exceedances</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Maintenance reminders</span>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlertsPanel;
