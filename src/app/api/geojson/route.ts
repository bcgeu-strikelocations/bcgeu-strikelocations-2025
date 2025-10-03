import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    
    if (!type || !['locations', 'buffer'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type parameter. Must be "locations" or "buffer"' },
        { status: 400 }
      );
    }
    
    const fileName = type === 'locations' 
      ? 'strike_locations_generated.geojson'
      : 'strike_locations_30k_generated.geojson';
    
    const filePath = join(process.cwd(), 'public', 'data', fileName);
    const fileContent = await readFile(filePath, 'utf-8');
    const geoJson = JSON.parse(fileContent);
    
    return NextResponse.json(geoJson);
  } catch (error) {
    console.error('Error loading GeoJSON:', error);
    return NextResponse.json(
      { error: 'Failed to load GeoJSON data' },
      { status: 500 }
    );
  }
}
