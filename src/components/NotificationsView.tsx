import React from "react";
import MobileHeader from "./MobileHeader";
import { useAuth } from "./AuthProvider";

const NotificationsView: React.FC = () => {
  const { user } = useAuth();

  // Sample notification data
  const notifications = [
    {
      id: 1,
      title: "Emergency Response Dispatched",
      message: "Responders have been dispatched to your location.",
      time: "Today, 10:30 AM",
      read: false,
    },
    {
      id: 2,
      title: "Status Update",
      message: "Responders are 5 minutes away from your location.",
      time: "Today, 10:35 AM",
      read: false,
    },
    {
      id: 3,
      title: "Emergency Resolved",
      message: "Your previous emergency request has been resolved.",
      time: "Yesterday, 3:45 PM",
      read: true,
    },
    {
      id: 4,
      title: "System Maintenance",
      message:
        "The emergency response system will undergo maintenance tonight from 2-4 AM.",
      time: "2 days ago",
      read: true,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-[60px]">
      <MobileHeader title="Notifications" hasNotifications={false} />

      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Request History</h2>

        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-lg shadow-sm p-4 ${!notification.read ? "border-l-4 border-red-600" : ""}`}
            >
              <h3 className="font-semibold">{notification.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsView;
