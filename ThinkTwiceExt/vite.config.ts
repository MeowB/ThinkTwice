import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	build: {
		outDir: 'dist', // Default output folder for build
		rollupOptions: {
			input: {
				popup: path.resolve(__dirname, 'index.html'), // Popup entry
				background: path.resolve(__dirname, 'src/background.ts'), // Background script
				content: path.resolve(__dirname, 'src/content.ts'), // content script
			},
			output: {
			  // Use specific names for chunk files without hashing
			  entryFileNames: 'assets/[name].js',
			  chunkFileNames: 'assets/[name].js',
			  assetFileNames: 'assets/[name][extname]', // Keep original asset names for images and other assets
			},
		},

		emptyOutDir: true,
	}
});
