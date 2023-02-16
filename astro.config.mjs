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
import purgecss from "astro-purgecss";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // site: 'https://main.d3a2hjahy8dg4j.amplifyapp.com',
  site: 'https://health-analytics-mx.github.io/ai-calculators/',
  // site: 'https://albertov5.github.io/hamx-dev/',
  // base: '/hamx-dev',
  base: '/ai-calculators',
  integrations: [react(), robotsTxt(), sitemap()], //purgecss()], // , compress()]
  // output: "server",
  // adapter: node({
  //   mode: 'standalone'
  // })
});