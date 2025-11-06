# GitHub Actions 배포 가이드

## 개요

이 프로젝트는 GitHub Actions를 통해 자동으로 빌드 및 배포됩니다.

## 워크플로우 구성

### 1. 자동 실행 조건

다음 상황에서 자동으로 실행됩니다:
- `claude/travel-personalization-app-011CUrLzgN3vg3DDS44xATrG` 브랜치에 푸시할 때
- `main` 브랜치로 Pull Request를 생성할 때
- 수동으로 워크플로우를 실행할 때 (GitHub UI에서)

### 2. 워크플로우 작업

#### Build Job (빌드)
1. 코드 체크아웃
2. Node.js 18 설정
3. 의존성 설치 (`npm ci`)
4. 애플리케이션 빌드 (`npm run build`)
5. 빌드 결과물 업로드

#### Test Job (테스트)
1. 린트 검사 (`npm run lint`)
2. TypeScript 타입 체크 (`npx tsc --noEmit`)
3. 빌드 테스트

#### Deploy Job (배포)
1. 빌드 결과물 다운로드
2. GitHub Pages 설정
3. GitHub Pages에 배포

## GitHub Pages 활성화 방법

### 1. 저장소 설정

1. GitHub 저장소 페이지로 이동
2. **Settings** 탭 클릭
3. 좌측 메뉴에서 **Pages** 클릭
4. **Source** 섹션에서:
   - Source: **GitHub Actions** 선택

### 2. 환경 변수 설정 (선택사항)

실제 Kakao API를 사용하려면:

1. GitHub 저장소 페이지에서 **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** 클릭
3. 다음 secret 추가:
   - Name: `VITE_KAKAO_API_KEY`
   - Value: `your_kakao_javascript_key`
4. 다시 **New repository secret** 클릭
5. 추가 secret:
   - Name: `VITE_KAKAO_REST_API_KEY`
   - Value: `your_kakao_rest_api_key`

**참고:** API 키가 없어도 앱은 데모 모드로 정상 작동합니다!

## 수동 워크플로우 실행

1. GitHub 저장소에서 **Actions** 탭 클릭
2. 좌측에서 **Build and Deploy TravelMate** 선택
3. 우측 상단의 **Run workflow** 버튼 클릭
4. 브랜치 선택 후 **Run workflow** 확인

## 워크플로우 상태 확인

### 실행 로그 확인
1. **Actions** 탭에서 최근 워크플로우 실행 클릭
2. 각 Job을 클릭하면 상세 로그 확인 가능

### 배포 URL 확인
배포가 완료되면:
- **Deploy to GitHub Pages** 작업에서 URL 확인
- 일반적으로: `https://<username>.github.io/<repository-name>/`

## 문제 해결

### 빌드 실패
**원인:** 의존성 또는 코드 오류
**해결:** Actions 탭에서 로그 확인 후 오류 수정

### 배포 실패 (403 Forbidden)
**원인:** GitHub Pages 권한 미설정
**해결:**
1. Settings > Actions > General
2. **Workflow permissions** 섹션에서 **Read and write permissions** 선택
3. **Allow GitHub Actions to create and approve pull requests** 체크

### Pages 배포가 안 됨
**원인:** GitHub Pages 미활성화
**해결:** Settings > Pages에서 Source를 **GitHub Actions**로 설정

## 로컬 테스트

GitHub Actions 실행 전 로컬에서 테스트:

```bash
# 의존성 설치
npm ci

# 빌드 테스트
npm run build

# 린트 검사
npm run lint

# 타입 체크
npx tsc --noEmit

# 로컬 미리보기
npm run preview
```

## 베이스 URL 설정 (필요시)

GitHub Pages에서 서브패스로 배포되는 경우:

`vite.config.ts`에 base 설정 추가:
```typescript
export default defineConfig({
  base: '/repository-name/',
  // ...
});
```

## CI/CD 파이프라인 구조

```
Push to branch
    ↓
┌────────────────┐
│  Build Job     │ ← npm ci, npm run build
└────────────────┘
    ↓
┌────────────────┐
│  Test Job      │ ← lint, type-check
└────────────────┘
    ↓
┌────────────────┐
│  Deploy Job    │ ← GitHub Pages deployment
└────────────────┘
    ↓
Live on GitHub Pages 🚀
```

## 참고 자료

- [GitHub Actions 공식 문서](https://docs.github.com/en/actions)
- [GitHub Pages 배포](https://docs.github.com/en/pages)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
