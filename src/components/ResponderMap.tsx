import React, { useState, useEffect } from "react";
import { MapPin, Navigation } from "lucide-react";
import { Card } from "./ui/card";

interface ResponderMapProps {
  responderLocation?: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number };
  estimatedArrivalTime?: string;
}

const ResponderMap = ({
  responderLocation = { lat: 40.7128, lng: -74.006 }, // Default to NYC coordinates
  userLocation = { lat: 40.73, lng: -73.995 }, // Default slightly different location
  estimatedArrivalTime = "5 minutes",
}: ResponderMapProps) => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="w-full max-w-[320px] mx-auto overflow-hidden bg-white shadow-md rounded-lg">
      <div className="relative w-full h-[200px] bg-slate-100">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          </div>
        ) : (
          <>
            {/* This is a simplified map representation */}
            <div className="absolute inset-0 bg-blue-50">
              {/* Map grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="border border-blue-100"></div>
                ))}
              </div>

              {/* User location pin */}
              <div className="absolute" style={{ top: "60%", left: "40%" }}>
                <div className="relative">
                  <MapPin className="h-6 w-6 text-blue-600" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Your Location
                  </div>
                </div>
              </div>

              {/* Responder location pin */}
              <div className="absolute" style={{ top: "30%", left: "70%" }}>
                <div className="relative">
                  <Navigation className="h-6 w-6 text-red-600" />
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Responder
                  </div>
                </div>
              </div>

              {/* Route line */}
              <svg className="absolute inset-0 w-full h-full">
                <path
                  d="M140,120 Q180,90 210,60"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                />
              </svg>
            </div>
          </>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">Responder En Route</h3>
          <span className="text-sm font-bold text-green-600">
            {estimatedArrivalTime}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Emergency services are on their way to your location
        </p>
      </div>
    </Card>
  );
};

export default ResponderMap;
