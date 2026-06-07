import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

import typesafeRoutes from "astro-typesafe-routes";

export default defineConfig({
  integrations: [typesafeRoutes()],
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
});
