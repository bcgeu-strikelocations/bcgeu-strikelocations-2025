# Data Generation Scripts

This directory contains scripts for generating GeoJSON data files from the location data.

## Scripts

### `generate-data.ts`

Main data generation script that:

- Converts the locations JSON data to GeoJSON format
- Generates 30km buffer zones around picketed locations
- Outputs the generated files to `public/data/`
- Uses centralized TypeScript types from `src/types/`

## Usage

```bash
# Generate all data files
npm run generate-data

# The script will automatically run before builds
npm run build
```

## Generated Files

- `public/data/strike_locations_generated.geojson` - Point features for all strike locations
- `public/data/strike_locations_30k_generated.geojson` - 30km buffer zones around picketed locations

## Dependencies

- `@turf/buffer` - For creating buffer zones around points
- `@turf/dissolve` - For merging overlapping buffer zones
- `tsx` - For running TypeScript files directly

## Data Flow

1. Reads `src/data/locations.json`
2. Converts to GeoJSON point features using `StrikeLocation` type
3. Filters picketed locations (`is_picket_line: true`)
4. Creates 30km buffers around picketed locations
5. Dissolves overlapping buffers for cleaner visualization
6. Saves both datasets as GeoJSON files

## Type Safety

The script uses TypeScript types from the centralized `src/types/index.ts` file:

- `StrikeLocation` interface for location data structure
- Proper type checking for GeoJSON feature properties
- Ensures data consistency between source and generated files
