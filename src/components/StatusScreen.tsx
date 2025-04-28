import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import ResponderMap from "./ResponderMap";
import AdditionalInfoPrompt from "./AdditionalInfoPrompt";

type EmergencyStatus =
  | "pending"
  | "dispatched"
  | "en-route"
  | "arrived"
  | "resolved";
type EmergencyType = "medical" | "fire" | "police" | "other";

interface StatusScreenProps {
  status?: EmergencyStatus;
  emergencyType?: EmergencyType;
  location?: string;
  requestTime?: string;
  estimatedArrivalTime?: string;
  responderInfo?: {
    name: string;
    unit: string;
    location: { lat: number; lng: number };
  };
  userLocation?: { lat: number; lng: number };
  needsAdditionalInfo?: boolean;
  onCancel?: () => void;
  onProvideInfo?: (info: string) => void;
}

const StatusScreen = ({
  status = "dispatched",
  emergencyType = "medical",
  location = "123 Main St, New York, NY",
  requestTime = "2:45 PM",
  estimatedArrivalTime = "3:02 PM (5 minutes)",
  responderInfo = {
    name: "Paramedic Team Alpha",
    unit: "Ambulance #42",
    location: { lat: 40.7128, lng: -74.006 },
  },
  userLocation = { lat: 40.73, lng: -73.995 },
  needsAdditionalInfo = false,
  onCancel = () => {},
  onProvideInfo = () => {},
}: StatusScreenProps) => {
  const [progress, setProgress] = useState(25);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // Update progress based on status
  useEffect(() => {
    switch (status) {
      case "pending":
        setProgress(10);
        break;
      case "dispatched":
        setProgress(35);
        break;
      case "en-route":
        setProgress(65);
        break;
      case "arrived":
        setProgress(90);
        break;
      case "resolved":
        setProgress(100);
        break;
      default:
        setProgress(25);
    }
  }, [status]);

  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "dispatched":
        return "bg-blue-500";
      case "en-route":
        return "bg-blue-600";
      case "arrived":
        return "bg-green-500";
      case "resolved":
        return "bg-green-600";
      default:
        return "bg-blue-500";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "pending":
        return "Request Pending";
      case "dispatched":
        return "Help Dispatched";
      case "en-route":
        return "Responders En Route";
      case "arrived":
        return "Responders Arrived";
      case "resolved":
        return "Emergency Resolved";
      default:
        return "Processing Request";
    }
  };

  const getEmergencyTypeColor = () => {
    switch (emergencyType) {
      case "medical":
        return "bg-red-100 text-red-800 border-red-200";
      case "fire":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "police":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEmergencyTypeIcon = () => {
    switch (emergencyType) {
      case "medical":
        return <AlertCircle className="h-4 w-4 text-red-600 mr-1" />;
      case "fire":
        return <AlertCircle className="h-4 w-4 text-orange-600 mr-1" />;
      case "police":
        return <AlertCircle className="h-4 w-4 text-blue-600 mr-1" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600 mr-1" />;
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 flex flex-col gap-4 bg-white min-h-screen">
      {/* Status Header */}
      <Card className="w-full bg-white shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">
              Emergency Status
            </CardTitle>
            <Badge
              variant="outline"
              className={`${getEmergencyTypeColor()} flex items-center px-2 py-1`}
            >
              {getEmergencyTypeIcon()}
              {emergencyType.charAt(0).toUpperCase() + emergencyType.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{getStatusText()}</span>
              <span className="text-sm text-gray-500">{progress}%</span>
            </div>
            <Progress value={progress} className={getStatusColor()} />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Request Time:</span>
              <span className="font-medium flex items-center">
                <Clock className="h-3 w-3 mr-1" /> {requestTime}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Location:</span>
              <span className="font-medium text-right max-w-[60%]">
                {location}
              </span>
            </div>
            {status !== "pending" && (
              <div className="flex justify-between">
                <span className="text-gray-500">ETA:</span>
                <span className="font-medium text-green-600">
                  {estimatedArrivalTime}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Responder Map - Show when en-route */}
      {(status === "en-route" || status === "dispatched") && (
        <ResponderMap
          responderLocation={responderInfo.location}
          userLocation={userLocation}
          estimatedArrivalTime={estimatedArrivalTime
            .split(" ")[1]
            .replace("(", "")
            .replace(")", "")}
        />
      )}

      {/* Additional Info Prompt - Show when needed */}
      {needsAdditionalInfo && (
        <AdditionalInfoPrompt
          onSubmit={onProvideInfo}
          onCancel={() => {}}
          isUrgent={status === "en-route"}
        />
      )}

      {/* Responder Info */}
      {status !== "pending" && status !== "resolved" && (
        <Card className="w-full bg-white shadow-md">
          <CardContent className="p-4">
            <h3 className="font-medium text-sm mb-2">Responder Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Team:</span>
                <span className="font-medium">{responderInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Unit:</span>
                <span className="font-medium">{responderInfo.unit}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cancel Button - Not shown when resolved */}
      {status !== "resolved" && (
        <div className="mt-auto">
          {!showCancelConfirm ? (
            <Button
              variant="outline"
              className="w-full border-red-300 text-red-600 hover:bg-red-50"
              onClick={() => setShowCancelConfirm(true)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Cancel Emergency Request
            </Button>
          ) : (
            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <p className="text-sm text-red-700 mb-3">
                Are you sure you want to cancel this emergency request?
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowCancelConfirm(false)}
                >
                  No, Keep Request
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={onCancel}
                >
                  Yes, Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Resolved Message */}
      {status === "resolved" && (
        <div className="p-4 border border-green-200 rounded-lg bg-green-50 flex items-center">
          <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
          <p className="text-sm text-green-700">
            This emergency has been resolved. Thank you for using our emergency
            services.
          </p>
        </div>
      )}
    </div>
  );
};

export default StatusScreen;
