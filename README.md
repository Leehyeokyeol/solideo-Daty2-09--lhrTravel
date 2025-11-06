# TravelMate - AI 기반 맞춤형 여행 플래너

> 실시간 대중교통 연계와 스마트 추천으로 완벽한 여행을 계획하세요

## 주요 기능

### 🗺️ 스마트 경로 계획
- 출발지-도착지 실시간 검색 및 자동완성
- Kakao Maps 기반 정확한 위치 정보 (한국 지역 특화)
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
- **Maps Integration**: Kakao Maps API (한국 지역 최적화)
- **Icons**: Lucide React

## 시작하기

### 사전 요구사항

- Node.js 18 이상
- Kakao Developers 계정
- Kakao Maps API Keys (JavaScript 키 + REST API 키)

### Kakao Maps API 설정

1. [Kakao Developers](https://developers.kakao.com/)에 접속 및 로그인
2. **내 애플리케이션** > **애플리케이션 추가하기** 클릭
3. 앱 이름 입력 후 생성
4. **앱 키** 탭에서 다음 키 복사:
   - **JavaScript 키** (지도 표시용)
   - **REST API 키** (장소 검색, 경로 탐색용)
5. **플랫폼** 설정:
   - 웹 플랫폼 추가
   - 사이트 도메인 등록 (개발: `http://localhost:3000`)

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일에 Kakao API Keys 입력
# VITE_KAKAO_API_KEY=JavaScript 키
# VITE_KAKAO_REST_API_KEY=REST API 키

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
