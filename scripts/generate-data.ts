import { readFile, writeFile } from 'fs/promises';
import { buffer } from '@turf/buffer';
import { dissolve } from '@turf/dissolve';
import { StrikeLocation } from '../src/types';

interface GeoJSONFeature {
  type: 'Feature';
  properties: StrikeLocation;
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

interface GeoJSONCollection {
  type: 'FeatureCollection';
  name: string;
  features: GeoJSONFeature[];
}

async function generateLocationsLayer(): Promise<void> {
  console.log('Generating locations GeoJSON...');
  
  const data = JSON.parse(await readFile('./src/data/locations.json', 'utf-8'));
  
  const geoJson: GeoJSONCollection = {
    type: 'FeatureCollection',
    name: 'Strike Locations',
    features: data.locations.map((strikeLocation: StrikeLocation) => ({
      type: 'Feature',
      properties: {
        ...strikeLocation
      },
      geometry: {
        type: 'Point',
        coordinates: strikeLocation.coordinates
      }
    }))
  };

  const fileContent = JSON.stringify(geoJson, null, 2);
  await writeFile('./public/data/strike_locations_generated.geojson', fileContent);
  
  console.log('✅ Generated strike_locations_generated.geojson');
}

async function generateBufferLayer(): Promise<void> {
  console.log('Generating 30km buffer GeoJSON...');
  
  const data = JSON.parse(await readFile('./public/data/strike_locations_generated.geojson', 'utf-8'));
  
  const picketedLocations = {
    ...data,
    features: data.features.filter((f: GeoJSONFeature) => f.properties.is_picket_line)
  };
  
  const bufferedLocations = buffer(picketedLocations, 30, { units: 'kilometres' });
  const dissolvedBuffers = bufferedLocations ? dissolve(bufferedLocations as any) : null;
  
  const fileContent = JSON.stringify(dissolvedBuffers, null, 2);
  await writeFile('./public/data/strike_locations_30k_generated.geojson', fileContent);
  
  console.log('✅ Generated strike_locations_30k_generated.geojson');
}

async function main() {
  try {
    // Ensure the data directory exists
    await writeFile('./public/data/.gitkeep', '');
    
    await generateLocationsLayer();
    await generateBufferLayer();
    
    console.log('🎉 All data generation completed successfully!');
  } catch (error) {
    console.error('❌ Error generating data:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { generateLocationsLayer, generateBufferLayer };
