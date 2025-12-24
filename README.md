# RePoint Pilates

필라테스 센터를 위한 스마트한 회원 관리 및 예약 시스템

## 기능

- **회원 관리**: 회원 정보, 회원권, 신체 평가 기록
- **실시간 예약**: 모바일에서 편리하게 수업 예약/취소
- **수업 관리**: 개인/듀엣/그룹 수업 유형별 관리
- **강사 관리**: 스케줄 및 휴무 관리
- **결제 시스템**: 다양한 결제 수단 지원
- **자동 알림**: 예약 확인, 리마인더, 만료 알림

## 기술 스택

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **PWA**: Service Worker, Web App Manifest
- **Typography**: Cormorant Garamond (Display), Outfit (Body)
- **Design**: Refined Wellness Luxury Aesthetic

## 시작하기

### 개발 서버 실행

```bash
# 의존성 설치
npm install

# 랜딩(정적) 개발 서버 실행 (http://localhost:3000)
npm run dev:landing
```

### 또는 Python으로 실행

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

### VS Code Live Server

VS Code의 Live Server 확장을 설치하고 `index.html`에서 "Go Live"를 클릭하세요.

## PWA 설치

1. Chrome/Edge 브라우저에서 사이트에 접속
2. 주소창 오른쪽의 "설치" 아이콘 클릭
3. 또는 메뉴 → "앱 설치" 선택

## 프로젝트 구조

```
repoint-pilates/
├── apps/
│   ├── admin/              # 관리자 웹(React+TS, Vite)
│   └── api/                # 백엔드 API(NestJS+TS, Prisma)
├── packages/
│   └── shared/             # 공유 타입/유틸
├── index.html              # 메인 랜딩 페이지
├── manifest.json           # PWA 매니페스트
├── service-worker.js       # 서비스 워커 (오프라인 지원)
├── offline.html            # 오프라인 페이지
├── package.json            # npm 설정
├── public/
│   └── icons/             # PWA 아이콘
│       ├── favicon.svg
│       └── apple-touch-icon.png
├── src/
│   ├── css/
│   │   └── main.css       # 메인 스타일시트
│   └── js/
│       └── main.js        # 메인 자바스크립트
└── docs/
    └── PRD.md             # 제품 요구사항 문서
```

## PRD 구현(확장 구조) 로컬 실행 가이드

### 1) DB(Postgres) 실행

```bash
docker compose up -d
```

### 2) API 준비(환경변수/마이그레이션)

- `apps/api/env.example`을 참고해 환경변수를 설정하세요.
  - (보안상 `.env` 파일 생성은 환경에 따라 제한될 수 있어 예시 파일로 제공합니다)

```bash
# (권장) DATABASE_URL을 환경에 맞게 설정 후
npm run build:api
# 프리즈마(생성/마이그레이션)
npm run prisma:generate -w @repoint/api
npm run prisma:migrate -w @repoint/api
# 관리자 계정 시드
npm run prisma:seed -w @repoint/api
# API 실행
npm run dev:api
```

API 헬스체크: `GET /health` (기본 포트: 4000)

### 3) Admin 실행

- `apps/admin/env.example` 참고 (기본값: `VITE_API_URL=http://localhost:4000`)

```bash
npm run dev:admin
```

## 아이콘 생성

PWA 아이콘을 생성하려면 `public/icons/favicon.svg`를 기반으로 다음 크기의 PNG를 생성하세요:

- 72x72, 96x96, 128x128, 144x144, 152x152
- 192x192, 384x384, 512x512
- maskable 버전 (192x192, 512x512)

### 온라인 도구

- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)

## 디자인 컨셉

**Refined Wellness Luxury**

- **컬러 팔레트**
  - Primary: Deep Sage Green (#4A5D52)
  - Secondary: Warm Ivory (#F7F4ED)
  - Accent: Soft Terracotta (#C4857A)
  - Gold: #B8956F

- **타이포그래피**
  - Display: Cormorant Garamond
  - Body: Outfit

- **특징**
  - 부드러운 유기적 곡선과 애니메이션
  - 프리미엄하면서도 접근하기 쉬운 느낌
  - 필라테스의 균형과 조화를 시각적으로 표현

## 브라우저 지원

- Chrome 80+
- Firefox 75+
- Safari 13.1+
- Edge 80+

## 라이선스

MIT License
