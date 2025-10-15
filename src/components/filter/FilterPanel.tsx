"use client";

import { FilterPanelProps } from "@/types";
import FilterDropdown from "./FilterDropdown";

export default function FilterPanel({
  filterState,
  onFilterChange,
  availableLocationTypes,
  availableCities,
  availableAddresses,
  totalLocationsCount,
  filteredLocationsCount,
}: FilterPanelProps) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <FilterDropdown
        filterState={filterState}
        onFilterChange={onFilterChange}
        availableLocationTypes={availableLocationTypes}
        availableCities={availableCities}
        availableAddresses={availableAddresses}
        totalLocationsCount={totalLocationsCount}
        filteredLocationsCount={filteredLocationsCount}
      />
    </div>
  );
}
