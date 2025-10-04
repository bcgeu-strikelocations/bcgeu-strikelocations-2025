import { StrikeLocation } from '@/types';
import { getLocationIconName, getLocationIconColor } from '@/lib/icons';
import { Cannabis, Wine, Building, Truck, Warehouse, MapPin } from 'lucide-react';

// Icon mapping for Lucide React components
const iconComponents = {
  Cannabis,
  Wine,
  Building,
  Truck,
  Warehouse,
  MapPin
};

interface PopupContentProps {
  location: StrikeLocation;
}

export default function PopupContent({ location }: PopupContentProps) {
  const iconName = getLocationIconName(location.location_type);
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || MapPin;
  
  return (
    <div className="max-w-[250px]">
      <div className="font-bold text-bcgeu-blue-600 mb-1 flex items-center gap-2">
        <IconComponent size={16} color={getLocationIconColor(location.location_type)} />
        {location.address}
      </div>
      <div><strong>Type:</strong> {location.location_type}</div>
      <div><strong>City:</strong> {location.city}</div>
      {location.hours_details && (
        <div className="text-gray-600 text-xs mt-1">{location.hours_details}</div>
      )}
    </div>
  );
}
