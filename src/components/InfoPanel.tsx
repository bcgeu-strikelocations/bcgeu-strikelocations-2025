"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InfoPanelProps } from "@/types";
import { useState, useEffect, useCallback } from "react";
import UserLocationButton from "./UserLocationButton";
import PostalCodeSearch from "./PostalCodeSearch";
import { Info, X, Flag, User, Search, Circle } from "lucide-react";
import { PostalCodeLocation } from "@/types";

export default function InfoPanel({
  locationsCount,
  nearestStrike,
  onUserLocationChange,
  onPostalLocationChange,
}: InfoPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 640; // Tailwind's 'sm' breakpoint
      setIsMobile(mobile);
      setIsExpanded(!mobile); // Desktop: expanded, Mobile: collapsed
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePostalCodeFound = useCallback(
    (location: PostalCodeLocation) => {
      onPostalLocationChange?.(location);
    },
    [onPostalLocationChange]
  );


  const PanelContent = () => (
    <>
      {/* Legend with inline close button */}
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs sm:text-sm font-semibold text-bcgeu-blue-700">
          Legend
        </h4>
        <Button
          onClick={toggleExpanded}
          variant="ghost"
          size="icon"
          className="h-6 w-6 hover:bg-bcgeu-blue-50 transition-colors duration-200"
        >
          <X className="w-3 h-3 text-bcgeu-blue-600" />
        </Button>
      </div>

      {/* Legend */}
      <div className="space-y-2">
        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-bcgeu-blue-600 border-2 border-bcgeu-blue-800">
              <Flag className="w-3 h-3 fill-current text-bcgeu-gold-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">
              Strike Locations: Picketed
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-bcgeu-blue-600 border-2 border-bcgeu-blue-800">
              <Flag className="w-3 h-3 fill-current text-orange-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">
              Strike Locations: Not Picketed
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-red-50 border-2 border-red-200">
              <Circle className="w-3 h-3 text-bcgeu-red-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">30km Radius</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-bcgeu-blue-50 border-2 border-blue-200">
              <User className="w-3 h-3 fill-current text-bcgeu-blue-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Your Location</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 bg-yellow-50 border-2 border-yellow-200">
              <Search className="w-3 h-3 fill-current text-bcgeu-gold-600" />
            </div>
            <span className="text-xs text-gray-700 font-medium">Postal Search</span>
          </div>
        </div>
      </div>

      <Separator className="my-2 sm:my-3" />

      <div className="space-y-2 sm:space-y-3">
        <UserLocationButton onUserLocationChange={onUserLocationChange} />
        <PostalCodeSearch onPostalCodeFound={handlePostalCodeFound} />
      </div>

      <Separator className="my-2 sm:my-3 bg-bcgeu-blue-100" />

      {/* Stats */}
      <div className="bg-bcgeu-blue-50 p-2 sm:p-3 rounded border border-bcgeu-blue-100">
        <div className="text-xs sm:text-xs font-semibold text-bcgeu-blue-800">
          {(() => {
            let text = `${locationsCount} strike locations displayed`;
            if (nearestStrike) {
              const distance = nearestStrike.distance;
              const distanceText = distance < 1 
                ? `${(distance * 1000).toFixed(1)}m away`
                : `${distance.toFixed(1)}km away`;
              text += ` • Nearest picket: ${nearestStrike.location.address} (${distanceText})`;
            }
            return text;
          })()}
        </div>
      </div>

      {/* Date Footer */}
      <div className="text-center mt-2">
        <small className="text-xs text-gray-500">
          Last Updated: October 9th, 2025
        </small>
      </div>
    </>
  );

  return (
    <>
      {/* Toggle Button - Only visible when panel is closed */}
      {!isExpanded && (
        <Button
          onClick={toggleExpanded}
          className={`absolute top-1 sm:top-4 right-1 sm:right-2 bg-bcgeu-blue-600 hover:bg-bcgeu-blue-700 text-white rounded-full shadow-lg z-[1000] transition-all duration-200 hover:scale-105 ${
            isMobile ? "h-10 w-10" : "h-12 w-12"
          }`}
          size="icon"
        >
          <Info className={`${isMobile ? "h-5 w-5" : "h-6 w-6"}`} />
        </Button>
      )}

      {/* Info Panel with responsive positioning */}
      <div
        className={`absolute top-2 sm:top-4 right-1 sm:right-2 bg-white rounded-lg shadow-lg w-full mx-1 sm:mx-2 border border-bcgeu-blue-200 z-[1000] transition-all duration-300 ease-out transform ${
          isExpanded
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-full scale-95 pointer-events-none"
        } ${isMobile ? "max-w-72" : "max-w-80"}`}
      >
        <div className={`${isMobile ? "p-3" : "p-4"}`}>
          <PanelContent />
        </div>
      </div>
    </>
  );
}
