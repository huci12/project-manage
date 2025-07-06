# 프로젝트 관리 시스템 (PM System)

피그마 디자인을 기반으로 구현된 Vue.js 프로젝트 관리 시스템입니다. Storybook을 활용한 컴포넌트 개발 환경을 제공합니다.

## 🎨 디자인 시스템

### 컬러 팔레트
- **Primary**: #293380 (네이비 블루)
- **Secondary**: #953D60 (자홍색)
- **Background**: #F0EFF7 (연한 보라)
- **Success**: #48BB78 (녹색)
- **Warning**: #ED8936 (주황색)
- **Error**: #F56565 (빨간색)

### 타이포그래피
- **Font Family**: Inter (한국어 최적화)
- **Base Font Size**: 16px
- **Line Height**: 1.7 (한국어 가독성 고려)

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
# Vue 개발 서버
npm run dev

# Storybook 실행
npm run storybook
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# Storybook 빌드
npm run build-storybook
```

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── UI/              # 기본 UI 컴포넌트
│   │   ├── PMButton.vue
│   │   └── PMCard.vue
│   ├── layout/          # 레이아웃 컴포넌트
│   │   └── PMSidebar.vue
│   ├── project/         # 프로젝트 관련 컴포넌트
│   │   └── ProjectCard.vue
│   ├── team/            # 팀 관련 컴포넌트
│   │   └── TeamCard.vue
│   └── auth/            # 인증 관련 컴포넌트
│       └── LoginForm.vue
├── layouts/             # 페이지 레이아웃
│   └── MainLayout.vue
├── pages/               # 페이지 컴포넌트
│   ├── AuthPage.vue
│   └── DashboardPage.vue
└── stories/             # Storybook 스토리
    ├── PMButton.stories.js
    ├── PMCard.stories.js
    ├── ProjectCard.stories.js
    ├── PMSidebar.stories.js
    ├── MainLayout.stories.js
    └── DashboardPage.stories.js
```

## 🧩 주요 컴포넌트

### UI 컴포넌트

#### PMButton
다양한 스타일과 크기를 지원하는 버튼 컴포넌트
- **변형**: primary, secondary, outline, danger
- **크기**: small, medium, large
- **기능**: 아이콘 슬롯, 전체 너비, 비활성화 상태

#### PMCard
유연한 카드 컴포넌트
- **변형**: default, elevated, outlined
- **슬롯**: header, default, footer
- **기능**: 호버 효과, 패딩 조정

### 레이아웃 컴포넌트

#### PMSidebar
네비게이션 사이드바
- **기능**: 축소/확장, 활성 상태 표시, 반응형 지원
- **네비게이션**: 대시보드, 프로젝트, 팀, 일정, 설정

#### MainLayout
메인 페이지 레이아웃
- **기능**: 사이드바 통합, 모바일 헤더, 반응형 디자인

### 페이지 컴포넌트

#### DashboardPage
대시보드 메인 페이지
- **기능**: 통계 카드, 프로젝트 그리드, 검색, 무한 로딩

#### AuthPage
로그인 페이지
- **기능**: 로그인 폼, 소셜 로그인, 비밀번호 찾기

## 📱 반응형 디자인

### 브레이크포인트
- **Desktop**: > 768px
- **Mobile**: ≤ 768px

### 모바일 최적화
- 터치 타겟 최소 44px
- 모바일 헤더 제공
- 오버레이 네비게이션
- 스와이프 친화적 인터페이스

## 🎯 디자인 원칙

### 한국어 최적화
- 적절한 줄 간격 (1.7)
- 한글 폰트 스택 우선순위
- 텍스트 길이 변화 대응
- 문화적 색상 적용

### 접근성 (A11y)
- 충분한 색상 대비 (4.5:1 이상)
- 키보드 네비게이션 지원
- 스크린 리더 호환
- 의미론적 마크업

### 성능 최적화
- 컴포넌트 지연 로딩
- 이미지 최적화
- 메모리 효율적 설계
- 애니메이션 최적화

## 🛠 개발 가이드

### 컴포넌트 개발
1. Storybook에서 컴포넌트 개발
2. Props와 이벤트 문서화
3. 다양한 상태와 변형 구현
4. 접근성 고려사항 적용

### 스토리 작성
```javascript
export default {
  title: 'Category/ComponentName',
  component: ComponentName,
  parameters: {
    docs: {
      description: {
        component: '컴포넌트 설명'
      }
    }
  }
}

export const Default = Template.bind({})
Default.args = {
  // 기본 props
}
```

### 스타일 가이드
- CSS 변수 활용
- BEM 방법론 또는 Scoped CSS
- 모바일 우선 반응형 디자인
- 일관된 스페이싱 시스템 (8px 기준)

## 🧪 테스트

### Storybook 인터랙션 테스트
- `@storybook/addon-vitest` 활용
- 컴포넌트 단위 테스트
- 시각적 회귀 테스트

### 접근성 테스트
- `@storybook/addon-a11y` 활용
- 자동 접근성 검사
- 색상 대비 확인

## 📚 참고 자료

### 피그마 디자인
- [프로젝트 관리 시스템 디자인](https://www.figma.com/design/wxkwpwDdSAGfJJvZNfnu5a/Project-Manage)

### 개발 도구
- [Vue.js 3](https://vuejs.org/)
- [Storybook](https://storybook.js.org/)
- [Vite](https://vitejs.dev/)

### 디자인 시스템
- [Inter 폰트](https://fonts.google.com/specimen/Inter)
- [한국어 UI 가이드라인](https://material.io/design/typography/language-support.html#korean)

## 📄 라이선스

MIT License

## 👥 기여하기

1. 이슈 생성 또는 할당받기
2. 기능 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치 푸시 (`git push origin feature/amazing-feature`)
5. Pull Request 생성

### 커밋 메시지 규칙
```
feat: 새로운 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 스타일 변경
refactor: 코드 리팩토링
test: 테스트 추가/수정
chore: 빌드 설정 등 기타 변경
```

## 🔗 관련 링크

- [피그마 디자인 파일](https://www.figma.com/design/wxkwpwDdSAGfJJvZNfnu5a/Project-Manage)
- [Storybook 데모](http://localhost:6006) (로컬 실행 시)
- [프로젝트 데모](http://localhost:5173) (로컬 실행 시)
