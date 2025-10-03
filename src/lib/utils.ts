import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function formatPostalCode(postalCode: string): string {
  const clean = postalCode.replace(/\s+/g, '').toUpperCase();
  if (clean.length > 3) {
    return clean.substring(0, 3) + ' ' + clean.substring(3, 6);
  }
  return clean;
}

export function validatePostalCode(postalCode: string): boolean {
  const clean = postalCode.replace(/\s+/g, '').toUpperCase();
  const postalCodeRegex = /^[A-Z]\d[A-Z]\d[A-Z]\d$/;
  return postalCodeRegex.test(clean);
}
