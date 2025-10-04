'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { StrikeLocation, PostalCodeLocation, UserLocation } from '@/types';
import InfoPanel from '@/components/InfoPanel';

// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import('@/components/map').then(mod => ({ default: mod.Map })), { ssr: false });

interface MapClientProps {
  initialLocationsGeoJSON: GeoJSON.FeatureCollection;
  initialBufferData: GeoJSON.FeatureCollection;
}

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

  const handleUserLocationChange = useCallback((newUserLocation: UserLocation | undefined) => {
    setUserLocation(newUserLocation);
  }, []);

  const handlePostalLocationChange = useCallback((newPostalLocation: PostalCodeLocation | undefined) => {
    setPostalLocation(newPostalLocation);
  }, []);

  const handleNearestStrikeFound = useCallback((nearestStrike: { distance: number; location: StrikeLocation } | undefined) => {
    setNearestStrike(nearestStrike);
  }, []);

  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Map
        locationsGeoJSON={initialLocationsGeoJSON}
        bufferData={initialBufferData}
        userLocation={userLocation}
        postalLocation={postalLocation}
        onNearestStrikeFound={handleNearestStrikeFound}
      />
      
      <InfoPanel
        locationsCount={initialLocationsGeoJSON?.features.length || 0}
        nearestStrike={nearestStrike}
        onUserLocationChange={handleUserLocationChange}
        onPostalLocationChange={handlePostalLocationChange}
      />
    </div>
  );
}
