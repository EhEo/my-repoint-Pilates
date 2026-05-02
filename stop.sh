#!/bin/bash

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║            RePoint Pilates 시스템 종료                   ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

echo "서비스를 종료하는 중..."
docker-compose -f docker-compose.prod.yml down

echo ""
echo "서비스가 종료되었습니다."
echo ""
