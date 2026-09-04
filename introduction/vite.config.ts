import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const REPO = "sta2002";
const APP = "introduction";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? `/${REPO}/${APP}/` : "/",
  server: {
    host: "127.0.0.1",
    port: 5175,
    strictPort: false,
  },
}));
