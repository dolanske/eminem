import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      formats: ['es'],
      entry: resolve(__dirname, 'src/eminem.ts'),
      name: 'eminem',
      fileName: 'eminem',
    },
  },
  plugins: [
    dts({
      rollupTypes: true
    }),
  ],
})