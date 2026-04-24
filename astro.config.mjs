import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: "https://moritzvitt.github.io",
  base: isGitHubPages ? "/software-plantation-website" : "/",
  integrations: [mdx(), react()],
});
