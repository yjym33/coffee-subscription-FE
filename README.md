# BeanBliss Coffee Subscription Frontend

커피 구독 서비스 프론트엔드 애플리케이션입니다. Next.js와 TypeScript를 사용하여 구축되었습니다.

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

1. **의존성 설치**

   ```bash
   npm install
   ```

2. **환경변수 설정**

   ```bash
   cp .env.example .env.local
   ```

   `.env.local` 파일에서 필요한 환경변수를 설정하세요:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8081/api
   NEXT_PUBLIC_APP_NAME=BeanBliss
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NODE_ENV=development
   ```

3. **개발 서버 실행**

   ```bash
   npm run dev
   ```

   브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 🏗️ 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── catalog/           # 커피 카탈로그 페이지
│   ├── product/           # 상품 상세 페이지
│   └── layout.tsx         # 루트 레이아웃
├── components/            # 재사용 가능한 컴포넌트
│   ├── ui/               # 기본 UI 컴포넌트
│   └── home/             # 홈페이지 관련 컴포넌트
├── lib/                  # 유틸리티 및 설정
│   ├── config/           # 설정 파일
│   ├── services/         # API 서비스
│   └── utils/            # 유틸리티 함수
└── hooks/                # 커스텀 React 훅
```

## 🔧 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Context
- **API Client**: Custom Fetch Wrapper
- **Icons**: Lucide React
