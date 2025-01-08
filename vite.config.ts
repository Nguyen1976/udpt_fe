import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import polyfillNode from 'rollup-plugin-polyfill-node';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), polyfillNode()],
    resolve: {
        alias: {
            '@': '/src', // Đây là alias cho @
            '~': '/src', // Thêm alias cho ~ nếu bạn muốn sử dụng ~ trong đường dẫn
        },
    },
    define: {
        global: 'window', // Định nghĩa global là window
    },
});
