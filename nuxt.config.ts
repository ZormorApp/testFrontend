// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  alias: {
    "@": "./"
  },
  devServer: {
    port: 3100
  },
  css: [
    "./assets/css/main.css"
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxt/image"],

  app: {
   head: {
    title : "zormor app",
    meta: [
      {name: "description" , content: "everything about Zormor" }
    ]
   }
  }

})