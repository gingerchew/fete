import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: true,
        target: 'esnext',
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es']
        },
    },
    esbuild: {
        mangleProps: /^_/,
    }
})