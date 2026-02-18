import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {     
      // Base path configuration for GitHub Pages
      // Use '/' if you're using a custom domain
      // Use '/repository-name/' if using GitHub's default URL (username.github.io/repository-name)
      base: '/kodacars-website/',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      
      // Build optimization settings for production
      build: {
        outDir: 'dist', // Output folder for built files
        sourcemap: false, // Disable source maps in production for smaller file sizes
        
        // Code splitting configuration to improve load times
        rollupOptions: {
          output: {
            // Separate vendor code (React, React-DOM) from your app code
            // This allows browsers to cache these libraries separately
            manualChunks: {
              vendor: ['react', 'react-dom'],
            }
          }
        },
        
        // Additional optimizations
        minify: 'esbuild', // Use fast esbuild for minification
        target: 'es2015', // Target modern browsers for better performance
        cssCodeSplit: true, // Split CSS into separate files for better caching
      }
    };
});
