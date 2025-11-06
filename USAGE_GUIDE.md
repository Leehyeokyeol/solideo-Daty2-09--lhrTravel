# TravelMate 사용 가이드

## 목차
1. [빠른 시작](#빠른-시작)
2. [Google Maps API 설정](#google-maps-api-설정)
3. [주요 기능 사용법](#주요-기능-사용법)
4. [개발 가이드](#개발-가이드)
5. [배포 가이드](#배포-가이드)

---

## 빠른 시작

### 1. 저장소 클론 및 설치

```bash
# 저장소 클론
git clone <repository-url>
cd solideo-Daty2-09--lhrTravel

# 의존성 설치
npm install
```

### 2. 환경 변수 설정

```bash
# .env 파일 생성
cp .env.example .env
```

`.env` 파일을 열고 Google Maps API 키를 입력하세요:
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저가 자동으로 열리며 `http://localhost:3000`에서 앱을 확인할 수 있습니다.

---

## Google Maps API 설정

### API 키 발급

1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. **API 및 서비스 > 라이브러리** 메뉴로 이동
4. 다음 API들을 검색하여 활성화:
   - **Maps JavaScript API**
   - **Places API**
   - **Directions API**
   - **Geocoding API**

5. **API 및 서비스 > 사용자 인증 정보** 메뉴로 이동
6. **+ 사용자 인증 정보 만들기 > API 키** 클릭
7. 생성된 API 키를 복사

### API 키 제한 설정 (권장)

보안을 위해 API 키에 제한을 설정하세요:

1. 생성한 API 키 옆의 편집 버튼 클릭
2. **애플리케이션 제한사항** 섹션에서:
   - 개발 시: "없음" 선택
   - 프로덕션: "HTTP 리퍼러(웹사이트)" 선택 후 도메인 입력
3. **API 제한사항** 섹션에서:
   - "키 제한" 선택
   - 위에서 활성화한 4개 API만 선택

### 비용 관리

Google Maps API는 무료 할당량을 제공하지만, 초과 시 비용이 발생할 수 있습니다:

- Maps JavaScript API: 월 $200 무료 크레딧
- Places API: 매달 일정 요청 수 무료
- 자세한 내용: [Google Maps Platform 요금](https://cloud.google.com/maps-platform/pricing)

**권장사항:**
1. Google Cloud Console에서 예산 알림 설정
2. API 할당량 모니터링
3. 개발 환경에서는 API 요청 최소화

---

## 주요 기능 사용법

### 1. 여행 경로 검색

#### 출발지/도착지 입력
1. 상단 검색 바에서 **출발지** 입력
2. 자동완성 목록에서 원하는 위치 선택
3. **도착지** 입력 및 선택
4. 지도에 자동으로 마커가 표시됩니다

#### 출발 시간 설정
- 날짜/시간 입력 필드를 클릭하여 원하는 출발 시간 선택
- 대중교통 경로의 정확한 시간표를 확인할 수 있습니다

#### 여행 기간 설정
- 여행 기간(일수)을 입력하여 추천 범위를 조정

#### 교통 수단 선택
4가지 교통 수단 중 선택 가능:
- **🚌 대중교통**: 버스, 지하철, 기차 통합 경로
- **🚗 자동차**: 자동차 경로
- **🚶 도보**: 걸어서 가는 경로
- **🚴 자전거**: 자전거 경로

### 2. 경로 정보 확인

출발지와 도착지를 설정하면 우측에 상세 경로 정보가 표시됩니다:

- **총 거리**: 전체 이동 거리
- **소요 시간**: 예상 이동 시간
- **상세 경로**: 단계별 이동 방법
  - 대중교통 이용 시: 노선명, 출발/도착 시간, 정거장 수
  - 환승 정보 포함

### 3. 맞춤 추천 받기

#### 취향 설정
상단의 취향 버튼들을 클릭하여 선호도를 설정:
- 🎭 문화
- 🌳 자연
- 🍜 음식
- 🛍️ 쇼핑
- ⛰️ 모험
- 🧘 휴식

#### 카테고리별 추천
5가지 카테고리에서 추천 장소를 확인:
- **🏛️ 관광지**: 유명 관광 명소
- **🍽️ 맛집**: 레스토랑, 카페
- **🛍️ 쇼핑**: 쇼핑몰, 상점
- **🌳 자연**: 공원, 자연 경관
- **🎭 문화**: 박물관, 미술관, 극장

#### 추천 장소 상세 보기
- 각 장소 카드를 클릭하면 Google Maps에서 상세 정보 확인
- 평점, 리뷰 수, 가격대, 영업 시간 등 제공

---

## 개발 가이드

### 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Layout/         # 레이아웃 컴포넌트 (헤더, 에러 메시지)
│   ├── Map/            # 지도 컴포넌트
│   ├── SearchBar/      # 검색 기능
│   ├── RouteInfo/      # 경로 정보 표시
│   └── Recommendations/ # 추천 시스템
├── hooks/              # 커스텀 React Hooks
│   ├── useGoogleMaps.ts    # Google Maps 초기화 및 제어
│   └── useDebounce.ts      # 입력 디바운싱
├── services/           # API 서비스 레이어
│   └── googleMaps.ts       # Google Maps API 통신
├── store/              # Zustand 상태 관리
│   └── useTravelStore.ts   # 전역 상태 스토어
├── types/              # TypeScript 타입 정의
│   └── index.ts
├── utils/              # 유틸리티 함수
│   └── formatters.ts       # 데이터 포맷팅
└── vite-env.d.ts       # Vite 환경 변수 타입
```

### 주요 기술 스택

#### 핵심 라이브러리
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성
- **Zustand**: 경량 상태 관리
- **Tailwind CSS**: 유틸리티 기반 스타일링

#### Google Maps 통합
- **@googlemaps/js-api-loader**: Google Maps API 로더
- **@googlemaps/markerclusterer**: 마커 클러스터링

#### 유틸리티
- **date-fns**: 날짜 포맷팅
- **lucide-react**: 아이콘 라이브러리
- **axios**: HTTP 클라이언트

### 개발 명령어

```bash
# 개발 서버 실행 (Hot Reload)
npm run dev

# TypeScript 타입 체크
npx tsc --noEmit

# 린트 검사
npm run lint

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

### 새로운 기능 추가하기

#### 1. 새로운 추천 카테고리 추가

`src/components/Recommendations/Recommendations.tsx`에서:

```typescript
const categories = [
  // 기존 카테고리...
  {
    id: 'new_category',
    name: '새 카테고리',
    icon: '🎨',
    types: ['place_type_1', 'place_type_2']
  },
];
```

Google Places API의 [지원되는 타입](https://developers.google.com/maps/documentation/places/web-service/supported_types) 참고

#### 2. 새로운 교통 수단 추가

`src/types/index.ts`에 TransportMode 추가:

```typescript
export enum TransportMode {
  // 기존 모드...
  NEW_MODE = 'NEW_MODE',
}
```

그리고 `SearchBar.tsx`에서 UI 추가

#### 3. 커스텀 지도 스타일 적용

`src/hooks/useGoogleMaps.ts`의 `styles` 배열 수정:

```typescript
styles: [
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#a2daf2' }]
  },
  // 추가 스타일...
]
```

### 상태 관리

전역 상태는 Zustand를 사용하여 관리됩니다:

```typescript
// 상태 읽기
const { tripDetails, recommendations } = useTravelStore();

// 상태 업데이트
const { setOrigin, setRecommendations } = useTravelStore();
setOrigin(newPlace);
```

---

## 배포 가이드

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정:
   - `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API 키
4. 자동 배포 완료

### Netlify 배포

1. [Netlify](https://netlify.com)에 계정 생성
2. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. 환경 변수 설정
4. 배포

### 수동 배포

```bash
# 프로덕션 빌드
npm run build

# dist 폴더를 웹 서버에 업로드
# (Nginx, Apache, etc.)
```

### 환경별 설정

개발/스테이징/프로덕션 환경에 따라 다른 API 키 사용:

```bash
# .env.development
VITE_GOOGLE_MAPS_API_KEY=dev_api_key

# .env.production
VITE_GOOGLE_MAPS_API_KEY=prod_api_key
```

---

## 문제 해결

### 지도가 로드되지 않아요
1. `.env` 파일에 올바른 API 키가 설정되었는지 확인
2. Google Cloud Console에서 Maps JavaScript API가 활성화되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 경로를 찾을 수 없어요
1. 출발지와 도착지가 올바르게 선택되었는지 확인
2. 선택한 교통 수단으로 이동 가능한 경로인지 확인
3. Google Maps API 할당량이 초과되지 않았는지 확인

### 추천이 표시되지 않아요
1. 도착지가 선택되었는지 확인
2. Places API가 활성화되었는지 확인
3. 선택한 카테고리와 취향에 맞는 장소가 있는지 확인

---

## 라이선스

Proprietary - All rights reserved

## 지원

문제가 있거나 제안사항이 있으시면 이슈를 등록해주세요.
