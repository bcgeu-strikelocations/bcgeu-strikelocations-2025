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
  bufferData?: GeoJSON.FeatureCollection | null;
  userLocation?: UserLocation;
  postalLocation?: PostalCodeLocation;
  onLocationClick?: (location: StrikeLocation) => void;
  onNearestStrikeFound?: (nearestStrike: { distance: number; location: StrikeLocation } | undefined) => void;
  onMapClick?: () => void;
}


export interface FilterState {
  locationTypes: string[];
  city: string;
  picketStatus: 'all' | 'picketed' | 'not-picketed';
  searchQuery: string;
}

export interface FilterPanelProps {
  filterState: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  availableLocationTypes: string[];
  availableCities: string[];
  availableAddresses: string[];
  totalLocationsCount: number;
  filteredLocationsCount: number;
  isExpanded: boolean;
  onToggleExpanded: (expanded: boolean) => void;
}

export interface InfoPanelProps {
  locationsCount: number;
  nearestStrike?: {
    distance: number;
    location: StrikeLocation;
  };
  onUserLocationChange?: (userLocation: UserLocation | undefined) => void;
  onPostalLocationChange?: (postalLocation: PostalCodeLocation | undefined) => void;
  filterPanel?: React.ReactNode;
  isFilterExpanded?: boolean;
  onFilterToggle?: (expanded: boolean) => void;
  isInfoPanelExpanded?: boolean;
  onInfoPanelToggle?: (expanded: boolean) => void;
}

// Map Client Props
export interface MapClientProps {
  initialLocationsGeoJSON: GeoJSON.FeatureCollection;
  initialBufferData: GeoJSON.FeatureCollection;
}

// Filter Component Props
export interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableAddresses: string[];
}

export interface CityFilterProps {
  availableCities: string[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export interface LocationTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeToggle: (type: string, e?: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectAll: (e?: React.MouseEvent) => void;
  onClearAll: (e?: React.MouseEvent) => void;
}

export interface PicketStatusFilterProps {
  selectedStatus: 'all' | 'picketed' | 'not-picketed';
  onStatusChange: (status: 'all' | 'picketed' | 'not-picketed', e?: React.ChangeEvent<HTMLInputElement>) => void;
}

// Map Component Props
export interface MarkerClusterGroupProps {
  markers: Array<{
    position: [number, number];
    location: StrikeLocation;
  }>;
  onLocationClick?: (location: StrikeLocation) => void;
  options?: Record<string, unknown>; // L.MarkerClusterGroupOptions not available in types
}

export interface PopupContentProps {
  location: StrikeLocation;
}

export interface PostalPopupProps {
  location: PostalCodeLocation;
}

export interface UserPopupProps {
  userLocation: UserLocation;
}

export interface MapZoomHandlerProps {
  userLocation?: UserLocation;
  postalLocation?: PostalCodeLocation;
}

// Component Props
export interface PostalCodeSearchProps {
  onPostalCodeFound: (location: PostalCodeLocation) => void;
  onError?: (error: string) => void;
}

export interface UserLocationButtonProps {
  onUserLocationChange?: (userLocation: UserLocation | undefined) => void;
}

// UI Component Props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

// Icon Types
export type IconType = 'strike' | 'noPicket' | 'user' | 'postal' | 'radius';
