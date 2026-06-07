import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import typesafeRoutes from "astro-typesafe-routes";

export default defineConfig({
  integrations: [typesafeRoutes()],
  vite: {
    plugins: [tailwindcss()],
  },
});
