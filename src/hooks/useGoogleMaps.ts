import { useState, useEffect, useCallback, useRef } from 'react';
import { loadGoogleMaps, initializePlacesService } from '../services/googleMaps';

interface UseGoogleMapsOptions {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
}

export function useGoogleMaps(
  mapRef: React.RefObject<HTMLDivElement>,
  options: UseGoogleMapsOptions = {}
) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);

  const { center = { lat: 37.5665, lng: 126.9780 }, zoom = 12 } = options; // Default: Seoul

  // Initialize map
  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      try {
        await loadGoogleMaps();

        if (!mapRef.current || !isMounted) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center,
          zoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }],
            },
          ],
        });

        // Initialize places service
        initializePlacesService(mapInstance);

        // Initialize directions renderer
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#0ea5e9',
            strokeWeight: 5,
            strokeOpacity: 0.8,
          },
        });

        setMap(mapInstance);
        setIsLoaded(true);
      } catch (err) {
        console.error('Failed to initialize map:', err);
        setError('지도를 불러오는데 실패했습니다. API 키를 확인해주세요.');
      }
    }

    initMap();

    return () => {
      isMounted = false;
    };
  }, [mapRef, center.lat, center.lng, zoom]);

  // Add marker
  const addMarker = useCallback(
    (position: google.maps.LatLngLiteral, options?: google.maps.MarkerOptions) => {
      if (!map) return null;

      const marker = new google.maps.Marker({
        position,
        map,
        ...options,
      });

      markersRef.current.push(marker);
      return marker;
    },
    [map]
  );

  // Clear all markers
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // Show directions on map
  const showDirections = useCallback(
    (directionsResult: google.maps.DirectionsResult) => {
      if (!directionsRendererRef.current) return;
      directionsRendererRef.current.setDirections(directionsResult);
    },
    []
  );

  // Clear directions
  const clearDirections = useCallback(() => {
    if (!directionsRendererRef.current) return;
    directionsRendererRef.current.setDirections({ routes: [] } as any);
  }, []);

  // Pan to location
  const panTo = useCallback(
    (location: google.maps.LatLngLiteral) => {
      if (!map) return;
      map.panTo(location);
    },
    [map]
  );

  // Fit bounds to show all markers
  const fitBounds = useCallback(
    (locations: google.maps.LatLngLiteral[]) => {
      if (!map || locations.length === 0) return;

      const bounds = new google.maps.LatLngBounds();
      locations.forEach((location) => bounds.extend(location));
      map.fitBounds(bounds);
    },
    [map]
  );

  // Set zoom
  const setZoom = useCallback(
    (newZoom: number) => {
      if (!map) return;
      map.setZoom(newZoom);
    },
    [map]
  );

  return {
    map,
    isLoaded,
    error,
    addMarker,
    clearMarkers,
    showDirections,
    clearDirections,
    panTo,
    fitBounds,
    setZoom,
  };
}
