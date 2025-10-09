import { StrikeLocation } from '@/types';
import { getLocationIconName, getLocationIconColor } from '@/lib/icon-config';
import { Cannabis, Wine, Building2, Truck, Package, MapPin, Info, MapPin as LocationIcon, Flag, Users, Monitor } from 'lucide-react';

// Icon mapping for Lucide React components
const iconComponents = {
  Cannabis,
  Wine,
  Building2,
  Truck,
  Package,
  MapPin,
  Users,
  Monitor
};

interface PopupContentProps {
  location: StrikeLocation;
}

export default function PopupContent({ location }: PopupContentProps) {
  const iconName = getLocationIconName(location.location_type);
  const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || MapPin;
  
  return (
    <div className="max-w-[280px]">
      {/* Header with strike status */}
      <div className="flex items-center gap-2 mb-2">
        {location.is_picket_line ? (
          <div className="flex items-center gap-1 bg-bcgeu-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            <Flag size={12} className="text-bcgeu-gold-600" fill="currentColor" />
            <span>PICKETED</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-bcgeu-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            <Flag size={12} className="text-orange-600" fill="currentColor" />
            <span>NOT PICKETED</span>
          </div>
        )}
      </div>

      {/* Address */}
      <div className="font-bold text-bcgeu-blue-600 mb-2 flex items-center gap-2">
        <div title={location.location_type} className="cursor-help">
          <IconComponent 
            size={16} 
            color={getLocationIconColor(location.location_type)} 
          />
        </div>
        {location.address}
      </div>

      {/* Details */}
      <div className="space-y-1 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <LocationIcon size={14} className="text-gray-500" />
          <span><strong>City:</strong> {location.city}</span>
        </div>
        {location.hours_details && (
          <div className="flex items-center gap-2 mt-2">
            <Info size={14} className="text-gray-500 mt-0.5 flex-shrink-0" />
            <div className="text-gray-600 text-xs bg-gray-50 p-2 rounded">
              {location.hours_details}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
