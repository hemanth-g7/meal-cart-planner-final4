import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",           // Accepts all incoming IPv4/IPv6 connections
    port: 8080,

    // ✅ Add your allowed ngrok domain here
    allowedHosts: [
      "29f271b52141.ngrok-free.app",  // Replace with your latest ngrok subdomain if it changes
    ],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
