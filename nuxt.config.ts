// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path"
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { enabled: false } },
  css: ["./app/assets/css/main.css"],
  modules: ["@scalar/nuxt", "nuxt-csurf", "nuxt-file-storage"],
  nitro: {
    experimental: { openAPI: true },
    openAPI: { ui: { scalar: { route: "/docs"} } },
  },
  fileStorage: {
    mount: resolve("./storage/uploads/products"),
  },
  vite: {
    plugins: [tailwindcss({ optimize: { minify: true } })],
  },
});
