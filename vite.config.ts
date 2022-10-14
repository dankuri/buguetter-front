import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    return defineConfig({
        plugins: [react()],
        server: {
            port: 8080,
            cors: true,
            host: 'localhost',
            open: true,
            proxy: {
                '/api': {
                    target: process.env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                }
            }
        },
        preview: {
            port: 8081,
            cors: true,
            host: 'localhost',
            proxy: {
                '/api': {
                    target: process.env.VITE_API_URL,
                    changeOrigin: true,
                    secure: false
                }
            }
        }
    })
}
