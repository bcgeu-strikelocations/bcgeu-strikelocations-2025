import { PostalCodeLocation } from '@/types';
import { MapPin } from 'lucide-react';

interface PostalPopupProps {
  location: PostalCodeLocation;
}

export default function PostalPopup({ location }: PostalPopupProps) {
  const data = location.geocoder_data;
  
  return (
    <div className="min-w-[200px]">
      <div className="font-bold text-bcgeu-blue-600 mb-2 flex items-center gap-2">
        <MapPin size={16} color="#b8a967" />
        {location.postalCode}
      </div>
      {data && (
        <div className="space-y-1">
          <div><strong>City:</strong> {data.standard?.city || data.city || 'N/A'}</div>
          <div><strong>Province:</strong> {data.standard?.prov || data.prov || 'N/A'}</div>
        </div>
      )}
    </div>
  );
}
