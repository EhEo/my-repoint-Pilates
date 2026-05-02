FROM node:20-alpine

WORKDIR /app

# 루트 package.json과 workspace 설정 복사
COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# 의존성 설치 (devDependencies 포함 - tsx 필요)
RUN npm ci --workspace=@repoint/api

# 소스 코드 복사
COPY apps/api ./apps/api
COPY packages/shared ./packages/shared
COPY tsconfig.base.json ./

# Prisma 클라이언트 생성
WORKDIR /app/apps/api
RUN npx prisma generate

# 환경 변수
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# tsx로 직접 실행 (TypeScript 빌드 없이)
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && npx tsx src/main.ts"]
