import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertCircle,
  Stethoscope,
  Flame,
  Shield,
  Car,
  Ambulance,
} from "lucide-react";

interface EmergencyType {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface EmergencyTypeSelectorProps {
  onSelect?: (type: EmergencyType) => void;
  onBack?: () => void;
}

const EmergencyTypeSelector = ({
  onSelect = () => {},
  onBack = () => {},
}: EmergencyTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const emergencyTypes: EmergencyType[] = [
    {
      id: "medical",
      name: "Medical Emergency",
      icon: <Stethoscope size={32} />,
      color: "bg-red-100 hover:bg-red-200 text-red-700",
    },
    {
      id: "fire",
      name: "Fire Emergency",
      icon: <Flame size={32} />,
      color: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    },
    {
      id: "police",
      name: "Police Emergency",
      icon: <Shield size={32} />,
      color: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    },
    {
      id: "traffic",
      name: "Traffic Accident",
      icon: <Car size={32} />,
      color: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    },
    {
      id: "ambulance",
      name: "Ambulance Needed",
      icon: <Ambulance size={32} />,
      color: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    },
    {
      id: "other",
      name: "Other Emergency",
      icon: <AlertCircle size={32} />,
      color: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    },
  ];

  const handleSelect = (type: EmergencyType) => {
    setSelectedType(type.id);
    onSelect(type);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        What type of emergency?
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {emergencyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type)}
            className={`
              ${type.color} 
              ${selectedType === type.id ? "ring-2 ring-primary" : ""}
              p-4 rounded-lg flex flex-col items-center justify-center
              transition-all duration-200 h-32
            `}
          >
            <div className="mb-2">{type.icon}</div>
            <span className="text-sm font-medium text-center">{type.name}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack} className="w-1/3">
          Back
        </Button>

        <Button
          onClick={() => {
            const selected = emergencyTypes.find((t) => t.id === selectedType);
            if (selected) onSelect(selected);
          }}
          disabled={!selectedType}
          className="w-2/3 ml-2"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default EmergencyTypeSelector;
