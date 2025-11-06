import { Header } from './components/Layout/Header';
import { ErrorMessage } from './components/Layout/ErrorMessage';
import { MapContainer } from './components/Map/MapContainer';
import { SearchBar } from './components/SearchBar/SearchBar';
import { RouteInfo } from './components/RouteInfo/RouteInfo';
import { Recommendations } from './components/Recommendations/Recommendations';
import { useTravelStore } from './store/useTravelStore';

function App() {
  const { tripDetails, currentRoute } = useTravelStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ErrorMessage />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column: Search and Map */}
          <div className="space-y-6">
            <SearchBar />
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[600px]">
              <MapContainer />
            </div>
          </div>

          {/* Right Column: Route Info and Recommendations */}
          <div className="space-y-6">
            {currentRoute && tripDetails.origin && tripDetails.destination && (
              <RouteInfo />
            )}
            <Recommendations />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              <strong>TravelMate</strong> - AI 기반 맞춤형 여행 플래너
            </p>
            <p className="text-xs text-gray-500">
              Powered by Google Maps API | 실시간 대중교통 연계 | 스마트 추천 시스템
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
