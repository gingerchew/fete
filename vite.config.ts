import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: 'src/index.ts',
        },
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es']
        }
    },
    esbuild: {
        globalName: 'fete',
    },
})