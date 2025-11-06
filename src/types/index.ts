// Location and Place Types
export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  name: string;
  address: string;
  location: Location;
  placeId: string;
  types?: string[];
}

// Travel Preferences
export interface TravelPreferences {
  culture: boolean;
  nature: boolean;
  food: boolean;
  shopping: boolean;
  adventure: boolean;
  relaxation: boolean;
}

// Transportation Types
export enum TransportMode {
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  WALKING = 'WALKING',
  BICYCLING = 'BICYCLING',
}

export interface TransitDetails {
  line: string;
  departureTime: string;
  arrivalTime: string;
  numStops: number;
  vehicle: {
    name: string;
    type: 'BUS' | 'TRAIN' | 'SUBWAY' | 'FERRY' | 'CABLE_CAR' | 'GONDOLA' | 'FUNICULAR' | 'HEAVY_RAIL' | 'HIGH_SPEED_TRAIN';
    icon?: string;
  };
}

export interface RouteStep {
  instruction: string;
  distance: string;
  duration: string;
  travelMode: TransportMode;
  transitDetails?: TransitDetails;
}

export interface Route {
  legs: any[];
  overview_polyline: string;
  summary: string;
  warnings: string[];
  distance: string;
  duration: string;
  steps: RouteStep[];
}

// Trip Planning
export interface TripDetails {
  origin: Place | null;
  destination: Place | null;
  departureTime: Date | null;
  travelDuration: number; // days
  transportMode: TransportMode;
}

// Recommendations
export interface Recommendation {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  types: string[];
  geometry: {
    location: Location;
  };
  photos?: Array<{
    photo_reference: string;
    height: number;
    width: number;
  }>;
  opening_hours?: {
    open_now: boolean;
  };
  price_level?: number;
}

export interface RecommendationCategory {
  id: string;
  name: string;
  icon: string;
  types: string[];
}

// Map State
export interface MapMarker {
  id: string;
  position: Location;
  title: string;
  type: 'origin' | 'destination' | 'recommendation' | 'waypoint';
  data?: Recommendation;
}

// App State
export interface AppState {
  // Trip Planning
  tripDetails: TripDetails;
  setOrigin: (place: Place | null) => void;
  setDestination: (place: Place | null) => void;
  setDepartureTime: (time: Date | null) => void;
  setTravelDuration: (days: number) => void;
  setTransportMode: (mode: TransportMode) => void;

  // Routes
  currentRoute: Route | null;
  setCurrentRoute: (route: Route | null) => void;

  // Recommendations
  recommendations: Recommendation[];
  setRecommendations: (recommendations: Recommendation[]) => void;

  // User Preferences
  preferences: TravelPreferences;
  setPreferences: (preferences: Partial<TravelPreferences>) => void;

  // Map
  markers: MapMarker[];
  addMarker: (marker: MapMarker) => void;
  removeMarker: (id: string) => void;
  clearMarkers: () => void;

  // UI State
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

// API Response Types
export interface PlaceSearchResult {
  predictions: Array<{
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
    types: string[];
  }>;
  status: string;
}

export interface DirectionsResult {
  routes: any[];
  status: string;
}

export interface PlacesNearbyResult {
  results: Recommendation[];
  status: string;
  next_page_token?: string;
}
