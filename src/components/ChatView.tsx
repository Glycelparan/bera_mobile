import React from "react";
import MobileHeader from "./MobileHeader";
import { useAuth } from "./AuthProvider";
import { Send } from "lucide-react";
import { Button } from "./ui/button";

const ChatView: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="bg-gray-100 min-h-screen pt-[60px] flex flex-col">
      <MobileHeader title="Chat" hasNotifications={false} />

      <div className="flex-1 p-4 pb-16 overflow-y-auto">
        <div className="space-y-4">
          {/* Sample messages */}
          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm">Hello, how can I help you today?</p>
              <p className="text-xs text-gray-500 mt-1">
                Responder 1 • 10:30 AM
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="bg-red-600 text-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm">
                I need assistance with an emergency situation.
              </p>
              <p className="text-xs text-red-200 mt-1">You • 10:32 AM</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-white rounded-lg p-3 max-w-[80%] shadow-sm">
              <p className="text-sm">
                I understand. Can you provide more details about your emergency?
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Responder 1 • 10:33 AM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 flex items-center border-t border-gray-200">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
        <Button
          size="icon"
          className="rounded-full bg-red-600 hover:bg-red-700"
        >
          <Send size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ChatView;
