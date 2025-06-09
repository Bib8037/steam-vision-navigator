
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, Wrench, CheckCircle, Clock } from "lucide-react";

interface TopLossesTableProps {
  limit?: number;
  showActions?: boolean;
}

const TopLossesTable = ({ limit = 10, showActions = false }: TopLossesTableProps) => {
  const lossData = [
    {
      rank: 1,
      item: "Steam Trap T-45",
      location: "HPS Header",
      loss: 1200,
      rootCause: "Stuck-open valve",
      suggestedAction: "Replace trap cartridge",
      priority: "Critical",
      assignee: "John Smith",
      status: "Scheduled"
    },
    {
      rank: 2,
      item: "Let-down Valve LV2",
      location: "LS Skid",
      loss: 900,
      rootCause: "Pilot leak",
      suggestedAction: "Retune pilot system",
      priority: "High",
      assignee: "Mike Johnson",
      status: "In Progress"
    },
    {
      rank: 3,
      item: "Heat Exchanger HE-01",
      location: "Process Unit A",
      loss: 750,
      rootCause: "Fouling buildup",
      suggestedAction: "Chemical cleaning cycle",
      priority: "High",
      assignee: "Sarah Wilson",
      status: "Pending"
    },
    {
      rank: 4,
      item: "Boiler Blowdown BD-1",
      location: "Boiler House",
      loss: 650,
      rootCause: "Over-cycling",
      suggestedAction: "Adjust TDS setpoint",
      priority: "Medium",
      assignee: "Tom Brown",
      status: "Completed"
    },
    {
      rank: 5,
      item: "Steam Trap T-62",
      location: "LPS Header",
      loss: 580,
      rootCause: "Worn seat",
      suggestedAction: "Schedule replacement",
      priority: "Medium",
      assignee: "Lisa Davis",
      status: "Scheduled"
    },
    {
      rank: 6,
      item: "Flash Tank FT-3",
      location: "Condensate Recovery",
      loss: 520,
      rootCause: "Vent valve malfunction",
      suggestedAction: "Repair/replace vent valve",
      priority: "Medium",
      assignee: "Chris Miller",
      status: "Pending"
    },
    {
      rank: 7,
      item: "Insulation Section IS-12",
      location: "Main Steam Line",
      loss: 480,
      rootCause: "Damaged insulation",
      suggestedAction: "Re-insulate section",
      priority: "Low",
      assignee: "David Clark",
      status: "Pending"
    },
    {
      rank: 8,
      item: "PRV Station PRV-4",
      location: "Distribution Header",
      loss: 420,
      rootCause: "Seat leakage",
      suggestedAction: "Valve overhaul",
      priority: "Medium",
      assignee: "Emma Taylor",
      status: "Scheduled"
    },
    {
      rank: 9,
      item: "Steam Trap T-89",
      location: "Heat Trace Circuit",
      loss: 390,
      rootCause: "Failed closed",
      suggestedAction: "Replace trap element",
      priority: "Medium",
      assignee: "Robert Lee",
      status: "In Progress"
    },
    {
      rank: 10,
      item: "Condensate Pump CP-2",
      location: "Pump House",
      loss: 350,
      rootCause: "Seal leak",
      suggestedAction: "Replace mechanical seal",
      priority: "Low",
      assignee: "Nancy White",
      status: "Pending"
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-red-100 text-red-800 border-red-200";
      case "High": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "In Progress": return <Clock className="h-4 w-4 text-blue-600" />;
      case "Scheduled": return <Wrench className="h-4 w-4 text-orange-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const displayData = lossData.slice(0, limit);

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
            Top {limit} Loss Points
          </span>
          <Badge variant="secondary" className="bg-red-50 text-red-700">
            Total: ${displayData.reduce((sum, item) => sum + item.loss, 0).toLocaleString()}/day
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Equipment</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Loss ($/d)</TableHead>
                <TableHead>Root Cause</TableHead>
                <TableHead>Suggested Action</TableHead>
                <TableHead>Priority</TableHead>
                {showActions && (
                  <>
                    <TableHead>Assignee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-32">Actions</TableHead>
                  </>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((item) => (
                <TableRow key={item.rank} className="hover:bg-gray-50">
                  <TableCell className="font-medium">#{item.rank}</TableCell>
                  <TableCell className="font-medium text-blue-600">{item.item}</TableCell>
                  <TableCell className="text-gray-600">{item.location}</TableCell>
                  <TableCell className="text-right font-bold">${item.loss.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{item.rootCause}</TableCell>
                  <TableCell className="text-sm">{item.suggestedAction}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(item.priority)}>
                      {item.priority}
                    </Badge>
                  </TableCell>
                  {showActions && (
                    <>
                      <TableCell className="text-sm">{item.assignee}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          <span className="text-sm">{item.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            Assign
                          </Button>
                          <Button variant="outline" size="sm">
                            Update
                          </Button>
                        </div>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopLossesTable;
