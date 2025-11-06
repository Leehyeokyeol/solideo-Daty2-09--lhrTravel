# 🚀 TravelMate 배포 가이드

이 앱을 별도의 웹사이트로 쉽게 배포하는 방법입니다.

## ⚡ 가장 빠른 방법: Vercel (추천!)

### 1단계: Vercel 계정 생성
1. [vercel.com](https://vercel.com) 방문
2. GitHub 계정으로 로그인

### 2단계: 프로젝트 배포
1. Vercel 대시보드에서 **"Add New Project"** 클릭
2. GitHub 저장소 **"solideo-Daty2-09--lhrTravel"** 선택
3. 브랜치: **"claude/travel-personalization-app-011CUrLzgN3vg3DDS44xATrG"** 선택
4. **Framework Preset**: Vite (자동 감지됨)
5. **"Deploy"** 클릭!

### 3단계: 완료! 🎉
- 배포 완료 후 URL이 생성됩니다 (예: `https://your-project.vercel.app`)
- 이제 전 세계 어디서나 접속 가능합니다!

### API 키 설정 (선택사항)
실제 Kakao API를 사용하려면:
1. Vercel 프로젝트 설정으로 이동
2. **Settings** > **Environment Variables**
3. 다음 변수 추가:
   - `VITE_KAKAO_API_KEY`: (카카오 JavaScript 키)
   - `VITE_KAKAO_REST_API_KEY`: (카카오 REST API 키)
4. **Redeploy** 클릭

**참고**: API 키 없이도 데모 모드로 완벽하게 작동합니다!

---

## 🌐 대안 1: Netlify

### 방법 A: Git 연동 (추천)

1. [netlify.com](https://netlify.com) 방문 및 로그인
2. **"Add new site"** > **"Import an existing project"** 클릭
3. **GitHub** 선택
4. 저장소 **"solideo-Daty2-09--lhrTravel"** 선택
5. 설정:
   - **Branch**: `claude/travel-personalization-app-011CUrLzgN3vg3DDS44xATrG`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **"Deploy site"** 클릭!

### 방법 B: 드래그 앤 드롭

1. 로컬에서 빌드:
   ```bash
   npm install
   npm run build
   ```

2. [netlify.com/drop](https://app.netlify.com/drop)로 이동

3. `dist` 폴더를 드래그 앤 드롭!

---

## 🔥 대안 2: Firebase Hosting

### 1. Firebase 설정
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```

### 2. 설정 시 선택사항:
- Public directory: `dist`
- Single-page app: `Yes`
- Set up automatic builds: `No`

### 3. 빌드 및 배포
```bash
npm run build
firebase deploy
```

---

## 📦 대안 3: Cloudflare Pages

### 1단계: Cloudflare 계정
1. [pages.cloudflare.com](https://pages.cloudflare.com) 방문
2. GitHub 연동

### 2단계: 프로젝트 생성
1. **"Create a project"** 클릭
2. GitHub 저장소 선택
3. 설정:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. **"Save and Deploy"** 클릭!

---

## 🎯 배포 비교표

| 서비스 | 난이도 | 속도 | 무료 한도 | 추천도 |
|--------|--------|------|-----------|--------|
| **Vercel** | ⭐ 매우 쉬움 | ⚡ 매우 빠름 | 매우 넉넉함 | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐ 매우 쉬움 | ⚡ 빠름 | 넉넉함 | ⭐⭐⭐⭐ |
| **Firebase** | ⭐⭐ 쉬움 | ⚡ 빠름 | 충분함 | ⭐⭐⭐ |
| **Cloudflare Pages** | ⭐⭐ 쉬움 | ⚡ 매우 빠름 | 넉넉함 | ⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐⭐ 보통 | 보통 | 충분함 | ⭐⭐⭐ |

---

## 💡 로컬에서 미리 테스트

배포 전 로컬에서 프로덕션 빌드 테스트:

```bash
# 의존성 설치
npm install

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

브라우저에서 `http://localhost:4173` 접속하여 확인!

---

## 🔧 문제 해결

### 빌드 실패
**원인**: Node.js 버전 문제
**해결**: Node.js 18 이상 사용
```bash
node --version  # v18.0.0 이상이어야 함
```

### 404 에러 (페이지 새로고침 시)
**원인**: SPA 라우팅 미설정
**해결**: 이미 `vercel.json`, `netlify.toml`에 설정되어 있음

### API 키 관련 오류
**해결**: API 키 없이도 작동합니다! 데모 모드로 자동 전환됨

---

## 📱 배포 후 확인사항

배포가 완료되면:

1. ✅ 지도가 정상적으로 표시되는지 확인
2. ✅ 장소 검색 기능 테스트
3. ✅ 경로 찾기 기능 테스트
4. ✅ 추천 장소 기능 테스트
5. ✅ 반응형 디자인 확인 (모바일, 태블릿)

---

## 🎨 커스텀 도메인 연결 (선택사항)

### Vercel
1. 프로젝트 설정 > **Domains**
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 설정

### Netlify
1. **Site settings** > **Domain management**
2. **Add custom domain**
3. DNS 설정

---

## 🚀 자동 배포 설정

Git에 푸시하면 자동으로 배포되도록 설정:

### Vercel/Netlify (이미 설정됨!)
- 브랜치에 푸시 → 자동으로 새 버전 배포
- Pull Request 생성 → 미리보기 URL 자동 생성

---

## 📞 도움이 필요하신가요?

- Vercel 문서: https://vercel.com/docs
- Netlify 문서: https://docs.netlify.com
- Firebase 문서: https://firebase.google.com/docs/hosting
- Cloudflare 문서: https://developers.cloudflare.com/pages

---

**가장 추천하는 방법**: **Vercel** - 클릭 몇 번이면 끝! 🎉
