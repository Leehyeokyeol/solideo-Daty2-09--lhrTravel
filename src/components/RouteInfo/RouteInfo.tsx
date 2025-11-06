import { Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useTravelStore } from '../../store/useTravelStore';
import { TransitStep } from './TransitStep';

export function RouteInfo() {
  const { currentRoute, tripDetails } = useTravelStore();
  const { origin, destination } = tripDetails;

  if (!currentRoute || !origin || !destination) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">경로 정보</h3>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-primary-600 mb-1">
            <TrendingUp size={18} />
            <span className="text-sm font-medium">총 거리</span>
          </div>
          <p className="text-2xl font-bold text-primary-900">{currentRoute.distance}</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-purple-600 mb-1">
            <Clock size={18} />
            <span className="text-sm font-medium">소요 시간</span>
          </div>
          <p className="text-2xl font-bold text-purple-900">{currentRoute.duration}</p>
        </div>
      </div>

      {/* Route Details */}
      {currentRoute.summary && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">
            <strong>경로:</strong> {currentRoute.summary}
          </p>
        </div>
      )}

      {/* Warnings */}
      {currentRoute.warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle size={18} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-800 mb-1">주의사항</p>
              {currentRoute.warnings.map((warning, index) => (
                <p key={index} className="text-sm text-yellow-700" dangerouslySetInnerHTML={{ __html: warning }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900">상세 경로</h4>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {currentRoute.steps.map((step, index) => (
            <TransitStep key={index} step={step} stepNumber={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
