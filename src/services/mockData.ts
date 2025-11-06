import { Place, Recommendation } from '../types';

/**
 * 더미 장소 데이터 (서울 주요 장소)
 */
export const MOCK_PLACES = [
  {
    id: '1',
    place_name: '서울역',
    address_name: '서울 용산구 한강대로 405',
    road_address_name: '서울 용산구 한강대로 405',
    x: '126.9707878',
    y: '37.5546788',
    category_name: '교통,수송 > 지하철,전철 > 수도권1호선',
    category_group_code: 'SW8'
  },
  {
    id: '2',
    place_name: '강남역',
    address_name: '서울 강남구 역삼동 825',
    road_address_name: '서울 강남구 강남대로 396',
    x: '127.0276194',
    y: '37.4979462',
    category_name: '교통,수송 > 지하철,전철 > 수도권2호선',
    category_group_code: 'SW8'
  },
  {
    id: '3',
    place_name: '명동',
    address_name: '서울 중구 명동2가',
    road_address_name: '서울 중구 명동길',
    x: '126.9849208',
    y: '37.5636682',
    category_name: '여행 > 관광,명소',
    category_group_code: 'AT4'
  },
  {
    id: '4',
    place_name: '경복궁',
    address_name: '서울 종로구 세종로 1-1',
    road_address_name: '서울 종로구 사직로 161',
    x: '126.9769927',
    y: '37.5788154',
    category_name: '여행 > 관광,명소 > 고궁',
    category_group_code: 'AT4'
  },
  {
    id: '5',
    place_name: '남산타워',
    address_name: '서울 용산구 용산동2가 1-3',
    road_address_name: '서울 용산구 남산공원길 105',
    x: '126.9882266',
    y: '37.5511694',
    category_name: '여행 > 관광,명소',
    category_group_code: 'AT4'
  },
  {
    id: '6',
    place_name: '홍대입구역',
    address_name: '서울 마포구 서교동 354-1',
    road_address_name: '서울 마포구 양화로 160',
    x: '126.9244129',
    y: '37.5579452',
    category_name: '교통,수송 > 지하철,전철',
    category_group_code: 'SW8'
  },
  {
    id: '7',
    place_name: '인천국제공항',
    address_name: '인천 중구 운서동 2850',
    road_address_name: '인천 중구 공항로 272',
    x: '126.4407004',
    y: '37.4602056',
    category_name: '교통,수송 > 공항',
    category_group_code: 'PO3'
  },
  {
    id: '8',
    place_name: '코엑스',
    address_name: '서울 강남구 삼성동 159',
    road_address_name: '서울 강남구 영동대로 513',
    x: '127.0595042',
    y: '37.5125329',
    category_name: '가정,생활 > 쇼핑,유통 > 백화점,쇼핑몰',
    category_group_code: 'MT1'
  }
];

/**
 * 더미 추천 장소 데이터
 */
export const MOCK_RECOMMENDATIONS: Record<string, Recommendation[]> = {
  // 관광지
  tourist_attraction: [
    {
      place_id: 'AT_001',
      name: '경복궁',
      vicinity: '서울 종로구 사직로 161',
      rating: 4.6,
      user_ratings_total: 45231,
      types: ['AT4'],
      geometry: { location: { lat: 37.5788154, lng: 126.9769927 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 1,
    },
    {
      place_id: 'AT_002',
      name: '남산서울타워',
      vicinity: '서울 용산구 남산공원길 105',
      rating: 4.5,
      user_ratings_total: 38472,
      types: ['AT4'],
      geometry: { location: { lat: 37.5511694, lng: 126.9882266 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 2,
    },
    {
      place_id: 'AT_003',
      name: '북촌한옥마을',
      vicinity: '서울 종로구 계동길 37',
      rating: 4.4,
      user_ratings_total: 28951,
      types: ['AT4'],
      geometry: { location: { lat: 37.5826868, lng: 126.9835468 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 0,
    },
    {
      place_id: 'AT_004',
      name: '창덕궁',
      vicinity: '서울 종로구 율곡로 99',
      rating: 4.7,
      user_ratings_total: 32145,
      types: ['AT4'],
      geometry: { location: { lat: 37.5794221, lng: 126.9910119 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 1,
    }
  ],

  // 맛집
  restaurant: [
    {
      place_id: 'FD_001',
      name: '광장시장',
      vicinity: '서울 종로구 창경궁로 88',
      rating: 4.5,
      user_ratings_total: 15632,
      types: ['FD6'],
      geometry: { location: { lat: 37.5701833, lng: 126.9998167 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 1,
    },
    {
      place_id: 'FD_002',
      name: '명동교자',
      vicinity: '서울 중구 명동10길 29',
      rating: 4.3,
      user_ratings_total: 9821,
      types: ['FD6'],
      geometry: { location: { lat: 37.5615095, lng: 126.9855904 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 2,
    },
    {
      place_id: 'FD_003',
      name: '진진',
      vicinity: '서울 중구 명동8나길 5',
      rating: 4.4,
      user_ratings_total: 8745,
      types: ['FD6'],
      geometry: { location: { lat: 37.5627436, lng: 126.9850685 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 2,
    }
  ],

  // 카페
  cafe: [
    {
      place_id: 'CE_001',
      name: '스타벅스 더종로R점',
      vicinity: '서울 종로구 종로 51',
      rating: 4.3,
      user_ratings_total: 1234,
      types: ['CE7'],
      geometry: { location: { lat: 37.5702297, lng: 126.9831702 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 2,
    },
    {
      place_id: 'CE_002',
      name: '카페 온지',
      vicinity: '서울 종로구 북촌로5길 5',
      rating: 4.6,
      user_ratings_total: 892,
      types: ['CE7'],
      geometry: { location: { lat: 37.5819458, lng: 126.9854812 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 2,
    }
  ],

  // 쇼핑
  shopping: [
    {
      place_id: 'MT_001',
      name: '명동 쇼핑거리',
      vicinity: '서울 중구 명동길',
      rating: 4.4,
      user_ratings_total: 25641,
      types: ['MT1'],
      geometry: { location: { lat: 37.5636682, lng: 126.9849208 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 3,
    },
    {
      place_id: 'MT_002',
      name: '롯데백화점 본점',
      vicinity: '서울 중구 소공로 81',
      rating: 4.2,
      user_ratings_total: 18234,
      types: ['MT1'],
      geometry: { location: { lat: 37.5650172, lng: 126.9813755 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 3,
    }
  ],

  // 문화
  culture: [
    {
      place_id: 'CT_001',
      name: '국립중앙박물관',
      vicinity: '서울 용산구 서빙고로 137',
      rating: 4.7,
      user_ratings_total: 42156,
      types: ['CT1'],
      geometry: { location: { lat: 37.5238757, lng: 126.9803098 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 0,
    },
    {
      place_id: 'CT_002',
      name: '서울시립미술관',
      vicinity: '서울 중구 덕수궁길 61',
      rating: 4.5,
      user_ratings_total: 8934,
      types: ['CT1'],
      geometry: { location: { lat: 37.5656913, lng: 126.9750724 } },
      photos: [{ photo_reference: '', height: 400, width: 600 }],
      opening_hours: { open_now: true },
      price_level: 0,
    }
  ]
};

/**
 * 더미 경로 데이터 생성
 */
export function createMockRoute(origin: Place, destination: Place) {
  const distance = Math.round(Math.random() * 15 + 5); // 5-20km
  const duration = Math.round(distance * 3 + Math.random() * 20); // 대략적인 소요 시간

  return {
    routes: [
      {
        summary: {
          distance: distance * 1000,
          duration: duration * 60,
        },
        sections: [
          {
            distance: distance * 1000,
            duration: duration * 60,
            roads: [
              {
                name: `${origin.name} → ${destination.name} 경로`,
                distance: distance * 1000,
                duration: duration * 60,
              },
            ],
          },
        ],
      },
    ],
  };
}
