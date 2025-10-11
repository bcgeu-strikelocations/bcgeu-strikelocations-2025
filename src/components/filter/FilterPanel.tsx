"use client";

import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Filter } from "lucide-react";
import { FilterPanelProps } from "@/types";
import SearchFilter from "./SearchFilter";
import LocationTypeFilter from "./LocationTypeFilter";
import PicketStatusFilter from "./PicketStatusFilter";
import CityFilter from "./CityFilter";

export default function FilterPanel({
  filterState,
  onFilterChange,
  availableLocationTypes,
  availableCities,
  availableAddresses,
  totalLocationsCount,
  filteredLocationsCount,
  isExpanded,
  onToggleExpanded,
}: FilterPanelProps) {
  const handleLocationTypeToggle = useCallback((locationType: string, e?: React.ChangeEvent<HTMLInputElement>) => {
    e?.stopPropagation();
    const newTypes = filterState.locationTypes.includes(locationType)
      ? filterState.locationTypes.filter(type => type !== locationType)
      : [...filterState.locationTypes, locationType];
    
    onFilterChange({ locationTypes: newTypes });
  }, [filterState.locationTypes, onFilterChange]);

  const handleCityChange = useCallback((city: string) => {
    onFilterChange({ city });
  }, [onFilterChange]);

  const handlePicketStatusChange = useCallback((status: 'all' | 'picketed' | 'not-picketed', e?: React.ChangeEvent<HTMLInputElement>) => {
    e?.stopPropagation();
    onFilterChange({ picketStatus: status });
  }, [onFilterChange]);

  const handleSearchChange = useCallback((query: string) => {
    onFilterChange({ searchQuery: query });
  }, [onFilterChange]);

  const clearAllFilters = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onFilterChange({
      locationTypes: [],
      city: '',
      picketStatus: 'all',
      searchQuery: '',
    });
  };

  const selectAllLocationTypes = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onFilterChange({ locationTypes: availableLocationTypes });
  };

  const clearLocationTypes = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    onFilterChange({ locationTypes: [] });
  };


  const hasActiveFilters = 
    filterState.locationTypes.length > 0 ||
    filterState.city !== '' ||
    filterState.picketStatus !== 'all' ||
    filterState.searchQuery.trim() !== '';

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div className="w-full">
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => onToggleExpanded(!isExpanded)}
            className="flex items-center space-x-2 hover:no-underline flex-1 text-left"
          >
            <Filter className="w-4 h-4 text-bcgeu-blue-600" />
            <span className="text-sm font-semibold text-bcgeu-blue-700">
              Filters
            </span>
            {hasActiveFilters && (
              <span className="bg-bcgeu-gold-600 text-white text-xs px-2 py-1 rounded-full">
                {filteredLocationsCount} of {totalLocationsCount}
              </span>
            )}
            <ChevronDown 
              className={`h-4 w-4 shrink-0 transition-transform duration-200 ml-auto ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {hasActiveFilters && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                clearAllFilters();
              }}
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-gray-600 hover:text-red-600 ml-2"
            >
              Clear All
            </Button>
          )}
        </div>
        {isExpanded && (
          <div className="pt-2">
            <div 
              className="space-y-4" 
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
            >
              <LocationTypeFilter
                availableTypes={availableLocationTypes}
                selectedTypes={filterState.locationTypes}
                onTypeToggle={handleLocationTypeToggle}
                onSelectAll={selectAllLocationTypes}
                onClearAll={clearLocationTypes}
              />
              <PicketStatusFilter
                selectedStatus={filterState.picketStatus}
                onStatusChange={handlePicketStatusChange}
              />
              <CityFilter
                availableCities={availableCities}
                selectedCity={filterState.city}
                onCityChange={handleCityChange}
              />
              <SearchFilter
                searchQuery={filterState.searchQuery}
                onSearchChange={handleSearchChange}
                availableAddresses={availableAddresses}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
