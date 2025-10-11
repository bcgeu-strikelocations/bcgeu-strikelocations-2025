import { StrikeLocation, FilterState } from '@/types';

/**
 * Filters locations based on the provided filter state
 */
export function filterLocations(locations: StrikeLocation[], filters: FilterState): StrikeLocation[] {
  return locations.filter(location => {
    // Location type filter
    if (filters.locationTypes.length > 0 && !filters.locationTypes.includes(location.location_type)) {
      return false;
    }

    // City filter
    if (filters.city && filters.city !== location.city) {
      return false;
    }

    // Picket status filter
    if (filters.picketStatus === 'picketed' && !location.is_picket_line) {
      return false;
    }
    if (filters.picketStatus === 'not-picketed' && location.is_picket_line) {
      return false;
    }

    // Search query filter (address only)
    if (filters.searchQuery.trim()) {
      const query = filters.searchQuery.toLowerCase();
      if (!location.address.toLowerCase().includes(query)) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Extracts unique location types from locations array
 */
export function getUniqueLocationTypes(locations: StrikeLocation[]): string[] {
  const types = new Set(locations.map(location => location.location_type));
  return Array.from(types).sort();
}

/**
 * Extracts unique cities from locations array
 */
export function getUniqueCities(locations: StrikeLocation[]): string[] {
  const cities = new Set(locations.map(location => location.city));
  return Array.from(cities).sort();
}

/**
 * Extracts unique addresses from locations array
 */
export function getUniqueAddresses(locations: StrikeLocation[]): string[] {
  const addresses = new Set(locations.map(location => location.address));
  return Array.from(addresses).sort();
}

/**
 * Converts locations array to GeoJSON FeatureCollection
 */
export function locationsToGeoJSON(locations: StrikeLocation[]): GeoJSON.FeatureCollection {
  return {
    type: 'FeatureCollection',
    features: locations.map(location => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location.coordinates,
      },
      properties: {
        city: location.city,
        address: location.address,
        coordinates: location.coordinates,
        hours_details: location.hours_details,
        is_picket_line: location.is_picket_line,
        location_type: location.location_type,
      },
    })),
  };
}
