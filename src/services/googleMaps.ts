import { Loader } from '@googlemaps/js-api-loader';
import { Place, Location, Recommendation } from '../types';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Initialize Google Maps Loader
const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places', 'geometry', 'marker'],
});

let googleMapsLoaded = false;
let autocompleteService: google.maps.places.AutocompleteService | null = null;
let placesService: google.maps.places.PlacesService | null = null;
let directionsService: google.maps.DirectionsService | null = null;
let geocoder: google.maps.Geocoder | null = null;

/**
 * Load Google Maps API
 */
export async function loadGoogleMaps(): Promise<void> {
  if (googleMapsLoaded) return;

  try {
    await loader.load();
    googleMapsLoaded = true;

    // Initialize services
    autocompleteService = new google.maps.places.AutocompleteService();
    directionsService = new google.maps.DirectionsService();
    geocoder = new google.maps.Geocoder();

    console.log('Google Maps API loaded successfully');
  } catch (error) {
    console.error('Error loading Google Maps API:', error);
    throw new Error('Failed to load Google Maps API');
  }
}

/**
 * Initialize PlacesService with a map element
 */
export function initializePlacesService(map: google.maps.Map): void {
  placesService = new google.maps.places.PlacesService(map);
}

/**
 * Search for places with autocomplete
 */
export async function searchPlaces(input: string): Promise<google.maps.places.AutocompletePrediction[]> {
  if (!autocompleteService) {
    throw new Error('AutocompleteService not initialized');
  }

  return new Promise((resolve, reject) => {
    autocompleteService!.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'kr' }, // Focus on Korea, can be removed for global
      },
      (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
          resolve(predictions);
        } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
        } else {
          reject(new Error(`Place search failed: ${status}`));
        }
      }
    );
  });
}

/**
 * Get place details by place ID
 */
export async function getPlaceDetails(placeId: string): Promise<Place> {
  if (!placesService) {
    throw new Error('PlacesService not initialized');
  }

  return new Promise((resolve, reject) => {
    placesService!.getDetails(
      {
        placeId,
        fields: ['place_id', 'name', 'formatted_address', 'geometry', 'types'],
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const location = place.geometry?.location;
          if (!location) {
            reject(new Error('Place has no location'));
            return;
          }

          resolve({
            id: place.place_id || placeId,
            name: place.name || '',
            address: place.formatted_address || '',
            location: {
              lat: location.lat(),
              lng: location.lng(),
            },
            placeId: place.place_id || placeId,
            types: place.types,
          });
        } else {
          reject(new Error(`Failed to get place details: ${status}`));
        }
      }
    );
  });
}

/**
 * Get directions between two points
 */
export async function getDirections(
  origin: Location,
  destination: Location,
  travelMode: google.maps.TravelMode = google.maps.TravelMode.TRANSIT,
  departureTime?: Date
): Promise<google.maps.DirectionsResult> {
  if (!directionsService) {
    throw new Error('DirectionsService not initialized');
  }

  const request: google.maps.DirectionsRequest = {
    origin: new google.maps.LatLng(origin.lat, origin.lng),
    destination: new google.maps.LatLng(destination.lat, destination.lng),
    travelMode,
    transitOptions: departureTime
      ? {
          departureTime,
        }
      : undefined,
    provideRouteAlternatives: true,
  };

  return new Promise((resolve, reject) => {
    directionsService!.route(request, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        resolve(result);
      } else {
        reject(new Error(`Directions request failed: ${status}`));
      }
    });
  });
}

/**
 * Search for nearby places
 */
export async function searchNearbyPlaces(
  location: Location,
  radius: number,
  types: string[]
): Promise<Recommendation[]> {
  if (!placesService) {
    throw new Error('PlacesService not initialized');
  }

  return new Promise((resolve, reject) => {
    const request: google.maps.places.PlaceSearchRequest = {
      location: new google.maps.LatLng(location.lat, location.lng),
      radius,
      type: types[0], // PlacesService accepts single type
    };

    placesService!.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const recommendations: Recommendation[] = results.map((place) => ({
          place_id: place.place_id || '',
          name: place.name || '',
          vicinity: place.vicinity || '',
          rating: place.rating,
          user_ratings_total: place.user_ratings_total,
          types: place.types || [],
          geometry: {
            location: {
              lat: place.geometry!.location!.lat(),
              lng: place.geometry!.location!.lng(),
            },
          },
          photos: place.photos?.map((photo) => ({
            photo_reference: photo.getUrl({ maxWidth: 400 }),
            height: photo.height,
            width: photo.width,
          })),
          opening_hours: place.opening_hours
            ? {
                open_now: place.opening_hours.isOpen?.() || false,
              }
            : undefined,
          price_level: place.price_level,
        }));

        resolve(recommendations);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Nearby search failed: ${status}`));
      }
    });
  });
}

/**
 * Geocode an address to coordinates
 */
export async function geocodeAddress(address: string): Promise<Location> {
  if (!geocoder) {
    throw new Error('Geocoder not initialized');
  }

  return new Promise((resolve, reject) => {
    geocoder!.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(from: Location, to: Location): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((to.lat - from.lat) * Math.PI) / 180;
  const dLon = ((to.lng - from.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Get photo URL from photo reference
 */
export function getPhotoUrl(photoReference: string, maxWidth: number = 400): string {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photo_reference=${photoReference}&key=${API_KEY}`;
}
