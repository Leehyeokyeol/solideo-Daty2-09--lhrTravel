import { useTravelStore } from '../../store/useTravelStore';

export function PreferencesSelector() {
  const { preferences, setPreferences } = useTravelStore();

  const preferenceOptions = [
    { key: 'culture', label: '문화', icon: '🎭', color: 'purple' },
    { key: 'nature', label: '자연', icon: '🌳', color: 'green' },
    { key: 'food', label: '음식', icon: '🍜', color: 'orange' },
    { key: 'shopping', label: '쇼핑', icon: '🛍️', color: 'pink' },
    { key: 'adventure', label: '모험', icon: '⛰️', color: 'red' },
    { key: 'relaxation', label: '휴식', icon: '🧘', color: 'blue' },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    if (isActive) {
      switch (color) {
        case 'purple':
          return 'bg-purple-500 text-white border-purple-600';
        case 'green':
          return 'bg-green-500 text-white border-green-600';
        case 'orange':
          return 'bg-orange-500 text-white border-orange-600';
        case 'pink':
          return 'bg-pink-500 text-white border-pink-600';
        case 'red':
          return 'bg-red-500 text-white border-red-600';
        case 'blue':
          return 'bg-blue-500 text-white border-blue-600';
        default:
          return 'bg-primary-500 text-white border-primary-600';
      }
    }
    return 'bg-white text-gray-700 border-gray-300 hover:border-gray-400';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        나의 여행 취향
      </label>
      <div className="flex flex-wrap gap-2">
        {preferenceOptions.map(({ key, label, icon, color }) => {
          const isActive = preferences[key as keyof typeof preferences];
          return (
            <button
              key={key}
              onClick={() =>
                setPreferences({ [key]: !isActive })
              }
              className={`px-4 py-2 rounded-lg border-2 font-medium transition ${getColorClasses(
                color,
                isActive
              )}`}
            >
              <span className="mr-1">{icon}</span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
