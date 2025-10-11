"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { SearchFilterProps } from "@/types";

export default function SearchFilter({ searchQuery, onSearchChange, availableAddresses }: SearchFilterProps) {
  const [addressSearchQuery, setAddressSearchQuery] = useState(searchQuery || "");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredAddresses = availableAddresses.filter(address =>
    address.toLowerCase().includes(addressSearchQuery.toLowerCase())
  );

  // Sync search query with selected address
  useEffect(() => {
    setAddressSearchQuery(searchQuery || "");
  }, [searchQuery]);

  const handleSearchChange = (query: string) => {
    setAddressSearchQuery(query);
    setShowDropdown(query.length > 0);
  };

  const handleAddressSelect = (address: string) => {
    onSearchChange(address);
    setAddressSearchQuery(address);
    setShowDropdown(false);
  };

  const handleClear = () => {
    setAddressSearchQuery('');
    onSearchChange('');
    setShowDropdown(false);
  };

  return (
    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
      <label className="text-xs font-medium text-gray-700">
        Search by address
      </label>
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Search addresses..."
            value={addressSearchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onFocus={() => setShowDropdown(addressSearchQuery.length > 0)}
            onClick={(e) => e.stopPropagation()}
            className="pl-7 h-7 text-xs border-bcgeu-blue-200 focus:border-bcgeu-blue-500"
          />
          {addressSearchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        
        {showDropdown && filteredAddresses.length > 0 && (
          <div className="max-h-32 overflow-y-auto border border-gray-200 rounded bg-white shadow-lg">
            {filteredAddresses.slice(0, 20).map((address) => (
              <button
                key={address}
                onClick={() => handleAddressSelect(address)}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
              >
                <input
                  type="radio"
                  name="address"
                  value={address}
                  checked={searchQuery === address}
                  onChange={() => {}}
                  className="w-3 h-3 text-bcgeu-blue-600 border-gray-300 focus:ring-bcgeu-blue-500"
                />
                <span>{address}</span>
              </button>
            ))}
            {filteredAddresses.length > 20 && (
              <div className="text-xs text-gray-500 px-3 py-2 border-t">
                ... and {filteredAddresses.length - 20} more
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}