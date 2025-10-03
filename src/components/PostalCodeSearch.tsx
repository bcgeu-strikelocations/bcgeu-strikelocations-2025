"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { formatPostalCode, validatePostalCode } from "@/lib/utils";
import { PostalCodeLocation } from "@/types";

interface PostalCodeSearchProps {
  onPostalCodeFound: (location: PostalCodeLocation) => void;
  onError?: (error: string) => void;
}

export default function PostalCodeSearch({
  onPostalCodeFound,
  onError,
}: PostalCodeSearchProps) {
  const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handlePostalCodeChange = (value: string) => {
    const formatted = formatPostalCode(value);
    setPostalCode(formatted);
    // Clear error when user starts typing
    if (error) setError(undefined);
  };

  const searchPostalCode = useCallback(async () => {
    if (!postalCode.trim()) return;

    if (!validatePostalCode(postalCode)) {
      return;
    }

    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/geocode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postalCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error || "Failed to geocode postal code";
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      const location: PostalCodeLocation = await response.json();
      onPostalCodeFound(location);
      setPostalCode(""); // Clear input after successful search
    } catch (error) {
      console.error("Unexpected postal code search error:", error);
      const errorMessage = "Network error. Please check your connection and try again.";
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [postalCode, onPostalCodeFound, onError]);

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchPostalCode();
    }
  };

  const clearInput = () => {
    setPostalCode("");
    setError(undefined);
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-1.5 sm:space-x-2">
        <div className="relative flex-1">
          <Input
            id="postal-code"
            type="text"
            placeholder="Search PO Code (e.g. V6B 1A1)"
            value={postalCode}
            onChange={(e) => handlePostalCodeChange(e.target.value)}
            onKeyUp={handleKeyUp}
            maxLength={7}
            className="pr-8 h-8 sm:h-9 border-bcgeu-blue-200 focus:border-bcgeu-blue-500 focus:ring-bcgeu-blue-500 rounded-lg text-xs"
          />
          {postalCode && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 hover:bg-bcgeu-blue-50"
              onClick={clearInput}
            >
              <X className="w-3 h-3 text-gray-500" />
            </Button>
          )}
        </div>
        <Button
          onClick={searchPostalCode}
          disabled={isLoading || !postalCode.trim()}
          className="bg-bcgeu-gold-600 hover:bg-bcgeu-gold-700 text-white h-8 sm:h-9 px-3 sm:px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
          size="sm"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <div className="text-xs text-red-700 bg-red-50 p-2 rounded border border-red-200 font-medium">
          {error}
        </div>
      )}
    </div>
  );
}
