FROM node:20-alpine AS builder

WORKDIR /app

# 빌드 인자
ARG VITE_API_URL=http://localhost:4000
ENV VITE_API_URL=$VITE_API_URL

# 루트 package.json과 workspace 설정 복사
COPY package.json package-lock.json ./
COPY apps/admin/package.json ./apps/admin/
COPY packages/shared/package.json ./packages/shared/

# 의존성 설치
RUN npm ci --workspace=@repoint/admin

# 소스 코드 복사
COPY apps/admin ./apps/admin
COPY packages/shared ./packages/shared
COPY tsconfig.base.json ./

# 빌드
WORKDIR /app/apps/admin
RUN npm run build

# Nginx로 정적 파일 서빙
FROM nginx:alpine AS runner

# 빌드된 파일 복사
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

# Nginx 설정
COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
