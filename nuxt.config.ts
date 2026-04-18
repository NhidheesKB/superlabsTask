// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true, vscode: { enabled: false } },
  css: ["./app/assets/css/main.css"],
  modules: ["@scalar/nuxt", "nuxt-csurf", "nuxt-file-storage"],
  nitro: {
    experimental: { openAPI: true },
    openAPI: { ui: { scalar: { route: "/docs"} } },
  },
  fileStorage: {
    mount: "./uploads/images/product",
  },
  vite: {
    plugins: [tailwindcss({ optimize: { minify: true } })],
  },
});
