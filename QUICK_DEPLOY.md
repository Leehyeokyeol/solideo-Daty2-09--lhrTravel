# 🚀 빠른 배포 가이드 - GitHub Actions

## ✨ 자동 배포가 설정되었습니다!

코드를 푸시하면 GitHub Actions가 자동으로:
1. ✅ Node.js 환경 설정
2. ✅ 의존성 설치 (`npm ci`)
3. ✅ Vite 앱 빌드 (`npm run build`)
4. ✅ GitHub Pages에 배포
5. ✅ 실제 접속 가능한 웹사이트 생성!

---

## 📍 배포 URL 확인하기

### 1단계: GitHub 저장소 접속

https://github.com/Leehyeokyeol/solideo-Daty2-09--lhrTravel

### 2단계: Settings > Pages 설정

1. 저장소 페이지에서 **Settings** 탭 클릭
2. 왼쪽 메뉴에서 **Pages** 클릭
3. **Source** 섹션에서:
   - **GitHub Actions** 선택 (이미 선택되어 있을 수 있음)

### 3단계: Actions 탭에서 배포 확인

1. **Actions** 탭 클릭
2. 가장 최근 워크플로우 실행 확인
3. **"Deploy TravelMate to GitHub Pages"** 클릭
4. 모든 단계가 ✅ 녹색 체크 표시되면 배포 완료!

### 4단계: 웹사이트 접속!

배포가 완료되면 다음 URL에서 접속 가능합니다:

```
https://Leehyeokyeol.github.io/solideo-Daty2-09--lhrTravel/
```

또는 Settings > Pages 페이지 상단에서 배포 URL 확인 가능

---

## 🎭 데모 모드로 작동

API 키 없이 **데모 모드**로 완벽하게 작동합니다!

사용 가능한 기능:
- ✅ 장소 검색 (서울역, 강남역, 명동, 경복궁 등)
- ✅ 경로 탐색
- ✅ 주변 장소 추천
- ✅ 모든 UI 기능

---

## 🔄 자동 재배포

브랜치 `claude/travel-personalization-app-011CUrLzgN3vg3DDS44xATrG`에 푸시할 때마다 자동으로 재배포됩니다!

```bash
git add .
git commit -m "변경사항"
git push
```

푸시 후 2~3분이면 새 버전이 배포됩니다.

---

## 🛠️ 수동 배포 실행

GitHub Actions 탭에서 수동으로도 배포 가능합니다:

1. **Actions** 탭 이동
2. 왼쪽에서 **"Deploy TravelMate to GitHub Pages"** 선택
3. 오른쪽 상단 **"Run workflow"** 클릭
4. 브랜치 선택 후 **"Run workflow"** 확인

---

## 📊 배포 상태 확인

### 성공 시
- ✅ 모든 단계 녹색 체크 표시
- 🌐 URL에서 앱 접속 가능

### 실패 시
1. Actions 탭에서 실패한 워크플로우 클릭
2. 빨간색 ❌ 표시된 단계 클릭
3. 로그 확인하여 오류 파악

---

## 🔑 실제 Kakao API 사용 (선택사항)

실제 Kakao Maps API를 사용하려면:

1. **Settings** > **Secrets and variables** > **Actions**
2. **New repository secret** 클릭
3. Secret 추가:
   - Name: `VITE_KAKAO_API_KEY`
   - Value: (카카오 JavaScript 키)
4. 또 다른 Secret 추가:
   - Name: `VITE_KAKAO_REST_API_KEY`
   - Value: (카카오 REST API 키)
5. 워크플로우 재실행

**참고**: API 키 없이도 완벽하게 작동합니다!

---

## 🌍 커스텀 도메인 연결 (선택사항)

Settings > Pages에서:
1. **Custom domain** 입력
2. DNS 설정 안내에 따라 CNAME 레코드 추가
3. **Enforce HTTPS** 체크

---

## 📞 문제 해결

### 404 에러가 나는 경우

Settings > Pages에서 Source가 **GitHub Actions**로 설정되어 있는지 확인

### 빌드 실패

Actions 탭에서 로그 확인 - 일반적으로 의존성 문제이며 자동으로 재시도하면 해결됨

### 배포 URL을 모르겠어요

Settings > Pages 페이지 상단에 표시됩니다:
- 보통: `https://<username>.github.io/<repository>/`

---

## ⚡ 최종 점검

✅ GitHub Actions 워크플로우 설정 완료
✅ 자동 빌드 및 배포 활성화
✅ GitHub Pages 배포 준비 완료
✅ 데모 모드로 API 키 없이 작동

**이제 푸시만 하면 자동으로 배포됩니다!** 🎉
