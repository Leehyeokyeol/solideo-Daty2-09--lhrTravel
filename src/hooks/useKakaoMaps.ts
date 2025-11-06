import { useState, useEffect, useCallback, useRef } from 'react';
import { loadKakaoMaps } from '../services/kakaoMaps';

interface UseKakaoMapsOptions {
  center?: { lat: number; lng: number };
  level?: number;
}

const IS_DEMO_MODE = !import.meta.env.VITE_KAKAO_API_KEY || !import.meta.env.VITE_KAKAO_REST_API_KEY;

export function useKakaoMaps(
  mapRef: React.RefObject<HTMLDivElement>,
  options: UseKakaoMapsOptions = {}
) {
  const [map, setMap] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<any[]>([]);
  const polylinesRef = useRef<any[]>([]);

  const { center = { lat: 37.5665, lng: 126.9780 }, level = 3 } = options; // Default: Seoul

  // Initialize map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        await loadKakaoMaps();

        if (!mapRef.current || !isMounted) return;

        // 데모 모드: 더미 지도 객체 생성
        if (IS_DEMO_MODE) {
          console.log('🎭 데모 모드: 가상 지도 사용');
          setMap({ isDemoMode: true });
          setIsLoaded(true);
          return;
        }

        if (!window.kakao) return;

        const mapCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
        const mapInstance = new window.kakao.maps.Map(mapRef.current, {
          center: mapCenter,
          level: level,
        });

        setMap(mapInstance);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to initialize map:', err);
        setError('지도를 불러오는데 실패했습니다.');
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [mapRef, center.lat, center.lng, level]);

  // Add marker
  const addMarker = useCallback(
    (position: { lat: number; lng: number }, options?: any) => {
      if (!map) return null;
      if (IS_DEMO_MODE) {
        console.log('🎭 데모 모드: 마커 추가', position);
        return { isDemoMarker: true, position };
      }
      if (!window.kakao) return null;

      const markerPosition = new window.kakao.maps.LatLng(position.lat, position.lng);

      let markerImage = null;
      if (options?.icon) {
        const imageSize = new window.kakao.maps.Size(
          options.icon.scale * 2,
          options.icon.scale * 2
        );
        markerImage = new window.kakao.maps.MarkerImage(
          options.icon.url || createMarkerSVG(options.icon.fillColor),
          imageSize
        );
      }

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        map: map,
        image: markerImage,
      });

      markersRef.current.push(marker);
      return marker;
    },
    [map]
  );

  // Clear all markers
  const clearMarkers = useCallback(() => {
    if (IS_DEMO_MODE) {
      console.log('🎭 데모 모드: 마커 초기화');
      markersRef.current = [];
      return;
    }
    markersRef.current.forEach((marker) => marker.setMap?.(null));
    markersRef.current = [];
  }, []);

  // Show polyline on map
  const showPolyline = useCallback(
    (path: { lat: number; lng: number }[], options?: any) => {
      if (!map) return;
      if (IS_DEMO_MODE) {
        console.log('🎭 데모 모드: 경로선 표시', path.length, '포인트');
        return;
      }
      if (!window.kakao) return;

      clearPolylines();

      const linePath = path.map(
        (point) => new window.kakao.maps.LatLng(point.lat, point.lng)
      );

      const polyline = new window.kakao.maps.Polyline({
        path: linePath,
        strokeWeight: options?.strokeWeight || 5,
        strokeColor: options?.strokeColor || '#0ea5e9',
        strokeOpacity: options?.strokeOpacity || 0.8,
        strokeStyle: 'solid',
      });

      polyline.setMap(map);
      polylinesRef.current.push(polyline);
    },
    [map]
  );

  // Clear polylines
  const clearPolylines = useCallback(() => {
    if (IS_DEMO_MODE) {
      polylinesRef.current = [];
      return;
    }
    polylinesRef.current.forEach((polyline) => polyline.setMap?.(null));
    polylinesRef.current = [];
  }, []);

  // Pan to location
  const panTo = useCallback(
    (location: { lat: number; lng: number }) => {
      if (!map) return;
      if (IS_DEMO_MODE) return;
      if (!window.kakao) return;
      const moveLatLon = new window.kakao.maps.LatLng(location.lat, location.lng);
      map.panTo(moveLatLon);
    },
    [map]
  );

  // Fit bounds to show all markers
  const fitBounds = useCallback(
    (locations: { lat: number; lng: number }[]) => {
      if (!map || locations.length === 0) return;
      if (IS_DEMO_MODE) return;
      if (!window.kakao) return;

      const bounds = new window.kakao.maps.LatLngBounds();
      locations.forEach((location) => {
        const point = new window.kakao.maps.LatLng(location.lat, location.lng);
        bounds.extend(point);
      });
      map.setBounds(bounds);
    },
    [map]
  );

  // Set level (zoom)
  const setLevel = useCallback(
    (newLevel: number) => {
      if (!map) return;
      if (IS_DEMO_MODE) return;
      map.setLevel?.(newLevel);
    },
    [map]
  );

  return {
    map,
    isLoaded,
    error,
    addMarker,
    clearMarkers,
    showPolyline,
    clearPolylines,
    panTo,
    fitBounds,
    setLevel,
  };
}

// Helper function to create marker SVG data URL
function createMarkerSVG(color: string = '#ea4335'): string {
  const svg = `
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" fill="${color}" stroke="white" stroke-width="3"/>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
