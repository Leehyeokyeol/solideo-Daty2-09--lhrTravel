# TravelMate - AI 기반 맞춤형 여행 플래너

> 실시간 대중교통 연계와 스마트 추천으로 완벽한 여행을 계획하세요

## 주요 기능

### 🗺️ 스마트 경로 계획
- 출발지-도착지 실시간 검색 및 자동완성
- Google Maps 기반 정확한 위치 정보
- 이동 경로 시각화 및 핀 마킹

### 🚌 실시간 대중교통 연계
- 버스, 기차, 비행기 등 모든 대중교통 통합
- 실시간 출발 시간 및 소요 시간 정보
- 최적 경로 자동 계산 및 제안

### 🎯 AI 기반 맞춤 추천
- 사용자 취향 기반 여행지 추천
- 현지 맛집 및 관광명소 큐레이션
- 평점 및 리뷰 기반 스마트 필터링

### 📅 여행 일정 관리
- 출발 시간 및 여행 기간 설정
- 일정별 최적 동선 제안
- 실시간 날씨 및 교통 정보 통합

## 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Build Tool**: Vite
- **Maps Integration**: Google Maps JavaScript API
- **Icons**: Lucide React

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- Google Maps API Key

### Google Maps API 설정

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. 다음 API 활성화:
   - Maps JavaScript API
   - Places API
   - Directions API
   - Geocoding API
4. API 키 생성 및 복사

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 Google Maps API Key 입력

# 개발 서버 실행
npm run dev
```

## 프로젝트 구조

```
src/
├── components/          # UI 컴포넌트
│   ├── Map/            # 지도 관련 컴포넌트
│   ├── SearchBar/      # 검색 기능
│   ├── RouteInfo/      # 경로 정보 표시
│   ├── Recommendations/ # 추천 시스템
│   └── Layout/         # 레이아웃 컴포넌트
├── hooks/              # 커스텀 React Hooks
├── services/           # API 서비스 레이어
├── store/              # Zustand 스토어
├── types/              # TypeScript 타입 정의
└── utils/              # 유틸리티 함수
```

## 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 라이선스

Proprietary - All rights reserved
