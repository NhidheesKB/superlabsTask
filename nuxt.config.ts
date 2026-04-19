// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true, vscode: { enabled: false } },
  css: ["./app/assets/css/main.css"],
  modules: ["@scalar/nuxt", "nuxt-csurf"],
  nitro: {
    experimental: { openAPI: true },
    openAPI: {
      ui: {
        scalar: {
          route: "/docs",
          servers: [
            {
              url: "https://superlabs-task-nhidhees.vercel.app/",
              description: "production",
            },
            { url: "http://localhost:3000/", description: "development" },
          ],
        },
      },
    },
  },

  vite: {
    plugins: [tailwindcss({ optimize: { minify: true } })],
  },
});
