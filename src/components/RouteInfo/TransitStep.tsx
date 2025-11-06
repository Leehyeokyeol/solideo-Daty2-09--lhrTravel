import { Bus, Train, Navigation, Footprints, Bike, Car } from 'lucide-react';
import { RouteStep, TransportMode } from '../../types';

interface TransitStepProps {
  step: RouteStep;
  stepNumber: number;
}

export function TransitStep({ step, stepNumber }: TransitStepProps) {
  const getIcon = () => {
    if (step.transitDetails) {
      const vehicleType = step.transitDetails.vehicle.type;
      if (
        vehicleType === 'BUS' ||
        vehicleType === 'HEAVY_RAIL' ||
        vehicleType === 'HIGH_SPEED_TRAIN'
      ) {
        return vehicleType === 'BUS' ? <Bus size={18} /> : <Train size={18} />;
      }
      return <Train size={18} />;
    }

    switch (step.travelMode) {
      case TransportMode.WALKING:
        return <Footprints size={18} />;
      case TransportMode.BICYCLING:
        return <Bike size={18} />;
      case TransportMode.DRIVING:
        return <Car size={18} />;
      default:
        return <Navigation size={18} />;
    }
  };

  const getVehicleTypeColor = () => {
    if (!step.transitDetails) return 'bg-gray-100 text-gray-700';

    const vehicleType = step.transitDetails.vehicle.type;
    switch (vehicleType) {
      case 'BUS':
        return 'bg-green-100 text-green-700';
      case 'SUBWAY':
        return 'bg-blue-100 text-blue-700';
      case 'TRAIN':
      case 'HEAVY_RAIL':
      case 'HIGH_SPEED_TRAIN':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
      {/* Step Number */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
          {stepNumber}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Transit Details */}
        {step.transitDetails ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${getVehicleTypeColor()}`}>
                {getIcon()}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">
                  {step.transitDetails.line}
                </p>
                <p className="text-sm text-gray-600">
                  {step.transitDetails.vehicle.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>출발: {step.transitDetails.departureTime}</span>
              <span>•</span>
              <span>도착: {step.transitDetails.arrivalTime}</span>
              <span>•</span>
              <span>{step.transitDetails.numStops} 정거장</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gray-200 text-gray-700 rounded-lg">
              {getIcon()}
            </div>
            <div className="flex-1">
              <p
                className="text-sm text-gray-800"
                dangerouslySetInnerHTML={{ __html: step.instruction }}
              />
            </div>
          </div>
        )}

        {/* Distance and Duration */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
          <span>{step.distance}</span>
          <span>•</span>
          <span>{step.duration}</span>
        </div>
      </div>
    </div>
  );
}
