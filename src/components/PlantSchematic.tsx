
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Thermometer, Gauge, Droplets, DollarSign } from "lucide-react";
import { useState } from "react";

const PlantSchematic = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const steamNodes = [
    { id: "boiler", x: 10, y: 20, type: "Boiler", loss: 2100, severity: "high", temp: 485, pressure: 900 },
    { id: "shps", x: 25, y: 20, type: "SHPS Header", loss: 800, severity: "medium", temp: 480, pressure: 850 },
    { id: "hps", x: 40, y: 20, type: "HPS Header", loss: 1200, severity: "high", temp: 475, pressure: 800 },
    { id: "ls1", x: 55, y: 30, type: "Let-down Station 1", loss: 900, severity: "high", temp: 320, pressure: 150 },
    { id: "ls2", x: 55, y: 10, type: "Let-down Station 2", loss: 450, severity: "medium", temp: 315, pressure: 145 },
    { id: "lps", x: 70, y: 20, type: "LPS Header", loss: 600, severity: "medium", temp: 280, pressure: 50 },
    { id: "trap1", x: 30, y: 35, type: "Steam Trap T-45", loss: 1200, severity: "critical", temp: 165, pressure: 15 },
    { id: "trap2", x: 45, y: 35, type: "Steam Trap T-62", loss: 350, severity: "low", temp: 158, pressure: 12 },
    { id: "he1", x: 60, y: 40, type: "Heat Exchanger HE-01", loss: 750, severity: "medium", temp: 145, pressure: 8 },
    { id: "he2", x: 75, y: 40, type: "Heat Exchanger HE-02", loss: 300, severity: "low", temp: 142, pressure: 7 }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600 border-red-700";
      case "high": return "bg-orange-500 border-orange-600";
      case "medium": return "bg-yellow-500 border-yellow-600";
      case "low": return "bg-green-500 border-green-600";
      default: return "bg-gray-500 border-gray-600";
    }
  };

  const getNodeSize = (loss: number) => {
    if (loss > 1000) return "w-8 h-8";
    if (loss > 500) return "w-6 h-6";
    return "w-4 h-4";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="h-[600px]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Plant Schematic - Steam Loss Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <div className="relative w-full h-[480px] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-gray-200 overflow-hidden">
              {/* Steam Flow Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                <defs>
                  <pattern id="steamFlow" patternUnits="userSpaceOnUse" width="20" height="4">
                    <rect width="20" height="4" fill="none" />
                    <rect width="10" height="2" fill="#3b82f6" opacity="0.3" />
                  </pattern>
                </defs>
                
                {/* Main steam line */}
                <line x1="10%" y1="20%" x2="90%" y2="20%" stroke="url(#steamFlow)" strokeWidth="8" />
                
                {/* Branch lines */}
                <line x1="55%" y1="20%" x2="55%" y2="30%" stroke="url(#steamFlow)" strokeWidth="6" />
                <line x1="55%" y1="20%" x2="55%" y2="10%" stroke="url(#steamFlow)" strokeWidth="6" />
                <line x1="70%" y1="20%" x2="70%" y2="40%" stroke="url(#steamFlow)" strokeWidth="4" />
                
                {/* Condensate return lines */}
                <line x1="30%" y1="35%" x2="90%" y2="50%" stroke="#64748b" strokeWidth="3" strokeDasharray="5,5" />
              </svg>
              
              {/* Steam System Nodes */}
              {steamNodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 ${getNodeSize(node.loss)} ${getSeverityColor(node.severity)} rounded-full border-2 shadow-lg flex items-center justify-center z-10`}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              ))}
              
              {/* Node Labels */}
              {steamNodes.map((node) => (
                <div
                  key={`label-${node.id}`}
                  className="absolute transform -translate-x-1/2 translate-y-6 text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded shadow-sm z-20"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  ${node.loss}/d
                </div>
              ))}
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg border z-30">
                <div className="text-sm font-semibold mb-2">Loss Severity</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span className="text-xs">Critical (&gt;$1000/d)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-xs">High ($500-1000/d)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">Medium ($200-500/d)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Low (&lt;$200/d)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Node Details Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Equipment Details</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedNode ? (
            <div className="space-y-4">
              {(() => {
                const node = steamNodes.find(n => n.id === selectedNode);
                if (!node) return null;
                
                return (
                  <>
                    <div>
                      <h3 className="font-semibold text-lg">{node.type}</h3>
                      <Badge className={getSeverityColor(node.severity).replace('bg-', 'bg-').replace('border-', 'border-') + ' text-white'}>
                        {node.severity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-red-50 p-3 rounded-lg">
                        <div className="flex items-center text-red-600 mb-1">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Daily Loss</span>
                        </div>
                        <div className="text-xl font-bold">${node.loss}</div>
                      </div>
                      
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center text-blue-600 mb-1">
                          <Thermometer className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Temperature</span>
                        </div>
                        <div className="text-xl font-bold">{node.temp}°F</div>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center text-green-600 mb-1">
                          <Gauge className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Pressure</span>
                        </div>
                        <div className="text-xl font-bold">{node.pressure} psig</div>
                      </div>
                      
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <div className="flex items-center text-purple-600 mb-1">
                          <Droplets className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Steam Rate</span>
                        </div>
                        <div className="text-xl font-bold">{Math.round(node.loss / 45)} t/d</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Recommended Actions:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {node.severity === "critical" && (
                          <>
                            <li>• Immediate maintenance required</li>
                            <li>• Schedule emergency repair</li>
                            <li>• Consider temporary bypass</li>
                          </>
                        )}
                        {node.severity === "high" && (
                          <>
                            <li>• Schedule maintenance within 48h</li>
                            <li>• Monitor pressure trends</li>
                            <li>• Check insulation integrity</li>
                          </>
                        )}
                        {node.severity === "medium" && (
                          <>
                            <li>• Plan maintenance next shutdown</li>
                            <li>• Monitor for degradation</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Click on any equipment node to view details</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlantSchematic;
