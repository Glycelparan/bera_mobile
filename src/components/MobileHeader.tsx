import React from "react";
import { Menu, Bell, User, MapPin, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

interface MobileHeaderProps {
  title?: string;
  onMenuClick?: () => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onMapClick?: () => void;
  onChatClick?: () => void;
  hasNotifications?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  title = "Bilar Emergency Response",
  onMenuClick,
  onNotificationClick,
  onProfileClick,
  onMapClick,
  onChatClick,
  hasNotifications = false,
}) => {
  const navigate = useNavigate();

  function handleMenuClick() {
    if (onMenuClick) {
      onMenuClick();
    } else {
      navigate("/");
    }
  }

  function handleMapClick() {
    if (onMapClick) {
      onMapClick();
    } else {
      navigate("/map");
    }
  }

  function handleChatClick() {
    if (onChatClick) {
      onChatClick();
    } else {
      navigate("/chat");
    }
  }

  function handleNotificationClick() {
    if (onNotificationClick) {
      onNotificationClick();
    } else {
      // Default notification handling
      alert("No new notifications");
    }
  }

  function handleProfileClick() {
    if (onProfileClick) {
      onProfileClick();
    } else {
      navigate("/account");
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 h-[60px] bg-red-600 text-white flex items-center justify-between px-4 z-10 shadow-md">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-700 mr-2"
          onClick={handleMenuClick}
        >
          <Menu size={24} />
        </Button>
        <h1 className="text-xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-700"
          onClick={handleMapClick}
        >
          <MapPin size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-700"
          onClick={handleChatClick}
        >
          <MessageSquare size={24} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-700 relative"
          onClick={handleNotificationClick}
        >
          <Bell size={24} />
          {hasNotifications && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"></span>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-red-700"
          onClick={handleProfileClick}
        >
          <User size={24} />
        </Button>
      </div>
    </header>
  );
};

export default MobileHeader;
