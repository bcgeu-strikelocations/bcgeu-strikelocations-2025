'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { StrikeLocation, PostalCodeLocation, UserLocation } from '@/types';
import InfoPanel from '@/components/InfoPanel';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/map').then(mod => ({ default: mod.Map })), { ssr: false });

export default function HomePage() {
  const [locationsGeoJSON, setLocationsGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [postalLocations, setPostalLocations] = useState<PostalCodeLocation[]>([]);
  const [userLocation, setUserLocation] = useState<UserLocation | undefined>();
  const [nearestStrike, setNearestStrike] = useState<{
    distance: number;
    location: StrikeLocation;
  } | undefined>();

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const geoJson = await response.json();
        setLocationsGeoJSON(geoJson);
      } catch (error) {
        console.error('Failed to load locations:', error);
      }
    };

    loadLocations();
  }, []);

  const handleUserLocationChange = useCallback((newUserLocation: UserLocation | undefined) => {
    setUserLocation(newUserLocation);
  }, []);

  const handlePostalLocationsChange = useCallback((newPostalLocations: PostalCodeLocation[]) => {
    setPostalLocations(newPostalLocations);
  }, []);

  const handleNearestStrikeFound = useCallback((nearestStrike: { distance: number; location: StrikeLocation } | undefined) => {
    setNearestStrike(nearestStrike);
  }, []);


  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Map
        locationsGeoJSON={locationsGeoJSON}
        userLocation={userLocation}
        postalLocations={postalLocations}
        onNearestStrikeFound={handleNearestStrikeFound}
      />
      
      <InfoPanel
        locationsCount={locationsGeoJSON?.features.length || 0}
        nearestStrike={nearestStrike}
        onUserLocationChange={handleUserLocationChange}
        onPostalLocationsChange={handlePostalLocationsChange}
      />
    </div>
  );
}
