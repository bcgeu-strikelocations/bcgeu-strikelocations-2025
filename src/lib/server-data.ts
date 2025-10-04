import { readFile } from 'fs/promises';
import { join } from 'path';

export async function fetchLocations(): Promise<GeoJSON.FeatureCollection> {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'strike_locations_generated.geojson');
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading locations:', error);
    throw new Error('Failed to load locations');
  }
}

export async function fetchBufferData(): Promise<GeoJSON.FeatureCollection> {
  try {
    const filePath = join(process.cwd(), 'public', 'data', 'strike_locations_30k_generated.geojson');
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading buffer data:', error);
    throw new Error('Failed to load buffer data');
  }
}
