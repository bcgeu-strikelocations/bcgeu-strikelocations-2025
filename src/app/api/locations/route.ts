import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET() {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'strike_locations_generated.geojson');
    const fileContent = await readFile(filePath, 'utf-8');
    const geoJson = JSON.parse(fileContent);
    
    // Return the raw GeoJSON data
    return NextResponse.json(geoJson);
  } catch (error) {
    console.error('Error loading locations:', error);
    return NextResponse.json(
      { error: 'Failed to load locations' },
      { status: 500 }
    );
  }
}
