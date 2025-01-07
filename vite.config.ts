import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src", // Đây là alias cho @
      "~": "/src", // Thêm alias cho ~ nếu bạn muốn sử dụng ~ trong đường dẫn
    },
  },
});
