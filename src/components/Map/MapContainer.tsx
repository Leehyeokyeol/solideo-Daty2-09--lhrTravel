import { useRef, useEffect } from 'react';
import { useGoogleMaps } from '../../hooks/useGoogleMaps';
import { useTravelStore } from '../../store/useTravelStore';
import { getDirections } from '../../services/googleMaps';
import { TransportMode } from '../../types';

export function MapContainer() {
  const mapRef = useRef<HTMLDivElement>(null);
  const {
    map,
    isLoaded,
    error,
    addMarker,
    clearMarkers,
    showDirections,
    fitBounds,
  } = useGoogleMaps(mapRef);

  const { tripDetails, setCurrentRoute, setError: setStoreError } = useTravelStore();
  const { origin, destination, transportMode, departureTime } = tripDetails;

  // Update markers when origin/destination changes
  useEffect(() => {
    if (!isLoaded || !map) return;

    clearMarkers();

    const locations: google.maps.LatLngLiteral[] = [];

    // Add origin marker
    if (origin) {
      addMarker(
        { lat: origin.location.lat, lng: origin.location.lng },
        {
          label: {
            text: 'A',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: '#22c55e',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 3,
          },
        }
      );
      locations.push({ lat: origin.location.lat, lng: origin.location.lng });
    }

    // Add destination marker
    if (destination) {
      addMarker(
        { lat: destination.location.lat, lng: destination.location.lng },
        {
          label: {
            text: 'B',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 20,
            fillColor: '#ef4444',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 3,
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
        let gmapsTravelMode: google.maps.TravelMode;
        switch (transportMode) {
          case TransportMode.DRIVING:
            gmapsTravelMode = google.maps.TravelMode.DRIVING;
            break;
          case TransportMode.WALKING:
            gmapsTravelMode = google.maps.TravelMode.WALKING;
            break;
          case TransportMode.BICYCLING:
            gmapsTravelMode = google.maps.TravelMode.BICYCLING;
            break;
          case TransportMode.TRANSIT:
          default:
            gmapsTravelMode = google.maps.TravelMode.TRANSIT;
            break;
        }

        const result = await getDirections(
          origin.location,
          destination.location,
          gmapsTravelMode,
          departureTime || undefined
        );

        if (result.routes.length > 0) {
          const route = result.routes[0];
          const leg = route.legs[0];

          // Create route object
          setCurrentRoute({
            legs: route.legs,
            overview_polyline: route.overview_polyline.toString(),
            summary: route.summary,
            warnings: route.warnings,
            distance: leg.distance?.text || '',
            duration: leg.duration?.text || '',
            steps: leg.steps.map((step) => ({
              instruction: step.instructions,
              distance: step.distance?.text || '',
              duration: step.duration?.text || '',
              travelMode: step.travel_mode as any,
              transitDetails: step.transit
                ? {
                    line: step.transit.line?.name || '',
                    departureTime: step.transit.departure_time?.text || '',
                    arrivalTime: step.transit.arrival_time?.text || '',
                    numStops: step.transit.num_stops || 0,
                    vehicle: {
                      name: step.transit.line?.vehicle?.name || '',
                      type: step.transit.line?.vehicle?.type as any,
                      icon: step.transit.line?.vehicle?.icon || '',
                    },
                  }
                : undefined,
            })),
          });

          // Show directions on map
          showDirections(result);
        }
      } catch (err) {
        console.error('Failed to get directions:', err);
        setStoreError('경로를 찾을 수 없습니다. 다른 경로를 시도해보세요.');
      }
    };

    fetchDirections();
  }, [
    origin,
    destination,
    transportMode,
    departureTime,
    isLoaded,
    showDirections,
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
