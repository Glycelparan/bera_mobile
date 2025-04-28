import React from "react";
import MobileHeader from "./MobileHeader";
import { useAuth } from "./AuthProvider";

const MapView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen pt-[60px]">
      <MobileHeader title="Map View" hasNotifications={false} />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Bilar, Bohol, Philippines</h2>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <div className="aspect-video bg-gray-200 rounded-md mb-4 flex items-center justify-center">
            <p className="text-gray-500">
              Map of Bilar, Bohol will be displayed here
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            Location: Bilar, Bohol, Philippines
          </p>
        </div>

        <h3 className="text-lg font-semibold mb-2">Available Responders</h3>

        <div className="space-y-2">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-sm p-3 flex items-center"
            >
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <span className="text-red-600 font-bold">{id}</span>
              </div>
              <div>
                <p className="font-medium">Responder {id}</p>
                <p className="text-xs text-gray-500">
                  2.{id} km away • Available
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;
