import { UserLocation } from '@/types';

interface UserPopupProps {
  userLocation: UserLocation;
}

export default function UserPopup({ userLocation }: UserPopupProps) {
  return (
    <div className="max-w-[250px]">
      <div className="font-bold text-bcgeu-blue-600 mb-2">Your Location</div>
      <div className="text-sm text-gray-600">
        <div><strong>Accuracy:</strong> ±{Math.round(userLocation.accuracy)}m</div>
        <div className="text-xs mt-1 text-gray-500">
          GPS accuracy may vary based on your device and surroundings
        </div>
      </div>
    </div>
  );
}
