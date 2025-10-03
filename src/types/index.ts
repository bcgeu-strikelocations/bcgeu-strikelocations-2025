export interface StrikeLocation {
  city: string;
  address: string;
  coordinates: [number, number]; // [longitude, latitude]
  hours_details?: string;
  is_picket_line: boolean;
  location_type: string;
}

export interface LocationsData {
  locations: StrikeLocation[];
}

export interface GeocoderResponse {
  latt: string;
  longt: string;
  standard?: {
    city: string;
    prov: string;
  };
  city?: string;
  prov?: string;
  error?: {
    message: string;
  };
}

export interface PostalCodeLocation {
  lat: number;
  lng: number;
  displayName: string;
  postalCode: string;
  geocoder_data?: GeocoderResponse;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number; // accuracy in meters
}

export interface MapMarker {
  id: string;
  position: [number, number];
  type: 'strike' | 'no-picket' | 'user' | 'postal';
  data?: StrikeLocation | PostalCodeLocation;
}

export interface MapState {
  center: [number, number];
  zoom: number;
  userLocation?: [number, number];
  nearestStrike?: {
    distance: number;
    location: StrikeLocation;
  };
}

export interface MapProps {
  locationsGeoJSON: GeoJSON.FeatureCollection | null;
  userLocation?: UserLocation;
  postalLocations: PostalCodeLocation[];
  onLocationClick?: (location: StrikeLocation) => void;
  onNearestStrikeFound?: (nearestStrike: { distance: number; location: StrikeLocation } | undefined) => void;
}


export interface InfoPanelProps {
  locationsCount: number;
  nearestStrike?: {
    distance: number;
    location: StrikeLocation;
  };
  onUserLocationChange?: (userLocation: UserLocation | undefined) => void;
  onPostalLocationsChange?: (postalLocations: PostalCodeLocation[]) => void;
}
