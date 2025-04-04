// app/vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@/components': path.resolve(__dirname, 'src/components')
        }
    },
    build: {
        outDir: 'dist'
    },
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://forgego:3000', // Usar nombre del servicio Docker
                changeOrigin: true
            }
        }
    }
})
