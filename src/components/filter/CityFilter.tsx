"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CityFilterProps {
  availableCities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export default function CityFilter({
  availableCities,
  selectedCity,
  onCityChange,
}: CityFilterProps) {
  const [citySearchQuery, setCitySearchQuery] = useState(selectedCity || "");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = availableCities.filter(city =>
    city.toLowerCase().includes(citySearchQuery.toLowerCase())
  );

  // Sync search query with selected city
  useEffect(() => {
    setCitySearchQuery(selectedCity || "");
  }, [selectedCity]);

  const handleSearchChange = (query: string) => {
    setCitySearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setCitySearchQuery(city);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setCitySearchQuery('');
    onCityChange('');
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <label className="text-xs font-medium text-gray-700">
        City
      </label>
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search cities..."
            value={citySearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowDropdown(citySearchQuery.length > 0)}
            onClick={(e) => e.stopPropagation()}
            className="pl-7 h-7 text-xs border-bcgeu-blue-200 focus:border-bcgeu-blue-500"
          />
          {citySearchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        
        {showDropdown && filteredCities.length > 0 && (
          <div className="max-h-32 overflow-y-auto border border-gray-200 rounded bg-white shadow-lg">
            {filteredCities.slice(0, 20).map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <input
                  type="radio"
                  name="city"
                  value={city}
                  checked={selectedCity === city}
                  onChange={() => {}}
                  className="w-3 h-3 text-bcgeu-blue-600 border-gray-300 focus:ring-bcgeu-blue-500"
                />
                <span>{city}</span>
              </button>
            ))}
            {filteredCities.length > 20 && (
              <div className="text-xs text-gray-500 px-3 py-2 border-t">
                ... and {filteredCities.length - 20} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}