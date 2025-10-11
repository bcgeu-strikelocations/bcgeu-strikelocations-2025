export const ICON_CONFIG = {
  strike: { 
    color: '#ffd700', // Gold - flag color
    size: 20,
    icon: 'Flag',
    bgColor: '#0065a4', // BCGEU blue - background
    borderColor: '#004066' // BCGEU blue-800 - border
  },
  noPicket: { 
    color: '#ff7800', // Orange flag
    size: 20,
    icon: 'Flag',
    bgColor: '#0065a4', // BCGEU blue - background
    borderColor: '#004066' // BCGEU blue-800 - border
  },
  user: { 
    color: '#0065a4', 
    size: 24,
    icon: 'User',
    bgColor: '#eff6ff',
    borderColor: '#bfdbfe'
  },
  postal: { 
    color: '#ffd700', 
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

// Helper functions for consistent icon usage across components
export const getUserLocationIcon = () => ICON_CONFIG.user;
export const getPostalSearchIcon = () => ICON_CONFIG.postal;
export const getRadiusIcon = () => ICON_CONFIG.radius;

// Get Lucide React icon name for location type (for popup display)
export const getLocationIconName = (locationType: string): string => {
  switch (locationType) {
    case 'BC Cannabis Store':
      return 'Cannabis';
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

// Get hex color value for location type icons (for popup display)
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

