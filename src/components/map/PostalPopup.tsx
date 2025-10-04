import { PostalCodeLocation } from '@/types';
import { Search, Building, Flag } from 'lucide-react';

interface PostalPopupProps {
  location: PostalCodeLocation;
}

export default function PostalPopup({ location }: PostalPopupProps) {
  const data = location.geocoder_data;
  
  return (
    <div className="min-w-[220px]">
      <div className="font-bold text-bcgeu-blue-600 mb-2 flex items-center gap-2">
        <Search size={16} className="text-bcgeu-gold-600" />
        {location.postalCode}
      </div>
      {data && (
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Building size={14} className="text-gray-500" />
            <span><strong>City:</strong> {data.standard?.city || data.city || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag size={14} className="text-gray-500" />
            <span><strong>Province:</strong> {data.standard?.prov || data.prov || 'N/A'}</span>
          </div>
        </div>
      )}
    </div>
  );
}
