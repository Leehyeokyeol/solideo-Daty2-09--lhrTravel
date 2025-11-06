import { useRef, useEffect } from 'react';
import { useKakaoMaps } from '../../hooks/useKakaoMaps';
import { useTravelStore } from '../../store/useTravelStore';
import { getDirections } from '../../services/kakaoMaps';
import { TransportMode } from '../../types';

export function KakaoMapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const {
    map,
    isLoaded,
    error,
    addMarker,
    clearMarkers,
    showPolyline,
    fitBounds,
  } = useKakaoMaps(mapRef);

  const { tripDetails, setCurrentRoute, setError: setStoreError } = useTravelStore();
  const { origin, destination, transportMode } = tripDetails;

  // Update markers when origin/destination changes
  useEffect(() => {
    if (!isLoaded || !map) return;

    clearMarkers();

    const locations: { lat: number; lng: number }[] = [];

    // Add origin marker (녹색)
    if (origin) {
      addMarker(
        { lat: origin.location.lat, lng: origin.location.lng },
        {
          icon: {
            url: createCustomMarker('출발', '#22c55e'),
            scale: 20,
            fillColor: '#22c55e',
          },
        }
      );
      locations.push({ lat: origin.location.lat, lng: origin.location.lng });
    }

    // Add destination marker (빨간색)
    if (destination) {
      addMarker(
        { lat: destination.location.lat, lng: destination.location.lng },
        {
          icon: {
            url: createCustomMarker('도착', '#ef4444'),
            scale: 20,
            fillColor: '#ef4444',
          },
        }
      );
      locations.push({ lat: destination.location.lat, lng: destination.location.lng });
    }

    // Fit bounds to show both markers
    if (locations.length > 0) {
      fitBounds(locations);
    }
  }, [origin, destination, isLoaded, map, addMarker, clearMarkers, fitBounds]);

  // Get and display directions when origin and destination are set
  useEffect(() => {
    if (!origin || !destination || !isLoaded) return;

    const fetchDirections = async () => {
      try {
        setStoreError(null);

        // Convert transport mode
        let kakaoMode: 'car' | 'transit' | 'walk';
        switch (transportMode) {
          case TransportMode.DRIVING:
            kakaoMode = 'car';
            break;
          case TransportMode.WALKING:
          case TransportMode.BICYCLING:
            kakaoMode = 'walk';
            break;
          case TransportMode.TRANSIT:
          default:
            kakaoMode = 'transit';
            break;
        }

        const result = await getDirections(
          origin.location,
          destination.location,
          kakaoMode
        );

        if (result.routes && result.routes.length > 0) {
          const route = result.routes[0];
          const summary = route.summary;

          // Create route object
          setCurrentRoute({
            legs: [],
            overview_polyline: '',
            summary: route.summary?.origin?.name || '추천 경로',
            warnings: [],
            distance: `${(summary.distance / 1000).toFixed(1)}km`,
            duration: `${Math.round(summary.duration / 60)}분`,
            steps: route.sections?.map((section: any, idx: number) => ({
              instruction: section.roads?.[0]?.name || `구간 ${idx + 1}`,
              distance: `${(section.distance / 1000).toFixed(1)}km`,
              duration: `${Math.round(section.duration / 60)}분`,
              travelMode: transportMode,
            })) || [],
          });

          // Draw polyline on map
          if (route.sections) {
            const path: { lat: number; lng: number }[] = [];
            // 시작점과 끝점만 연결 (상세 경로 데이터가 없을 경우)
            path.push(origin.location);
            path.push(destination.location);
            showPolyline(path);
          }
        }
      } catch (err) {
        console.error('Failed to get directions:', err);
        setStoreError('경로를 찾을 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    fetchDirections();
  }, [
    origin,
    destination,
    transportMode,
    isLoaded,
    showPolyline,
    setCurrentRoute,
    setStoreError,
  ]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-6">
          <p className="text-red-500 font-semibold mb-2">지도 로딩 실패</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">지도를 불러오는 중...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to create custom marker
function createCustomMarker(text: string, color: string): string {
  const svg = `
    <svg width="50" height="60" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="25" cy="25" r="20" fill="${color}" stroke="white" stroke-width="3"/>
        <text x="25" y="30" font-size="12" font-weight="bold" fill="white" text-anchor="middle">${text}</text>
      </g>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
