"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Filter } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FilterDropdownProps, FilterAccordionProps } from "@/types";
import SearchFilter from "./SearchFilter";
import LocationTypeFilter from "./LocationTypeFilter";
import PicketStatusFilter from "./PicketStatusFilter";
import CityFilter from "./CityFilter";

function FilterAccordion({ title, isExpanded, onToggle, children, badge }: FilterAccordionProps) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition-colors rounded-lg"
      >
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-900">{title}</span>
          {badge && (
            <span className="bg-bcgeu-gold-600 text-white text-xs px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
        </div>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="px-3 pb-3 border-t border-gray-100">
          <div className="pt-3" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function FilterDropdown({
  filterState,
  onFilterChange,
  availableLocationTypes,
  availableCities,
  availableAddresses,
  totalLocationsCount,
  filteredLocationsCount,
}: FilterDropdownProps) {
  const [expandedSections, setExpandedSections] = useState({
    locationTypes: false,
    picketStatus: false,
    city: false,
    search: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between bg-white hover:bg-gray-50 border-bcgeu-blue-200 hover:border-bcgeu-blue-300 text-bcgeu-blue-700 font-medium py-2 px-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filters</span>
            {hasActiveFilters && (
              <span className="bg-bcgeu-gold-600 text-white text-xs px-2 py-1 rounded-full">
                {filteredLocationsCount} of {totalLocationsCount}
              </span>
            )}
          </div>
          <ChevronDown className="h-4 w-4 transition-transform duration-200" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[320px] bg-white border border-gray-200 rounded-lg shadow-lg z-[2000] max-h-[70vh] overflow-y-auto"
          sideOffset={8}
          align="start"
        >
          <div className="p-4 space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900">Filter Options</h3>
              {hasActiveFilters && (
                <Button
                  onClick={clearAllFilters}
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-gray-600 hover:text-red-600"
                >
                  Clear All
                </Button>
              )}
            </div>

            {/* Filter Accordions */}
            <div className="space-y-3">
              <FilterAccordion
                title="Location Types"
                isExpanded={expandedSections.locationTypes}
                onToggle={() => toggleSection('locationTypes')}
                badge={filterState.locationTypes.length > 0 ? filterState.locationTypes.length.toString() : undefined}
              >
                <LocationTypeFilter
                  availableTypes={availableLocationTypes}
                  selectedTypes={filterState.locationTypes}
                  onTypeToggle={handleLocationTypeToggle}
                  onSelectAll={selectAllLocationTypes}
                  onClearAll={clearLocationTypes}
                />
              </FilterAccordion>

              <FilterAccordion
                title="Picket Status"
                isExpanded={expandedSections.picketStatus}
                onToggle={() => toggleSection('picketStatus')}
                badge={filterState.picketStatus !== 'all' ? '1' : undefined}
              >
                <PicketStatusFilter
                  selectedStatus={filterState.picketStatus}
                  onStatusChange={handlePicketStatusChange}
                />
              </FilterAccordion>

              <FilterAccordion
                title="City"
                isExpanded={expandedSections.city}
                onToggle={() => toggleSection('city')}
                badge={filterState.city ? '1' : undefined}
              >
                <CityFilter
                  availableCities={availableCities}
                  selectedCity={filterState.city}
                  onCityChange={handleCityChange}
                />
              </FilterAccordion>

              <FilterAccordion
                title="Search Address"
                isExpanded={expandedSections.search}
                onToggle={() => toggleSection('search')}
                badge={filterState.searchQuery ? '1' : undefined}
              >
                <SearchFilter
                  searchQuery={filterState.searchQuery}
                  onSearchChange={handleSearchChange}
                  availableAddresses={availableAddresses}
                />
              </FilterAccordion>
            </div>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
