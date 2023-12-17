/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3001,
		// https: true,
	},
	build: {
		minify: 'esbuild',
		cssMinify: true,
	},
	esbuild: {
		drop: ['console', 'debugger'],
		legalComments: 'none',
		minifyIdentifiers: true,
		minifyWhitespace: true,
		minifySyntax: true,
	},
})

