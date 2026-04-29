import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const sdkTarget = env.SDK_PROXY_TARGET || "http://localhost:9876";
  const sdkApiKey = env.SDK_API_KEY;
  const sdkPlaygroundSecret = env.SDK_PLAYGROUND_SECRET;

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": {
          target: sdkTarget,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq, req) => {
              const url = req.url || "";

              if (url.startsWith("/api/agent") && sdkApiKey) {
                proxyReq.setHeader("x-api-key", sdkApiKey);
              }

              if ((url.startsWith("/api/transcribe") || url.startsWith("/api/voice")) && sdkApiKey) {
                proxyReq.setHeader("x-api-key", sdkApiKey);
              }

              if (url.startsWith("/api/playground") && sdkPlaygroundSecret) {
                proxyReq.setHeader("x-playground-token", sdkPlaygroundSecret);
              }
            });
          },
        },
      },
    },
  };
});
