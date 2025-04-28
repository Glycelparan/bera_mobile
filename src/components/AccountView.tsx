import React from "react";
import MobileHeader from "./MobileHeader";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { User, Settings, Bell, LogOut, Shield, Phone } from "lucide-react";

const AccountView: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-[60px]">
      <MobileHeader title="Account" hasNotifications={false} />

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <User size={40} className="text-red-600" />
          </div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-600">+63 912 345 6789</p>
          <p className="text-sm text-gray-500 mt-1">Bilar, Bohol</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center">
            <Phone size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="font-medium">Contact Information</p>
              <p className="text-xs text-gray-500">
                Update your phone number and address
              </p>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 flex items-center">
            <Bell size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="font-medium">Notification Settings</p>
              <p className="text-xs text-gray-500">
                Manage your notification preferences
              </p>
            </div>
          </div>

          <div className="p-4 border-b border-gray-100 flex items-center">
            <Shield size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="font-medium">Privacy & Security</p>
              <p className="text-xs text-gray-500">
                Control your privacy settings
              </p>
            </div>
          </div>

          <div className="p-4 flex items-center">
            <Settings size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="font-medium">App Settings</p>
              <p className="text-xs text-gray-500">Manage app preferences</p>
            </div>
          </div>
        </div>

        <Button
          variant="destructive"
          className="w-full mt-6"
          onClick={handleLogout}
        >
          <LogOut size={18} className="mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default AccountView;
