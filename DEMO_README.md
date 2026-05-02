# RePoint Pilates - 데모 실행 가이드

## 시스템 요구사항

- **Docker Desktop** (필수)
  - Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - macOS: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - Linux: [Docker Desktop for Linux](https://docs.docker.com/desktop/install/linux-install/)

## 빠른 시작

### Windows

1. **Docker Desktop을 먼저 실행**하세요
2. `start.bat` 파일을 더블클릭하세요
3. 빌드가 완료될 때까지 기다리세요 (최초 실행 시 약 2-5분)
4. 브라우저가 자동으로 열립니다

### macOS / Linux

```bash
# 실행 권한 부여 (최초 1회)
chmod +x start.sh stop.sh

# 시작
./start.sh

# 종료
./stop.sh
```

## 서비스 접속 정보

| 서비스 | URL | 설명 |
|--------|-----|------|
| **랜딩 페이지** | http://localhost:3000 | 고객용 메인 페이지 |
| **Admin 대시보드** | http://localhost:5173 | 관리자 대시보드 |
| **API 서버** | http://localhost:8080 | REST API |

## Admin 로그인 정보

- **이메일**: `admin@repoint.local`
- **비밀번호**: `admin1234`

## 주요 기능

### 랜딩 페이지 (localhost:3000)
- 필라테스 센터 소개
- PWA 지원 (오프라인 접속 가능)
- 모바일 최적화

### Admin 대시보드 (localhost:5173)
- **회원 관리**: 회원 등록, 수정, 삭제
- **강사 관리**: 강사 정보 및 스케줄 관리
- **수업 관리**: 개인/듀엣/그룹 수업 설정
- **스케줄 관리**: 수업 일정 관리
- **예약 관리**: 회원 예약 현황 관리
- **회원권 관리**: 횟수권/기간권 관리

## 서비스 종료

### Windows
- `stop.bat` 파일을 더블클릭하세요

### macOS / Linux
```bash
./stop.sh
```

## 문제 해결

### "Docker가 실행되고 있지 않습니다" 오류
→ Docker Desktop을 먼저 실행해주세요

### 빌드 중 오류 발생
```bash
# 캐시 삭제 후 재빌드
docker-compose -f docker-compose.prod.yml down -v
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d
```

### 포트 충돌
다른 프로그램이 3000, 4000, 5173 포트를 사용 중일 수 있습니다.
해당 프로그램을 종료하거나 `docker-compose.prod.yml`에서 포트를 변경하세요.

## 데이터 초기화

데이터베이스를 초기 상태로 되돌리려면:
```bash
docker-compose -f docker-compose.prod.yml down -v
```
이후 다시 `start.bat` 또는 `./start.sh`를 실행하세요.

## 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **Backend**: NestJS, TypeScript, Prisma ORM
- **Database**: PostgreSQL 16
- **Landing**: Vanilla HTML/CSS/JS, PWA
- **Container**: Docker, Docker Compose
