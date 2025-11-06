import { format, formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * Format date to Korean locale string
 */
export function formatDate(date: Date, formatStr: string = 'PPP'): string {
  return format(date, formatStr, { locale: ko });
}

/**
 * Format time to Korean locale string
 */
export function formatTime(date: Date): string {
  return format(date, 'p', { locale: ko });
}

/**
 * Format date and time
 */
export function formatDateTime(date: Date): string {
  return format(date, 'PPP p', { locale: ko });
}

/**
 * Format distance in meters to readable string
 */
export function formatDistanceMeters(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Format duration in seconds to readable string
 */
export function formatDurationSeconds(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }
  return `${minutes}분`;
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
  return formatDistance(date, new Date(), {
    addSuffix: true,
    locale: ko,
  });
}

/**
 * Format price level to won symbol
 */
export function formatPriceLevel(priceLevel?: number): string {
  if (!priceLevel) return '정보 없음';
  return '₩'.repeat(priceLevel);
}

/**
 * Format rating with star
 */
export function formatRating(rating?: number): string {
  if (!rating) return '평점 없음';
  return `⭐ ${rating.toFixed(1)}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}
