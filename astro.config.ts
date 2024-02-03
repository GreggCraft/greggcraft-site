import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import uno from "@unocss/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://greggcraft.uk",
  integrations: [mdx(), uno()],
  adapter: cloudflare(),
  output: "server",
});
