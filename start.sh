#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║            RePoint Pilates 시스템 시작                   ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Docker 실행 확인
if ! docker info > /dev/null 2>&1; then
    echo "[오류] Docker가 실행되고 있지 않습니다."
    echo "Docker Desktop을 시작해주세요."
    exit 1
fi

echo "[1/4] Docker 확인 완료"
echo ""

# 기존 컨테이너 정리
echo "[2/4] 기존 컨테이너 정리 중..."
docker-compose -f docker-compose.prod.yml down > /dev/null 2>&1

# 이미지 빌드 및 시작
echo "[3/4] 서비스 빌드 및 시작 중... (약 2-5분 소요)"
echo ""
docker-compose -f docker-compose.prod.yml up --build -d

if [ $? -ne 0 ]; then
    echo ""
    echo "[오류] 서비스 시작에 실패했습니다."
    exit 1
fi

echo ""
echo "[4/4] 서비스 시작 완료!"
echo ""

# 서비스 상태 확인 (잠시 대기)
sleep 5

echo "╔══════════════════════════════════════════════════════════╗"
echo "║                   서비스 접속 정보                       ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                                                          ║"
echo "║  랜딩 페이지:     http://localhost:3000                  ║"
echo "║  Admin 대시보드:  http://localhost:5173                  ║"
echo "║  API 서버:        http://localhost:8080                  ║"
echo "║                                                          ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                   Admin 로그인 정보                      ║"
echo "╠══════════════════════════════════════════════════════════╣"
echo "║                                                          ║"
echo "║  이메일:   admin@repoint.local                           ║"
echo "║  비밀번호: admin1234                                     ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# 브라우저 자동 열기 (macOS/Linux)
read -p "브라우저를 여시겠습니까? (y/n): " open_browser
if [ "$open_browser" = "y" ] || [ "$open_browser" = "Y" ]; then
    if command -v open &> /dev/null; then
        # macOS
        open http://localhost:3000
        sleep 2
        open http://localhost:5173
    elif command -v xdg-open &> /dev/null; then
        # Linux
        xdg-open http://localhost:3000
        sleep 2
        xdg-open http://localhost:5173
    fi
fi

echo ""
echo "서비스를 종료하려면 ./stop.sh를 실행하세요."
echo ""
