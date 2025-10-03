import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { UserLocation, PostalCodeLocation } from '@/types';

interface MapZoomHandlerProps {
  userLocation?: UserLocation;
  postalLocations: PostalCodeLocation[];
}

export default function MapZoomHandler({ 
  userLocation, 
  postalLocations 
}: MapZoomHandlerProps) {
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 15, {
        animate: true,
        duration: 1.5
      });
    }
  }, [userLocation, map]);

  useEffect(() => {
    if (postalLocations.length > 0) {
      const latestPostalLocation = postalLocations[postalLocations.length - 1];
      map.flyTo([latestPostalLocation.lat, latestPostalLocation.lng], 15, {
        animate: false,
        duration: 1.5
      });
    }
  }, [postalLocations, map]);

  return null;
}
