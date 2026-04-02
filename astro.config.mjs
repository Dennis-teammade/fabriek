import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const siteUrl = process.env.SITE_URL || "https://aifabriek.be";

export default defineConfig({
  site: siteUrl,
  integrations: [sitemap()],
  output: "static"
});
