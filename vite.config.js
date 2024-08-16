import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemapPlugin from "vite-plugin-sitemap";

export default defineConfig({
  plugins: [
    react(),
    sitemapPlugin({
      hostname: "https://www.katilimsigortacisi.com", // Sitenizin ana URL'sini buraya yazın
    }),
  ],
  build: {
    outDir: "dist", // Çıktı dizinini doğru ayarlayın
  },
});
