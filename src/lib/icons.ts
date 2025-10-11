'use client';

import L from 'leaflet';

export const ICON_CONFIG = {
  strike: { 
    color: '#FFD700', // Gold
    size: 20,
    icon: 'Flag',
    bgColor: '#0065a4', // BCGEU blue
    borderColor: '#004066' // BCGEU blue-800
  },
  noPicket: { 
    color: '#ff7800', // Orange flag
    size: 20,
    icon: 'Flag',
    bgColor: '#0065a4', // BCGEU blue
    borderColor: '#004066' // BCGEU blue-800
  },
  user: { 
    color: '#0065a4', 
    size: 24,
    icon: 'User',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe'
  },
  postal: { 
    color: '#FFD700', 
    size: 22,
    icon: 'Search',
    bgColor: '#fefce8',
    borderColor: '#fde047'
  },
  radius: {
    color: '#dc2626',
    size: 16,
    icon: 'Circle',
    bgColor: '#fef2f2',
    borderColor: '#fecaca'
  }
} as const;

// Create SVG icon for markers
const createSVGIcon = (type: keyof typeof ICON_CONFIG) => {
  const config = ICON_CONFIG[type];
  const { color, size, icon, bgColor, borderColor } = config;
  
  // Map icon names to actual SVG paths (matching Lucide React icons exactly)
  const iconPaths: Record<string, string> = {
    Flag: 'M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7',
    MapPin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z',
    User: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z',
    Search: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
    Circle: 'M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z',
    Users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
    Monitor: 'M18 3H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z M8 21h8 M12 17v4'
  };

  const svgPath = iconPaths[icon] || iconPaths.MapPin;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${bgColor}; 
        width: ${size}px; 
        height: ${size}px; 
        border-radius: 50%; 
        border: 2px solid ${borderColor}; 
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <svg width="${size * 0.6}" height="${size * 0.6}" viewBox="0 0 24 24" fill="${color}" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="${svgPath}"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
};

export const createIcon = (type: keyof typeof ICON_CONFIG) => {
  return createSVGIcon(type);
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
      return 'Leaf';
    case 'BC Liquor Store':
      return 'Wine';
    case 'Office':
      return 'Building2';
    case 'CVSE':
      return 'Truck';
    case 'Warehouse':
      return 'Package';
    case 'Service BC':
      return 'Users';
    case 'Front Desk BC':
      return 'Monitor';
    default:
      return 'MapPin';
  }
};

export const getLocationIconColor = (locationType: string): string => {
  switch (locationType) {
    case 'BC Cannabis Store':
      return '#059669'; // location-cannabis
    case 'BC Liquor Store':
      return '#dc2626'; // location-liquor
    case 'Office':
      return '#374151'; // location-office
    case 'CVSE':
      return '#ea580c'; // location-cvse
    case 'Warehouse':
      return '#92400e'; // location-warehouse
    case 'Service BC':
      return '#7c3aed'; // purple-600
    case 'Front Desk BC':
      return '#0891b2'; // cyan-600
    default:
      return '#6b7280'; // gray-600
  }
};


// Helper functions for consistent icon usage across components
export const getUserLocationIcon = () => ICON_CONFIG.user;
export const getPostalSearchIcon = () => ICON_CONFIG.postal;
export const getRadiusIcon = () => ICON_CONFIG.radius;
