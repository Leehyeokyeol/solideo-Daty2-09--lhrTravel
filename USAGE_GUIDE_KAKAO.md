# TravelMate 사용 가이드 (Kakao Maps 버전)

## 목차
1. [빠른 시작](#빠른-시작)
2. [Kakao Maps API 설정](#kakao-maps-api-설정)
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

`.env` 파일을 열고 Kakao API 키를 입력하세요:
```
VITE_KAKAO_API_KEY=your_javascript_key_here
VITE_KAKAO_REST_API_KEY=your_rest_api_key_here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저가 자동으로 열리며 `http://localhost:3000`에서 앱을 확인할 수 있습니다.

---

## Kakao Maps API 설정

### API 키 발급

#### 1. Kakao Developers 계정 생성

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 우측 상단 **로그인** 클릭 (카카오 계정으로 로그인)
3. 로그인 후 **내 애플리케이션**으로 이동

#### 2. 애플리케이션 생성

1. **애플리케이션 추가하기** 버튼 클릭
2. 앱 이름 입력 (예: "TravelMate")
3. 사업자명 입력 (선택사항)
4. **저장** 클릭

#### 3. API 키 확인

생성된 애플리케이션을 클릭하면 다음 키들을 확인할 수 있습니다:

**앱 키** 탭에서:
- **JavaScript 키**: 지도 표시 및 클라이언트 사이드 작업용
- **REST API 키**: 서버 사이드 API 호출용 (장소 검색, 경로 탐색)

**🔑 두 키 모두 필요합니다!**

#### 4. 플랫폼 설정

1. 좌측 메뉴에서 **플랫폼** 클릭
2. **Web 플랫폼 등록** 클릭
3. 사이트 도메인 등록:
   - 개발 환경: `http://localhost:3000`
   - 프로덕션: `https://yourdomain.com`
4. **저장** 클릭

#### 5. 활성화 설정

**제품 설정** > **Kakao 로그인**:
- 활성화 설정 **ON**
- Redirect URI 설정 (필요한 경우)

### API 사용량 및 요금

#### 무료 할당량 (2024년 기준)

Kakao Maps API는 다음과 같은 무료 할당량을 제공합니다:

- **지도 SDK (JavaScript)**: 월 300,000 로드
- **주소 검색**: 일 300,000건
- **키워드 검색**: 일 300,000건
- **카테고리 검색**: 일 300,000건
- **좌표-주소 변환**: 일 300,000건

자세한 내용: [Kakao Maps API 가격 정책](https://developers.kakao.com/docs/latest/ko/local/common)

**권장사항:**
1. Kakao Developers 콘솔에서 사용량 모니터링
2. 개발 환경에서는 API 요청 최소화
3. 프로덕션 배포 전 사용 패턴 분석

---

## 주요 기능 사용법

### 1. 여행 경로 검색

#### 출발지/도착지 입력
1. 상단 검색 바에서 **출발지** 입력
2. Kakao 장소 검색 결과에서 원하는 위치 선택
3. **도착지** 입력 및 선택
4. 지도에 자동으로 마커가 표시됩니다

**팁**:
- 정확한 주소, 건물명, 랜드마크로 검색하세요
- 예: "서울역", "강남역 2번 출구", "서울시청"

#### 출발 시간 설정
- 날짜/시간 입력 필드를 클릭하여 원하는 출발 시간 선택
- 대중교통 경로의 정확한 시간표를 확인할 수 있습니다

#### 여행 기간 설정
- 여행 기간(일수)을 입력하여 추천 범위를 조정

#### 교통 수단 선택
4가지 교통 수단 중 선택 가능:
- **🚌 대중교통**: 버스, 지하철, 기차 통합 경로
- **🚗 자동차**: 자동차 경로 (Kakao Navi API 기반)
- **🚶 도보**: 걸어서 가는 경로
- **🚴 자전거**: 자전거 경로

### 2. 경로 정보 확인

출발지와 도착지를 설정하면 우측에 상세 경로 정보가 표시됩니다:

- **총 거리**: 전체 이동 거리
- **소요 시간**: 예상 이동 시간
- **상세 경로**: 구간별 이동 방법
  - 자동차: 도로명 및 예상 시간
  - 대중교통: 환승 정보 포함

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
- **🏛️ 관광지**: 유명 관광 명소 (AT4 카테고리)
- **🍽️ 맛집**: 레스토랑 (FD6 카테고리)
- **☕ 카페**: 카페 (CE7 카테고리)
- **🛍️ 쇼핑**: 쇼핑몰 (MT1 카테고리)
- **🎭 문화**: 문화시설 (CT1 카테고리)

**Kakao 카테고리 코드:**
- AT4: 관광명소
- FD6: 음식점
- CE7: 카페
- MT1: 대형마트
- CT1: 문화시설

#### 추천 장소 상세 보기
- 각 장소 카드를 클릭하면 Kakao Map에서 상세 정보 확인
- 주소, 전화번호, 카테고리 정보 제공

---

## 개발 가이드

### 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Layout/         # 레이아웃 컴포넌트
│   ├── Map/            # Kakao 지도 컴포넌트
│   │   └── KakaoMapContainer.tsx
│   ├── SearchBar/      # 검색 기능
│   │   ├── KakaoPlaceSearch.tsx
│   │   └── SearchBar.tsx
│   ├── RouteInfo/      # 경로 정보 표시
│   └── Recommendations/ # 추천 시스템
├── hooks/              # 커스텀 React Hooks
│   ├── useKakaoMaps.ts     # Kakao Maps 초기화 및 제어
│   └── useDebounce.ts      # 입력 디바운싱
├── services/           # API 서비스 레이어
│   └── kakaoMaps.ts        # Kakao Maps/Local/Mobility API
├── store/              # Zustand 상태 관리
├── types/              # TypeScript 타입 정의
│   ├── index.ts
│   └── kakao.d.ts          # Kakao Maps 타입 정의
└── utils/              # 유틸리티 함수
```

### 주요 기술 스택

#### 핵심 라이브러리
- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안전성
- **Zustand**: 경량 상태 관리
- **Tailwind CSS**: 유틸리티 기반 스타일링

#### Kakao Maps 통합
- **Kakao Maps JavaScript API**: 지도 표시 및 마커
- **Kakao Local API**: 장소 검색
- **Kakao Mobility API**: 경로 탐색 (선택사항)

#### 유틸리티
- **date-fns**: 날짜 포맷팅
- **lucide-react**: 아이콘
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

### Kakao Maps API 사용 가이드

#### 1. 지도 초기화

`src/services/kakaoMaps.ts`의 `loadKakaoMaps()` 함수가 Kakao SDK를 로드합니다:

```typescript
await loadKakaoMaps();
// 이후 window.kakao.maps 사용 가능
```

#### 2. 장소 검색

```typescript
import { searchPlaces } from '@/services/kakaoMaps';

const results = await searchPlaces('강남역');
// Kakao Local API 키워드 검색 사용
```

#### 3. 경로 탐색

```typescript
import { getDirections } from '@/services/kakaoMaps';

const route = await getDirections(
  { lat: 37.5665, lng: 126.9780 }, // 출발
  { lat: 37.5172, lng: 127.0473 }, // 도착
  'transit' // 교통 수단
);
```

#### 4. 주변 장소 검색

```typescript
import { searchNearbyPlaces } from '@/services/kakaoMaps';

const places = await searchNearbyPlaces(
  { lat: 37.5665, lng: 126.9780 },
  5000, // 반경 5km
  'FD6' // 음식점 카테고리
);
```

### 새로운 기능 추가하기

#### 1. 새로운 추천 카테고리 추가

`src/components/Recommendations/Recommendations.tsx`에서:

```typescript
const categories = [
  // 기존 카테고리...
  {
    id: 'hospital',
    name: '병원',
    icon: '🏥',
    types: 'HP8' // Kakao 카테고리 코드
  },
];
```

**Kakao 주요 카테고리 코드:**
- MT1: 대형마트
- CS2: 편의점
- PS3: 어린이집, 유치원
- SC4: 학교
- AC5: 학원
- PK6: 주차장
- OL7: 주유소, 충전소
- SW8: 지하철역
- BK9: 은행
- CT1: 문화시설
- AG2: 중개업소
- PO3: 공공기관
- AT4: 관광명소
- AD5: 숙박
- FD6: 음식점
- CE7: 카페
- HP8: 병원
- PM9: 약국

[전체 카테고리 코드 보기](https://developers.kakao.com/docs/latest/ko/local/dev-guide#search-by-category)

---

## 배포 가이드

### Vercel 배포 (권장)

1. [Vercel](https://vercel.com)에 계정 생성
2. GitHub 저장소 연결
3. 환경 변수 설정:
   - `VITE_KAKAO_API_KEY`: JavaScript 키
   - `VITE_KAKAO_REST_API_KEY`: REST API 키
4. Kakao Developers 콘솔에서 배포 도메인 등록
5. 자동 배포 완료

### Netlify 배포

1. [Netlify](https://netlify.com)에 계정 생성
2. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. 환경 변수 설정
4. Kakao Developers 콘솔에서 배포 도메인 등록
5. 배포

### 중요: 도메인 등록

배포 후 **반드시** Kakao Developers 콘솔에서:
1. **내 애플리케이션** > 해당 앱 선택
2. **플랫폼** > **Web 플랫폼 등록**
3. 배포된 도메인 추가 (예: `https://travelmate.vercel.app`)

등록하지 않으면 CORS 오류가 발생합니다!

---

## 문제 해결

### 지도가 로드되지 않아요

**원인 1: API 키가 올바르지 않음**
- `.env` 파일에 올바른 JavaScript 키가 설정되었는지 확인
- 키 앞뒤 공백 제거

**원인 2: 도메인이 등록되지 않음**
- Kakao Developers 콘솔에서 현재 도메인이 등록되었는지 확인
- `http://localhost:3000` 등록 확인

**원인 3: 네트워크 문제**
- 브라우저 개발자 도구 (F12) > Network 탭에서 `dapi.kakao.com` 요청 확인
- CORS 오류 확인

### 장소 검색이 안 돼요

**원인 1: REST API 키 누락**
- `.env` 파일에 `VITE_KAKAO_REST_API_KEY` 설정 확인

**원인 2: API 사용량 초과**
- Kakao Developers 콘솔에서 사용량 확인
- 일일 무료 할당량: 300,000건

**원인 3: 권한 설정**
- Kakao Developers > **제품 설정** > **Kakao 로그인** 활성화 확인

### 경로를 찾을 수 없어요

**현재 제한사항:**
- Kakao Mobility API는 별도 승인이 필요할 수 있습니다
- 대중교통 경로는 간단한 직선 경로로 표시됩니다
- 자동차 경로만 실제 도로 기반 경로를 제공합니다

**해결 방법:**
1. 출발지와 도착지가 올바르게 선택되었는지 확인
2. 자동차 모드로 변경해보기
3. Kakao Developers 콘솔에서 Mobility API 권한 확인

### 추천이 표시되지 않아요

**원인 1: 도착지 미선택**
- 도착지를 먼저 선택하세요

**원인 2: 해당 카테고리에 장소가 없음**
- 다른 카테고리를 선택해보세요
- 검색 반경을 늘려보세요 (코드 수정 필요)

**원인 3: REST API 키 문제**
- `.env` 파일의 `VITE_KAKAO_REST_API_KEY` 확인

---

## 추가 리소스

### 공식 문서
- [Kakao Developers](https://developers.kakao.com/)
- [Kakao Maps JavaScript API](https://apis.map.kakao.com/web/)
- [Kakao Local API](https://developers.kakao.com/docs/latest/ko/local/dev-guide)
- [Kakao Mobility API](https://developers.kakao.com/docs/latest/ko/kakaonavi/common)

### 커뮤니티
- [Kakao Developers 포럼](https://devtalk.kakao.com/)
- [GitHub Issues](https://github.com/kakao/kakao-maps)

---

## 라이선스

Proprietary - All rights reserved

## 지원

문제가 있거나 제안사항이 있으시면 이슈를 등록해주세요.
