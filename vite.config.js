import { resolve } from 'node:path';

export default {
  build: {
    lib: {
      entry: resolve('src/main/resources/static/api-client/src/index.js'),
      name: 'ApiClient',
      fileName: () => 'api-client.bundle.js',
      formats: ['es']
    },
    outDir: 'src/main/resources/static',
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    }
  }
};


