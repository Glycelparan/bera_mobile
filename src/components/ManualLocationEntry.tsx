import React, { useState } from "react";
import { MapPin } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface ManualLocationEntryProps {
  onSubmit?: (locationData: LocationData) => void;
  onCancel?: () => void;
}

interface LocationData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  additionalInfo: string;
}

const ManualLocationEntry = ({
  onSubmit = () => {},
  onCancel = () => {},
}: ManualLocationEntryProps) => {
  const [locationData, setLocationData] = useState<LocationData>({
    address: "",
    city: "",
    state: "",
    zipCode: "",
    additionalInfo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocationData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(locationData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-background">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Enter Your Location</CardTitle>
          </div>
          <CardDescription>
            Please provide your current location details so emergency services
            can reach you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Street Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 Main St"
                value={locationData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="City"
                  value={locationData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  placeholder="State"
                  value={locationData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">Zip Code</Label>
              <Input
                id="zipCode"
                name="zipCode"
                placeholder="12345"
                value={locationData.zipCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">
                Additional Information (Optional)
              </Label>
              <Input
                id="additionalInfo"
                name="additionalInfo"
                placeholder="Apartment number, landmarks, etc."
                value={locationData.additionalInfo}
                onChange={handleChange}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-red-600 hover:bg-red-700"
          >
            Submit Location
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ManualLocationEntry;
