import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
    plugins: [react()],
    server: {
        // 5173이 이미 사용 중인 경우(다른 Vite/프로세스가 점유),
        // 개발 서버가 5174...로 자동 fallback 하도록 허용
        port: 5173,
        strictPort: false,
    },
});
