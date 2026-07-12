import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField, fontProviders } from "astro/config";
import typesafeRoutes from "astro-typesafe-routes";

export default defineConfig({
  adapter: netlify(),
  integrations: [typesafeRoutes(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "CodecPro",
      cssVariable: "--font-codec-pro",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/CodecPro-Regular.woff2"],
            weight: 400,
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/CodecPro-Bold.woff2"],
            weight: 700,
            style: "normal",
          },
        ],
      },
    },
  ],
  env: {
    schema: {
      MAILJET_API_KEY: envField.string({
        context: "server",
        access: "secret",
        default: "ac6bedaf9e8041c7d99f65822a864baf",
      }),
      MAILJET_API_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
    },
  },
});
