'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { StrikeLocation, PostalCodeLocation, UserLocation, FilterState, MapClientProps } from '@/types';
import InfoPanel from '@/components/InfoPanel';
import { FilterPanel } from '@/components/filter';
import { filterLocations, getUniqueLocationTypes, getUniqueCities, getUniqueAddresses, locationsToGeoJSON } from '@/lib/filter-utils';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/map').then(mod => ({ default: mod.Map })), { ssr: false });

export default function MapClient({ 
  initialLocationsGeoJSON, 
  initialBufferData 
}: MapClientProps) {
  const [postalLocation, setPostalLocation] = useState<PostalCodeLocation | undefined>();
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();
  const [nearestStrike, setNearestStrike] = useState<{
    distance: number;
    location: StrikeLocation;
  } | undefined>();
  const [filterState, setFilterState] = useState<FilterState>({
    locationTypes: [],
    city: '',
    picketStatus: 'all',
    searchQuery: '',
  });
  const [isInfoPanelExpanded, setIsInfoPanelExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle mobile/desktop detection and set initial panel state
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 640; // Tailwind's 'sm' breakpoint
      setIsMobile(mobile);
      setIsInfoPanelExpanded(!mobile); // Desktop: expanded, Mobile: collapsed
    };

    // Initial check
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Extract locations from GeoJSON for filtering
  const allLocations = useMemo(() => {
    return initialLocationsGeoJSON.features.map(feature => {
      const props = feature.properties;
      if (!props) return null;
      return {
        city: props.city,
        address: props.address,
        coordinates: props.coordinates,
        hours_details: props.hours_details,
        is_picket_line: props.is_picket_line,
        location_type: props.location_type,
      } as StrikeLocation;
    }).filter(Boolean) as StrikeLocation[];
  }, [initialLocationsGeoJSON]);

  // Get unique values for filters
  const availableLocationTypes = useMemo(() => getUniqueLocationTypes(allLocations), [allLocations]);
  const availableCities = useMemo(() => getUniqueCities(allLocations), [allLocations]);
  const availableAddresses = useMemo(() => getUniqueAddresses(allLocations), [allLocations]);

  // Filter locations based on current filter state
  const filteredLocations = useMemo(() => {
    return filterLocations(allLocations, filterState);
  }, [allLocations, filterState]);

  // Convert filtered locations back to GeoJSON
  const filteredLocationsGeoJSON = useMemo(() => {
    return locationsToGeoJSON(filteredLocations);
  }, [filteredLocations]);

  const handleUserLocationChange = useCallback((newUserLocation: UserLocation | undefined) => {
    setUserLocation(newUserLocation);
  }, []);

  const handlePostalLocationChange = useCallback((newPostalLocation: PostalCodeLocation | undefined) => {
    setPostalLocation(newPostalLocation);
  }, []);

  const handleNearestStrikeFound = useCallback((nearestStrike: { distance: number; location: StrikeLocation } | undefined) => {
    setNearestStrike(nearestStrike);
  }, []);

  const handleFilterChange = useCallback((filters: Partial<FilterState>) => {
    setFilterState(prev => ({ ...prev, ...filters }));
  }, []);

  const handleMapClick = useCallback(() => {
    // Only close InfoPanel on mobile devices
    if (isMobile) {
      setIsInfoPanelExpanded(false);
    }
  }, [isMobile]);

  const filterPanel = useMemo(() => (
    <FilterPanel
      filterState={filterState}
      onFilterChange={handleFilterChange}
      availableLocationTypes={availableLocationTypes}
      availableCities={availableCities}
      availableAddresses={availableAddresses}
      totalLocationsCount={allLocations.length}
      filteredLocationsCount={filteredLocations.length}
    />
  ), [
    filterState,
    handleFilterChange,
    availableLocationTypes,
    availableCities,
    availableAddresses,
    allLocations.length,
    filteredLocations.length
  ]);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Map
        locationsGeoJSON={filteredLocationsGeoJSON}
        bufferData={initialBufferData}
        userLocation={userLocation}
        postalLocation={postalLocation}
        onNearestStrikeFound={handleNearestStrikeFound}
        onMapClick={handleMapClick}
      />
      
      <InfoPanel
        locationsCount={filteredLocations.length}
        nearestStrike={nearestStrike}
        onUserLocationChange={handleUserLocationChange}
        onPostalLocationChange={handlePostalLocationChange}
        filterPanel={filterPanel}
        isInfoPanelExpanded={isInfoPanelExpanded}
        onInfoPanelToggle={setIsInfoPanelExpanded}
      />
    </div>
  );
}
