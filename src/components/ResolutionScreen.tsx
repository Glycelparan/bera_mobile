import React, { useState } from "react";
import { CheckCircle, Star, ThumbsUp, ThumbsDown } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ResolutionScreenProps {
  emergencyType?: string;
  responseTime?: number;
  responderName?: string;
  onComplete?: () => void;
  onReturnHome?: () => void;
}

const ResolutionScreen: React.FC<ResolutionScreenProps> = ({
  emergencyType = "Medical",
  responseTime = 12,
  responderName = "John Medic",
  onComplete = () => {},
  onReturnHome = () => {},
}) => {
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [satisfaction, setSatisfaction] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = () => {
    // In a real app, this would send the feedback to a server
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 bg-background">
        <div className="text-center mb-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold">Thank You!</h2>
          <p className="text-muted-foreground mt-2">
            Your feedback has been submitted.
          </p>
        </div>
        <Button onClick={onReturnHome} className="w-full">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col h-full bg-background">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Emergency Resolved
          </CardTitle>
          <CardDescription className="text-center">
            Please provide feedback on your emergency assistance
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">Emergency Details</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-muted-foreground">Type:</span>
              <span>{emergencyType}</span>
              <span className="text-muted-foreground">Response Time:</span>
              <span>{responseTime} minutes</span>
              <span className="text-muted-foreground">Responder:</span>
              <span>{responderName}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              How would you rate your experience?
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 ${rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Were you satisfied with the assistance provided?
            </label>
            <RadioGroup
              value={satisfaction}
              onValueChange={setSatisfaction}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="very-satisfied" id="very-satisfied" />
                <label htmlFor="very-satisfied" className="text-sm">
                  Very satisfied
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="satisfied" id="satisfied" />
                <label htmlFor="satisfied" className="text-sm">
                  Satisfied
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <label htmlFor="neutral" className="text-sm">
                  Neutral
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dissatisfied" id="dissatisfied" />
                <label htmlFor="dissatisfied" className="text-sm">
                  Dissatisfied
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="very-dissatisfied"
                  id="very-dissatisfied"
                />
                <label htmlFor="very-dissatisfied" className="text-sm">
                  Very dissatisfied
                </label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium mb-2"
            >
              Additional comments or suggestions
            </label>
            <Textarea
              id="feedback"
              placeholder="Please share any additional feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setSatisfaction("thumbs-down")}
            >
              <ThumbsDown className="w-4 h-4" />
              Needs Improvement
            </Button>
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2"
              onClick={() => setSatisfaction("thumbs-up")}
            >
              <ThumbsUp className="w-4 h-4" />
              Good Service
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={rating === 0}
          >
            Submit Feedback
          </Button>
          <Button variant="ghost" onClick={onReturnHome} className="w-full">
            Skip & Return Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResolutionScreen;
