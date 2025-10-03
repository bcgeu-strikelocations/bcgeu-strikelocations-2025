import L from 'leaflet';

export const ICON_CONFIG = {
  strike: { color: '#db1e2a', size: 16 },
  noPicket: { color: '#ff7800', size: 16 },
  user: { color: '#0065a4', size: 20 },
  postal: { color: '#b8a967', size: 18 },
} as const;

export const createIcon = (type: keyof typeof ICON_CONFIG) => {
  const config = ICON_CONFIG[type];
  const { color, size } = config;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="background-color: ${color}; width: ${size}px; height: ${size}px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

// Get icon type based on location type and picket status
export const getLocationIconType = (isPicketLine: boolean): keyof typeof ICON_CONFIG => {
  if (isPicketLine) return 'strike';
  return 'noPicket';
};

// Get Lucide React icon name for location type (for popup display)
export const getLocationIconName = (locationType: string): string => {
  switch (locationType) {
    case 'BC Cannabis Store':
      return 'Cannabis';
    case 'BC Liquor Store':
      return 'Wine';
    case 'Office':
      return 'Building';
    case 'CVSE':
      return 'Truck';
    default:
      return 'MapPin';
  }
};

export type IconType = keyof typeof ICON_CONFIG;
