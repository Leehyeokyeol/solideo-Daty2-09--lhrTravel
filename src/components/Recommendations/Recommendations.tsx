import { useState, useEffect } from 'react';
import { Sparkles, MapPin } from 'lucide-react';
import { useTravelStore } from '../../store/useTravelStore';
import { searchNearbyPlaces } from '../../services/kakaoMaps';
import { RecommendationCard } from './RecommendationCard';
import { PreferencesSelector } from './PreferencesSelector';

export function Recommendations() {
  const { tripDetails, preferences, recommendations, setRecommendations } =
    useTravelStore();
  const { destination } = tripDetails;

  const [selectedCategory, setSelectedCategory] = useState<string>('tourist_attraction');
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    { id: 'tourist_attraction', name: '관광지', icon: '🏛️', types: 'AT4' },
    { id: 'restaurant', name: '맛집', icon: '🍽️', types: 'FD6' },
    { id: 'cafe', name: '카페', icon: '☕', types: 'CE7' },
    { id: 'shopping', name: '쇼핑', icon: '🛍️', types: 'MT1' },
    { id: 'culture', name: '문화', icon: '🎭', types: 'CT1' },
  ];

  // Search for recommendations when destination or category changes
  useEffect(() => {
    if (!destination) {
      setRecommendations([]);
      return;
    }

    const searchRecommendations = async () => {
      setIsSearching(true);
      try {
        const category = categories.find((c) => c.id === selectedCategory);
        if (!category) return;

        const results = await searchNearbyPlaces(
          destination.location,
          5000, // 5km radius
          category.types
        );

        // Filter by preferences
        const filtered = results.filter((place) => {
          // Filter by rating
          if (place.rating && place.rating < 3.5) return false;

          // Filter by preferences
          if (selectedCategory === 'culture' && !preferences.culture) return false;
          if (selectedCategory === 'nature' && !preferences.nature) return false;
          if (selectedCategory === 'restaurant' && !preferences.food) return false;
          if (selectedCategory === 'shopping' && !preferences.shopping) return false;

          return true;
        });

        // Sort by rating and reviews
        filtered.sort((a, b) => {
          const aScore = (a.rating || 0) * Math.log10((a.user_ratings_total || 0) + 1);
          const bScore = (b.rating || 0) * Math.log10((b.user_ratings_total || 0) + 1);
          return bScore - aScore;
        });

        setRecommendations(filtered.slice(0, 12)); // Top 12 results
      } catch (error) {
        console.error('Failed to search recommendations:', error);
      } finally {
        setIsSearching(false);
      }
    };

    searchRecommendations();
  }, [destination, selectedCategory, preferences, setRecommendations]);

  if (!destination) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            도착지를 선택하면 맞춤 추천을 받을 수 있습니다
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles size={24} className="text-primary-500" />
        <h3 className="text-xl font-bold text-gray-900">맞춤 추천</h3>
      </div>

      {/* Preferences Selector */}
      <PreferencesSelector />

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">추천 장소를 찾는 중...</p>
        </div>
      )}

      {/* Recommendations Grid */}
      {!isSearching && recommendations.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.place_id}
              recommendation={recommendation}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isSearching && recommendations.length === 0 && (
        <div className="text-center py-12">
          <Sparkles size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            해당 카테고리에서 추천할 장소를 찾지 못했습니다
          </p>
          <p className="text-sm text-gray-400 mt-2">
            다른 카테고리를 선택해보세요
          </p>
        </div>
      )}
    </div>
  );
}
