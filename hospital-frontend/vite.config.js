import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";


  // vite.config.js
export default {
  server: {
    proxy: {
      "/api/v1": "http://localhost:8000"
    }
  }
}
