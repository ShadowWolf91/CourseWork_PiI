/* eslint-disable prettier/prettier */
import react from '@vitejs/plugin-react'
import {defineConfig} from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3001,
        // https: false,
    },
})

