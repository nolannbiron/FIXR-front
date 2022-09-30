import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrPlugin from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            babel: {
                presets: [['@babel/preset-react', { runtime: 'automatic' }], '@babel/preset-typescript'],
                plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
            },
        }),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
})
