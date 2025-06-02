import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ✅ ADD THIS
import { resolve } from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // ✅ Tell Vite to fallback to index.html on 404
  build: {
    outDir: "dist",
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  // ✅ This is crucial for Vercel SPA deployments
  preview: {
    port: 8080,
    open: true,
    // 👇 Add this block
    historyApiFallback: true,
  },
}));
