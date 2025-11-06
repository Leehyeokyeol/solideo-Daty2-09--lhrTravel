import { useRef, useEffect } from 'react';
import { useKakaoMaps } from '../../hooks/useKakaoMaps';
import { useTravelStore } from '../../store/useTravelStore';
import { getDirections } from '../../services/kakaoMaps';
import { TransportMode } from '../../types';
import { MapPin } from 'lucide-react';

const IS_DEMO_MODE = !import.meta.env.VITE_KAKAO_API_KEY || !import.meta.env.VITE_KAKAO_REST_API_KEY;

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
      {IS_DEMO_MODE ? (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-primary-50 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <div className="bg-white rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg">
              <MapPin size={40} className="text-primary-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">🎭 데모 모드</h3>
            <p className="text-gray-600 mb-4">
              Kakao API 키 없이 작동 중입니다. 더미 데이터로 모든 기능을 테스트할 수 있습니다!
            </p>
            <div className="bg-primary-100 border border-primary-200 rounded-lg p-4 text-left">
              <p className="text-sm text-primary-800 mb-2">
                <strong>사용 가능한 기능:</strong>
              </p>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>✅ 장소 검색 (서울역, 강남역, 명동 등)</li>
                <li>✅ 경로 탐색</li>
                <li>✅ 주변 장소 추천</li>
                <li>✅ 모든 UI 기능</li>
              </ul>
            </div>
            {origin && destination && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>{origin.name}</strong> → <strong>{destination.name}</strong>
                </p>
                <p className="text-xs text-green-600 mt-1">경로가 설정되었습니다</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          <div ref={mapRef} className="w-full h-full" />
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">지도를 불러오는 중...</p>
              </div>
            </div>
          )}
        </>
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
