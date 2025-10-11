import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { MapZoomHandlerProps } from '@/types';

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
