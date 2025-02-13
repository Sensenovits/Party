export interface Coordinates {
  latitude: number
  longitude: number
}

export function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(point2.latitude - point1.latitude)
  const dLon = toRad(point2.longitude - point1.longitude)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180)
}

export function formatDistance(distance: number): string {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`
  }
  return `${Math.round(distance)}km`
}

