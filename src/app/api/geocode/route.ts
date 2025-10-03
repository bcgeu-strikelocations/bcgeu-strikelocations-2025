import { NextRequest, NextResponse } from 'next/server';
import { PostalCodeLocation, GeocoderResponse } from '@/types';

const GEOCODER_CONFIG = {
  authCode: process.env.GEONAMES_AUTH_CODE,
  baseUrl: 'https://geocoder.ca/'
};

export async function POST(request: NextRequest) {
  try {
    const { postalCode } = await request.json();
    
    if (!postalCode) {
      return NextResponse.json(
        { error: 'Postal code is required' },
        { status: 400 }
      );
    }

    const location = await geocodePostalCode(postalCode);
    return NextResponse.json(location);
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Geocoding failed' },
      { status: 500 }
    );
  }
}

async function geocodePostalCode(postalCode: string): Promise<PostalCodeLocation> {
  // Clean and format the postal code
  const cleanPostalCode = postalCode.replace(/\s+/g, '').toUpperCase();
  
  // Validate Canadian postal code format
  const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
  if (!postalCodeRegex.test(cleanPostalCode)) {
    throw new Error('Invalid Canadian postal code format. Please use format like V6B 1A1');
  }

  // Add space for proper formatting in search
  const formattedPostalCode = cleanPostalCode.replace(/([A-Z]\d[A-Z])(\d[A-Z]\d)/, '$1 $2');
  
  try {
    const apiUrl = `${GEOCODER_CONFIG.baseUrl}?locate=${encodeURIComponent(formattedPostalCode)}&json=1&auth=${encodeURIComponent(GEOCODER_CONFIG.authCode)}`;
    
    const response = await fetch(apiUrl);
    
    if (response.ok) {
      const data: GeocoderResponse = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'API error occurred');
      }
      
      if (data.latt && data.longt) {
        const city = data.standard?.city || data.city || '';
        const prov = data.standard?.prov || data.prov || '';
        const locationParts = [formattedPostalCode];
        if (city) locationParts.push(city);
        if (prov) locationParts.push(prov);
        
        return {
          lat: parseFloat(data.latt),
          lng: parseFloat(data.longt),
          displayName: locationParts.join(', '),
          postalCode: formattedPostalCode,
          geocoder_data: data
        };
      }
    }
  } catch (error) {
    console.log('Geocoder.ca API failed:', error);
    if (error instanceof Error && error.message.includes('Request Throttled')) {
      console.warn('Geocoder.ca API is throttled. Consider adding an authentication code.');
    }
  }
  
  throw new Error('Postal code not found. Please check the postal code and try again.');
}
