import { AlertCircle, X } from 'lucide-react';
import { useTravelStore } from '../../store/useTravelStore';

export function ErrorMessage() {
  const { error, setError } = useTravelStore();

  if (!error) return null;

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md animate-slide-in">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div className="flex-1">
            <h3 className="font-semibold text-red-800">오류 발생</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={() => setError(null)}
            className="text-red-500 hover:text-red-700 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
