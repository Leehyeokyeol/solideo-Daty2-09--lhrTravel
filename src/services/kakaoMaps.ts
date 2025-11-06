import axios from 'axios';
import { Place, Location, Recommendation } from '../types';

const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY || '';
const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY || '';

let kakaoLoaded = false;

/**
 * Load Kakao Maps SDK
 */
export async function loadKakaoMaps(): Promise<void> {
  if (kakaoLoaded) return;

  return new Promise((resolve, reject) => {
    if (window.kakao && window.kakao.maps) {
      kakaoLoaded = true;
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        kakaoLoaded = true;
        console.log('Kakao Maps SDK loaded successfully');
        resolve();
      });
    };

    script.onerror = () => {
      reject(new Error('Failed to load Kakao Maps SDK'));
    };

    document.head.appendChild(script);
  });
}

/**
 * Search for places with keyword
 */
export async function searchPlaces(keyword: string): Promise<any[]> {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Maps not initialized');
  }

  return new Promise((resolve, reject) => {
    const ps = new window.kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        resolve([]);
      } else {
        reject(new Error('Place search failed'));
      }
    });
  });
}

/**
 * Get place details by place ID or name
 */
export async function getPlaceDetails(placeData: any): Promise<Place> {
  return {
    id: placeData.id || placeData.place_name,
    name: placeData.place_name,
    address: placeData.address_name || placeData.road_address_name,
    location: {
      lat: parseFloat(placeData.y),
      lng: parseFloat(placeData.x),
    },
    placeId: placeData.id,
    types: placeData.category_group_code ? [placeData.category_group_code] : [],
  };
}

/**
 * Get directions using Kakao Mobility API
 */
export async function getDirections(
  origin: Location,
  destination: Location,
  transportMode: 'car' | 'transit' | 'walk' = 'transit'
): Promise<any> {
  try {
    // Kakao Mobility API를 사용한 경로 탐색
    let url = '';
    const headers = {
      Authorization: `KakaoAK ${REST_API_KEY}`,
      'Content-Type': 'application/json',
    };

    if (transportMode === 'car') {
      // 자동차 경로
      url = 'https://apis-navi.kakaomobility.com/v1/directions';
      const response = await axios.get(url, {
        headers,
        params: {
          origin: `${origin.lng},${origin.lat}`,
          destination: `${destination.lng},${destination.lat}`,
          priority: 'RECOMMEND',
        },
      });
      return response.data;
    } else if (transportMode === 'transit') {
      // 대중교통 경로
      url = 'https://apis-navi.kakaomobility.com/v1/directions';
      // 대중교통은 별도 API 필요 - 여기서는 간단한 직선 경로 반환
      return createSimpleRoute(origin, destination);
    } else {
      // 도보 경로
      url = 'https://apis-navi.kakaomobility.com/v1/waypoints/directions';
      return createSimpleRoute(origin, destination);
    }
  } catch (error) {
    console.error('Direction request failed:', error);
    // 실패 시 간단한 직선 경로 반환
    return createSimpleRoute(origin, destination);
  }
}

/**
 * Create a simple direct route (fallback)
 */
function createSimpleRoute(origin: Location, destination: Location): any {
  const distance = calculateDistance(origin, destination);
  const duration = Math.round(distance * 20); // 약 3km/h 보행속도 가정

  return {
    routes: [
      {
        summary: {
          distance: Math.round(distance * 1000),
          duration: duration * 60,
        },
        sections: [
          {
            distance: Math.round(distance * 1000),
            duration: duration * 60,
            roads: [
              {
                name: '직선 경로',
                distance: Math.round(distance * 1000),
                duration: duration * 60,
              },
            ],
          },
        ],
      },
    ],
  };
}

/**
 * Search for nearby places using Kakao Local API
 */
export async function searchNearbyPlaces(
  location: Location,
  radius: number,
  category: string
): Promise<Recommendation[]> {
  try {
    const categoryCode = mapCategoryToKakaoCode(category);

    const response = await axios.get(
      'https://dapi.kakao.com/v2/local/search/category.json',
      {
        headers: {
          Authorization: `KakaoAK ${REST_API_KEY}`,
        },
        params: {
          category_group_code: categoryCode,
          x: location.lng,
          y: location.lat,
          radius: radius,
          sort: 'distance',
          size: 15,
        },
      }
    );

    return response.data.documents.map((place: any) => ({
      place_id: place.id,
      name: place.place_name,
      vicinity: place.address_name,
      rating: undefined, // Kakao API doesn't provide ratings directly
      user_ratings_total: undefined,
      types: place.category_group_code ? [place.category_group_code] : [],
      geometry: {
        location: {
          lat: parseFloat(place.y),
          lng: parseFloat(place.x),
        },
      },
      phone: place.phone,
      place_url: place.place_url,
      category_name: place.category_name,
    }));
  } catch (error) {
    console.error('Nearby search failed:', error);
    return [];
  }
}

/**
 * Map category to Kakao category code
 */
function mapCategoryToKakaoCode(category: string): string {
  const categoryMap: { [key: string]: string } = {
    tourist_attraction: 'AT4',
    restaurant: 'FD6',
    cafe: 'CE7',
    shopping: 'MT1',
    culture: 'CT1',
    park: 'AT4',
  };

  return categoryMap[category] || 'AT4';
}

/**
 * Geocode an address to coordinates
 */
export async function geocodeAddress(address: string): Promise<Location> {
  if (!window.kakao || !window.kakao.maps) {
    throw new Error('Kakao Maps not initialized');
  }

  return new Promise((resolve, reject) => {
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(address, (result: any[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve({
          lat: parseFloat(result[0].y),
          lng: parseFloat(result[0].x),
        });
      } else {
        reject(new Error('Geocoding failed'));
      }
    });
  });
}

/**
 * Calculate distance between two points (Haversine formula)
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
