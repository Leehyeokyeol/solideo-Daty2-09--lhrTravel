import { create } from 'zustand';
import { AppState, TransportMode } from '../types';

export const useTravelStore = create<AppState>((set) => ({
  // Initial Trip Details
  tripDetails: {
    origin: null,
    destination: null,
    departureTime: null,
    travelDuration: 1,
    transportMode: TransportMode.TRANSIT,
  },

  // Trip Planning Actions
  setOrigin: (place) =>
    set((state) => ({
      tripDetails: { ...state.tripDetails, origin: place },
    })),

  setDestination: (place) =>
    set((state) => ({
      tripDetails: { ...state.tripDetails, destination: place },
    })),

  setDepartureTime: (time) =>
    set((state) => ({
      tripDetails: { ...state.tripDetails, departureTime: time },
    })),

  setTravelDuration: (days) =>
    set((state) => ({
      tripDetails: { ...state.tripDetails, travelDuration: days },
    })),

  setTransportMode: (mode) =>
    set((state) => ({
      tripDetails: { ...state.tripDetails, transportMode: mode },
    })),

  // Routes
  currentRoute: null,
  setCurrentRoute: (route) => set({ currentRoute: route }),

  // Recommendations
  recommendations: [],
  setRecommendations: (recommendations) => set({ recommendations }),

  // User Preferences
  preferences: {
    culture: true,
    nature: true,
    food: true,
    shopping: false,
    adventure: false,
    relaxation: true,
  },
  setPreferences: (newPreferences) =>
    set((state) => ({
      preferences: { ...state.preferences, ...newPreferences },
    })),

  // Map Markers
  markers: [],
  addMarker: (marker) =>
    set((state) => ({
      markers: [...state.markers, marker],
    })),
  removeMarker: (id) =>
    set((state) => ({
      markers: state.markers.filter((m) => m.id !== id),
    })),
  clearMarkers: () => set({ markers: [] }),

  // UI State
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}));
