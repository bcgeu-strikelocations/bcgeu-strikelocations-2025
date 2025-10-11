"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { UserLocation, UserLocationButtonProps } from "@/types";

export default function UserLocationButton({
  onUserLocationChange,
}: UserLocationButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const location: UserLocation = { lat, lng, accuracy };

        setIsLoading(false);
        onUserLocationChange?.(location);
      },
      (error) => {
        console.error("Error getting location:", error);
        setIsLoading(false);

        let errorMessage = "Unable to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please allow location access to see your position on the map.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        alert(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    );
  }, [onUserLocationChange]);

  return (
    <Button
      onClick={getUserLocation}
      disabled={isLoading}
      className="w-full bg-bcgeu-blue-600 hover:bg-bcgeu-blue-700 text-white font-medium py-1.5 sm:py-2 px-2 sm:px-3 rounded-md shadow-sm transition-all duration-200 hover:shadow-md text-xs sm:text-sm"
      variant="default"
    >
      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" />
      {isLoading ? "Getting..." : "My Location"}
    </Button>
  );
}
