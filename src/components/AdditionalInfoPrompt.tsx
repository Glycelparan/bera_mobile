import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { AlertCircle } from "lucide-react";

interface AdditionalInfoPromptProps {
  onSubmit?: (info: string) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  isUrgent?: boolean;
}

const AdditionalInfoPrompt = ({
  onSubmit = () => {},
  onCancel = () => {},
  title = "Additional Information Needed",
  description = "Emergency responders have requested more details about your situation.",
  isUrgent = false,
}: AdditionalInfoPromptProps) => {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(additionalInfo);
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className={`${isUrgent ? "bg-red-50" : "bg-blue-50"} p-4`}>
        <div className="flex items-center gap-2">
          {isUrgent && <AlertCircle className="h-5 w-5 text-red-500" />}
          <CardTitle
            className={`text-lg ${isUrgent ? "text-red-700" : "text-blue-700"}`}
          >
            {title}
          </CardTitle>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="p-4">
          <Textarea
            placeholder="Please provide any additional details that might help emergency responders..."
            className="min-h-[120px] w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </CardContent>
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`${isUrgent ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"} text-white`}
          >
            Send Information
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdditionalInfoPrompt;
