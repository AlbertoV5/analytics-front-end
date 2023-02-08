import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import robotsTxt from "astro-robots-txt";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  // site: 'https://main.d3a2hjahy8dg4j.amplifyapp.com',
  site: 'https://albertov5.github.io/hamx-front-end',
  base: '/hamx-front-end',
  integrations: [react(), robotsTxt(), sitemap(), compress()]
  // output: 'server'
});