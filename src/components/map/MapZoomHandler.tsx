import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { UserLocation, PostalCodeLocation } from '@/types';

interface MapZoomHandlerProps {
  userLocation?: UserLocation;
  postalLocation?: PostalCodeLocation;
}

export default function MapZoomHandler({ 
  userLocation, 
  postalLocation 
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
    if (postalLocation) {
      map.flyTo([postalLocation.lat, postalLocation.lng], 15, {
        animate: false,
        duration: 1.5
      });
    }
  }, [postalLocation, map]);

  return null;
}
