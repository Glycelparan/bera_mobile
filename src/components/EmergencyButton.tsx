import React from "react";
import { Button } from "./ui/button";
import { AlertCircle } from "lucide-react";

interface EmergencyButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const EmergencyButton = ({
  onClick = () => console.log("Emergency button clicked"),
  isLoading = false,
  disabled = false,
}: EmergencyButtonProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white">
      <Button
        variant="destructive"
        size="lg"
        className="w-48 h-48 rounded-full text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center gap-2 disabled:opacity-70"
        onClick={onClick}
        disabled={disabled || isLoading}
      >
        <AlertCircle className="h-16 w-16" />
        {isLoading ? "Requesting..." : "Request\nEmergency Help"}
      </Button>
      <p className="mt-4 text-sm text-gray-500 text-center">
        Tap the button above to request immediate emergency assistance
      </p>
    </div>
  );
};

export default EmergencyButton;
