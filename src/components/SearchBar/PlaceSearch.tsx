import { useState, useEffect } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { searchPlaces, getPlaceDetails } from '../../services/googleMaps';
import { useDebounce } from '../../hooks/useDebounce';
import { Place } from '../../types';

interface PlaceSearchProps {
  label: string;
  placeholder: string;
  value: Place | null;
  onChange: (place: Place | null) => void;
  icon?: React.ReactNode;
}

export function PlaceSearch({
  label,
  placeholder,
  value,
  onChange,
  icon,
}: PlaceSearchProps) {
  const [input, setInput] = useState('');
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const debouncedInput = useDebounce(input, 300);

  // Search for places when input changes
  useEffect(() => {
    if (!debouncedInput || debouncedInput.length < 2) {
      setPredictions([]);
      return;
    }

    const search = async () => {
      setIsLoading(true);
      try {
        const results = await searchPlaces(debouncedInput);
        setPredictions(results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Search failed:', error);
        setPredictions([]);
      } finally {
        setIsLoading(false);
      }
    };

    search();
  }, [debouncedInput]);

  // Handle place selection
  const handleSelect = async (prediction: google.maps.places.AutocompletePrediction) => {
    setIsLoading(true);
    setShowDropdown(false);

    try {
      const place = await getPlaceDetails(prediction.place_id);
      onChange(place);
      setInput(place.name);
    } catch (error) {
      console.error('Failed to get place details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Clear selection
  const handleClear = () => {
    setInput('');
    onChange(null);
    setPredictions([]);
    setShowDropdown(false);
  };

  // Update input when value changes externally
  useEffect(() => {
    if (value) {
      setInput(value.name);
    } else {
      setInput('');
    }
  }, [value]);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon || <MapPin size={20} />}
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (!e.target.value) {
              onChange(null);
            }
          }}
          onFocus={() => {
            if (predictions.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
        />
        {(input || isLoading) && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <X size={20} />
            )}
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && predictions.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {predictions.map((prediction) => (
              <button
                key={prediction.place_id}
                onClick={() => handleSelect(prediction)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-start gap-3 border-b border-gray-100 last:border-b-0"
              >
                <MapPin size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    {prediction.structured_formatting.main_text}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {prediction.structured_formatting.secondary_text}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
