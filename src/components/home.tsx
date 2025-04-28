import React, { useState } from "react";
import MobileHeader from "./MobileHeader";
import EmergencyButton from "./EmergencyButton";
import LocationPrompt from "./LocationPrompt";
import EmergencyTypeSelector from "./EmergencyTypeSelector";
import ManualLocationEntry from "./ManualLocationEntry";
import ConfirmationScreen from "./ConfirmationScreen";
import StatusScreen from "./StatusScreen";
import CancellationDialog from "./CancellationDialog";

type EmergencyType = {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
};

type LocationData = {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  additionalInfo: string;
};

type EmergencyStatus =
  | "pending"
  | "dispatched"
  | "en-route"
  | "arrived"
  | "resolved";

type FlowStep =
  | "home"
  | "location-prompt"
  | "manual-location"
  | "emergency-type"
  | "confirmation"
  | "status";

const Home = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>("home");
  const [showLocationPrompt, setShowLocationPrompt] = useState(false);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);
  const [selectedEmergencyType, setSelectedEmergencyType] =
    useState<EmergencyType | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [usingGPS, setUsingGPS] = useState(false);
  const [emergencyStatus, setEmergencyStatus] =
    useState<EmergencyStatus>("pending");

  // Simulated GPS coordinates
  const userLocation = { lat: 40.73, lng: -73.995 };

  const handleEmergencyButtonClick = () => {
    setShowLocationPrompt(true);
    setCurrentStep("location-prompt");
  };

  const handleEnableLocation = () => {
    // Simulate getting GPS location
    setUsingGPS(true);
    setCurrentStep("emergency-type");
  };

  const handleDeclineLocation = () => {
    setCurrentStep("manual-location");
  };

  const handleLocationSubmit = (data: LocationData) => {
    setLocationData(data);
    setCurrentStep("emergency-type");
  };

  const handleEmergencyTypeSelect = (type: EmergencyType) => {
    setSelectedEmergencyType(type);
    setCurrentStep("confirmation");
  };

  const handleConfirmEmergency = () => {
    setCurrentStep("status");
    // Simulate status updates
    simulateEmergencyResponse();
  };

  const handleCancelEmergency = () => {
    setShowCancellationDialog(true);
  };

  const handleConfirmCancellation = () => {
    setShowCancellationDialog(false);
    setCurrentStep("home");
    resetEmergencyData();
  };

  const handleCloseCancellationDialog = () => {
    setShowCancellationDialog(false);
  };

  const resetEmergencyData = () => {
    setSelectedEmergencyType(null);
    setLocationData(null);
    setUsingGPS(false);
    setEmergencyStatus("pending");
  };

  // Simulate emergency response timeline
  const simulateEmergencyResponse = () => {
    // Simulate dispatched status after 2 seconds
    setTimeout(() => {
      setEmergencyStatus("dispatched");

      // Simulate en-route status after 5 more seconds
      setTimeout(() => {
        setEmergencyStatus("en-route");

        // Simulate arrived status after 8 more seconds
        setTimeout(() => {
          setEmergencyStatus("arrived");

          // Simulate resolved status after 10 more seconds
          setTimeout(() => {
            setEmergencyStatus("resolved");
          }, 10000);
        }, 8000);
      }, 5000);
    }, 2000);
  };

  // Format location for display
  const getFormattedLocation = () => {
    if (usingGPS) {
      return "Current GPS Location";
    } else if (locationData) {
      return `${locationData.address}, ${locationData.city}, ${locationData.state} ${locationData.zipCode}`;
    }
    return "Unknown location";
  };

  // Get emergency details for confirmation
  const getEmergencyDetails = () => {
    return {
      type: selectedEmergencyType?.name || "Unknown",
      location: {
        address: getFormattedLocation(),
        coordinates: usingGPS ? userLocation : undefined,
      },
      additionalInfo: locationData?.additionalInfo || "",
    };
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MobileHeader />

      <main className="flex-1 pt-[60px] pb-4 flex flex-col items-center justify-center">
        {currentStep === "home" && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">
              Emergency Response
            </h1>
            <p className="text-center text-gray-600 mb-8 px-6">
              Tap the button below to request immediate emergency assistance
            </p>
            <EmergencyButton onClick={handleEmergencyButtonClick} />
          </div>
        )}

        {currentStep === "location-prompt" && (
          <LocationPrompt
            isOpen={showLocationPrompt}
            onEnableLocation={handleEnableLocation}
            onDeclineLocation={handleDeclineLocation}
          />
        )}

        {currentStep === "manual-location" && (
          <ManualLocationEntry
            onSubmit={handleLocationSubmit}
            onCancel={() => setCurrentStep("home")}
          />
        )}

        {currentStep === "emergency-type" && (
          <EmergencyTypeSelector
            onSelect={handleEmergencyTypeSelect}
            onBack={() =>
              setCurrentStep(usingGPS ? "location-prompt" : "manual-location")
            }
          />
        )}

        {currentStep === "confirmation" && (
          <ConfirmationScreen
            emergencyDetails={getEmergencyDetails()}
            onConfirm={handleConfirmEmergency}
            onCancel={() => setCurrentStep("emergency-type")}
          />
        )}

        {currentStep === "status" && (
          <StatusScreen
            status={emergencyStatus}
            emergencyType={(selectedEmergencyType?.id as any) || "medical"}
            location={getFormattedLocation()}
            requestTime={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            estimatedArrivalTime={"3:02 PM (5 minutes)"}
            userLocation={userLocation}
            onCancel={handleCancelEmergency}
          />
        )}
      </main>

      {showCancellationDialog && (
        <CancellationDialog
          isOpen={showCancellationDialog}
          onClose={handleCloseCancellationDialog}
          onConfirm={handleConfirmCancellation}
        />
      )}
    </div>
  );
};

export default Home;
