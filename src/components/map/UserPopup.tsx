import { UserLocation } from '@/types';
import { User, Navigation, MapPin } from 'lucide-react';

interface UserPopupProps {
  userLocation: UserLocation;
}

export default function UserPopup({ userLocation }: UserPopupProps) {
  return (
    <div className="max-w-[250px]">
      <div className="font-bold text-bcgeu-blue-600 mb-2 flex items-center gap-2">
        <User size={16} className="text-bcgeu-blue-600" />
        Your Location
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <div className="flex items-center gap-2">
          <Navigation size={14} className="text-gray-500" />
          <span><strong>Accuracy:</strong> ±{Math.round(userLocation.accuracy)}m</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-gray-500" />
          <span><strong>Coordinates:</strong> {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
        </div>
        <div className="text-xs mt-2 text-gray-500 bg-gray-50 p-2 rounded">
          GPS accuracy may vary based on your device and surroundings
        </div>
      </div>
    </div>
  );
}
