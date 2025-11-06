import { MapPin, Star, Users, DollarSign, ExternalLink } from 'lucide-react';
import { Recommendation } from '../../types';
import { formatPriceLevel } from '../../utils/formatters';

interface RecommendationCardProps {
  recommendation: Recommendation;
}

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const {
    name,
    vicinity,
    rating,
    user_ratings_total,
    photos,
    opening_hours,
    price_level,
    place_id,
  } = recommendation;

  const photoUrl = photos?.[0]?.photo_reference;

  const handleClick = () => {
    // Open Google Maps in new tab
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}&query_place_id=${place_id}`,
      '_blank'
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer group"
    >
      {/* Image */}
      {photoUrl ? (
        <div className="relative h-48 overflow-hidden bg-gray-200">
          <img
            src={photoUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
          {opening_hours?.open_now !== undefined && (
            <div
              className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                opening_hours.open_now
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
              }`}
            >
              {opening_hours.open_now ? '영업 중' : '영업 종료'}
            </div>
          )}
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
          <MapPin size={48} className="text-primary-400" />
        </div>
      )}

      {/* Content */}
      <div className="p-4 space-y-2">
        <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600 transition">
          {name}
        </h4>

        <p className="text-sm text-gray-600 line-clamp-2 flex items-start gap-1">
          <MapPin size={14} className="flex-shrink-0 mt-0.5" />
          <span>{vicinity}</span>
        </p>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <Star size={16} fill="currentColor" />
              <span className="font-semibold text-gray-900">{rating.toFixed(1)}</span>
            </div>
            {user_ratings_total && (
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <Users size={14} />
                <span>{user_ratings_total.toLocaleString()}</span>
              </div>
            )}
          </div>
        )}

        {/* Price Level */}
        {price_level !== undefined && (
          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <DollarSign size={14} />
            <span>{formatPriceLevel(price_level)}</span>
          </div>
        )}

        {/* External Link */}
        <div className="pt-2 flex items-center justify-between text-sm">
          <span className="text-primary-600 font-medium group-hover:underline flex items-center gap-1">
            자세히 보기
            <ExternalLink size={14} />
          </span>
        </div>
      </div>
    </div>
  );
}
