import React from "react";
import { Button } from "./ui/button";
import { AlertTriangle, Check, X } from "lucide-react";

interface EmergencyDetails {
  type: string;
  location: {
    address?: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  additionalInfo?: string;
}

interface ConfirmationScreenProps {
  emergencyDetails?: EmergencyDetails;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  emergencyDetails = {
    type: "Medical",
    location: {
      address: "123 Main St, Anytown, USA",
      coordinates: {
        latitude: 40.7128,
        longitude: -74.006,
      },
    },
    additionalInfo: "Patient experiencing chest pain",
  },
  onConfirm = () => console.log("Emergency confirmed"),
  onCancel = () => console.log("Emergency cancelled"),
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <div className="w-full mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Confirm Emergency Request
        </h2>
        <p className="text-gray-600">
          Please review the details before submitting
        </p>
      </div>

      <div className="w-full bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex items-center mb-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          <span className="font-medium text-amber-700">
            Emergency services will be dispatched
          </span>
        </div>
        <p className="text-sm text-amber-600">
          Only confirm if you require immediate assistance
        </p>
      </div>

      <div className="w-full bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Emergency Details</h3>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Type:</span>
            <span className="font-medium text-gray-800">
              {emergencyDetails.type}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium text-gray-800 text-right">
              {emergencyDetails.location.address || "Using GPS coordinates"}
            </span>
          </div>

          {emergencyDetails.additionalInfo && (
            <div className="pt-2 border-t border-gray-200">
              <span className="text-gray-600 block mb-1">
                Additional Information:
              </span>
              <p className="text-gray-800">{emergencyDetails.additionalInfo}</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3">
        <Button
          onClick={onConfirm}
          className="w-full py-6 text-base font-semibold flex items-center justify-center gap-2"
          variant="default"
        >
          <Check className="h-5 w-5" />
          Confirm Emergency
        </Button>

        <Button
          onClick={onCancel}
          className="w-full py-6 text-base font-semibold flex items-center justify-center gap-2"
          variant="outline"
        >
          <X className="h-5 w-5" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
