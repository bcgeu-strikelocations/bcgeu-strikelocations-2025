import { fetchLocations, fetchBufferData } from '@/lib/server-data';
import MapClient from '@/components/MapClient';

export default async function HomePage() {
  // Pre-fetch data server-side for optimal performance
  const [locationsGeoJSON, bufferData] = await Promise.all([
    fetchLocations(),
    fetchBufferData()
  ]);

  return (
    <MapClient 
      initialLocationsGeoJSON={locationsGeoJSON}
      initialBufferData={bufferData}
    />
  );
}
