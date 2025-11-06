import { MapPin, Navigation, Calendar, Clock } from 'lucide-react';
import { KakaoPlaceSearch } from './KakaoPlaceSearch';
import { useTravelStore } from '../../store/useTravelStore';
import { TransportMode } from '../../types';

export function SearchBar() {
  const {
    tripDetails,
    setOrigin,
    setDestination,
    setDepartureTime,
    setTravelDuration,
    setTransportMode,
  } = useTravelStore();

  const { origin, destination, departureTime, travelDuration, transportMode } = tripDetails;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">여행 계획 세우기</h2>

      {/* Origin and Destination */}
      <div className="grid md:grid-cols-2 gap-4">
        <KakaoPlaceSearch
          label="출발지"
          placeholder="출발 건물이나 주소를 입력하세요"
          value={origin}
          onChange={setOrigin}
          icon={<MapPin size={20} className="text-green-500" />}
        />
        <KakaoPlaceSearch
          label="도착지"
          placeholder="도착 건물이나 주소를 입력하세요"
          value={destination}
          onChange={setDestination}
          icon={<Navigation size={20} className="text-red-500" />}
        />
      </div>

      {/* Date and Duration */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar size={16} className="inline mr-1" />
            출발 날짜 및 시간
          </label>
          <input
            type="datetime-local"
            value={
              departureTime
                ? new Date(departureTime.getTime() - departureTime.getTimezoneOffset() * 60000)
                    .toISOString()
                    .slice(0, 16)
                : ''
            }
            onChange={(e) =>
              setDepartureTime(e.target.value ? new Date(e.target.value) : null)
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock size={16} className="inline mr-1" />
            여행 기간 (일)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={travelDuration}
            onChange={(e) => setTravelDuration(parseInt(e.target.value) || 1)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>

      {/* Transport Mode */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          교통 수단
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { mode: TransportMode.TRANSIT, label: '대중교통', icon: '🚌' },
            { mode: TransportMode.DRIVING, label: '자동차', icon: '🚗' },
            { mode: TransportMode.WALKING, label: '도보', icon: '🚶' },
            { mode: TransportMode.BICYCLING, label: '자전거', icon: '🚴' },
          ].map(({ mode, label, icon }) => (
            <button
              key={mode}
              onClick={() => setTransportMode(mode)}
              className={`px-4 py-3 rounded-lg font-medium transition ${
                transportMode === mode
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Info Box */}
      {origin && destination && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mt-4">
          <p className="text-sm text-primary-800">
            <strong>{origin.name}</strong>에서 <strong>{destination.name}</strong>까지의 경로를 찾고 있습니다...
          </p>
        </div>
      )}
    </div>
  );
}
