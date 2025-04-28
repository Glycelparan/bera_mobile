import React, { useState } from "react";
import { MapPin, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface LocationPromptProps {
  isOpen?: boolean;
  onEnableLocation?: () => void;
  onDeclineLocation?: () => void;
}

const LocationPrompt = ({
  isOpen = true,
  onEnableLocation = () => console.log("Location enabled"),
  onDeclineLocation = () => console.log("Location declined"),
}: LocationPromptProps) => {
  const [open, setOpen] = useState(isOpen);

  const handleEnableLocation = () => {
    onEnableLocation();
    setOpen(false);
  };

  const handleDeclineLocation = () => {
    onDeclineLocation();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white max-w-[350px] rounded-lg">
        <DialogHeader>
          <div className="flex justify-center mb-2">
            <div className="bg-amber-100 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-amber-600" />
            </div>
          </div>
          <DialogTitle className="text-center text-xl">
            Location Access
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            We need your location to send emergency services to you. Without
            your location, help may be delayed.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-amber-50 p-3 rounded-md flex items-start gap-2 my-2">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            For fastest response, please enable location services.
          </p>
        </div>

        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 h-auto"
            onClick={handleEnableLocation}
          >
            Enable Location
          </Button>
          <Button
            variant="outline"
            className="w-full border-gray-300 text-gray-700 py-3 h-auto"
            onClick={handleDeclineLocation}
          >
            Enter Location Manually
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationPrompt;
