import { defineConfig } from "vite";

// @TODO find/code plugin to remove trailing semicolons where not needed

export default defineConfig({
    build: {
        minify: true,
        lib: {
            entry: 'src/index.ts',
            fileName: 'index',
            formats: ['es']
        },
        rollupOptions: {
            plugins: []
        }
    }
})