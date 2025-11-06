import { Map, Compass } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Compass size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">TravelMate</h1>
              <p className="text-sm text-primary-100">당신만의 여행 플래너</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Map size={18} />
              <span>스마트 경로 추천</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <span>🚌</span>
              <span>실시간 대중교통</span>
            </div>
            <div className="w-px h-6 bg-white/30" />
            <div className="flex items-center gap-2">
              <span>✨</span>
              <span>AI 추천</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
