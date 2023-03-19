export interface Coordinate {
  latitude: number;
  longitude: number;
}

/**
 * Calculates the distance between two geographic coordinates using the Haversine formula.
 * @param from - The starting coordinate.
 * @param to - The ending coordinate.
 * @returns The distance between the two coordinates in kilometers.
 */
const getDistanceBetweenCoordinates = (
  from: Coordinate,
  to: Coordinate
): number => {
  if (from.latitude === to.latitude && from.longitude === to.longitude) {
    return 0;
  }

  // Convert degrees to radians
  const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

  const fromLatitudeRadian = toRadians(from.latitude);
  const toLatitudeRadian = toRadians(to.latitude);
  const latitudeDifference = toRadians(to.latitude - from.latitude);
  const longitudeDifference = toRadians(to.longitude - from.longitude);

  // Haversine formula
  const a =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(fromLatitudeRadian) *
      Math.cos(toLatitudeRadian) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Earth's radius in kilometers (6,371 km)
  const earthRadius = 6371;
  const distance = earthRadius * c;

  return distance;
};

export default getDistanceBetweenCoordinates;
