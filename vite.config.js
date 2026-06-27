import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        'services-building': resolve(__dirname, 'services/building.html'),
        'services-municipal': resolve(__dirname, 'services/municipal.html'),
        'services-mechanical': resolve(__dirname, 'services/mechanical.html'),
        'services-cross': resolve(__dirname, 'services/cross-province.html'),
        cases: resolve(__dirname, 'cases.html'),
        recruitment: resolve(__dirname, 'recruitment.html'),
        news: resolve(__dirname, 'news.html'),
        contact: resolve(__dirname, 'contact.html'),
        '404': resolve(__dirname, '404.html'),
      },
    },
  },
});
