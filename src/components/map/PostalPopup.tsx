import { PostalCodeLocation } from '@/types';

interface PostalPopupProps {
  location: PostalCodeLocation;
}

export default function PostalPopup({ location }: PostalPopupProps) {
  const data = location.geocoder_data;
  
  return (
    <div className="min-w-[200px]">
      <div className="font-bold text-bcgeu-blue-600 mb-2">📍 {location.postalCode}</div>
      {data && (
        <div className="space-y-1">
          <div><strong>City:</strong> {data.standard?.city || data.city || 'N/A'}</div>
          <div><strong>Province:</strong> {data.standard?.prov || data.prov || 'N/A'}</div>
        </div>
      )}
    </div>
  );
}
