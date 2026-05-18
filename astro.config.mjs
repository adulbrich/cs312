// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import mermaid from "astro-mermaid";
import starlightPageActions from 'starlight-page-actions';
import starlightLinksValidator from 'starlight-links-validator';
import vercel from "@astrojs/vercel";

const isVercelBuild = process.env.VERCEL === "1" || process.env.VERCEL === "true";

// https://astro.build/config
export default defineConfig({
  site: "https://cs312.alexulbrich.com",

  vite: {
    // @ts-ignore - type mismatch between @tailwindcss/vite and Astro's bundled Vite
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@astrojs/starlight", "@astrojs/starlight/locals"],
    },
    ssr: {
      optimizeDeps: {
        exclude: ["@astrojs/starlight", "@astrojs/starlight/locals"],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
      },
    },
  },

  integrations: [
    mermaid({
      theme: "dark",
      autoTheme: true,
    }),
    sitemap(),
    starlight({
      expressiveCode: {
        shiki: {
          langAlias: {
            promql: "txt",
            jinja2: "jinja",
          },
        },
      },
      plugins: [
        starlightLinksValidator(),
        starlightPageActions({
          baseUrl: "https://cs312.alexulbrich.com",
          actions: {
            markdown: false,
            custom: {
              grok: {
                label: "Open in Grok",
                href: "https://grok.com/?q=",
              },
            },
          },
        })
      ],
      title: "CS 312 System Administration",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/adulbrich/cs312",
        },
      ],
      head: [
        {
          tag: "script",
          attrs: {
            src: "/knowledge/js/script.outbound-links.js",
            "data-api": "/knowledge/api/event",
            "data-domain": "cs312.alexulbrich.com",
            defer: true,
          },
        },
      ],
      sidebar: [
        {
          label: "Overview",
          items: [{ autogenerate: { directory: "introduction" } }],
        },
        {
          label: "Practicalities",
          items: [{ autogenerate: { directory: "practicalities" } }],
        },
        {
          label: "Lecture Notes",
          items: [{ autogenerate: { directory: "lectures" } }],
        },
        {
          label: "Activities",
          items: [{ autogenerate: { directory: "activities" } }],
        },
        {
          label: "Labs",
          items: [{ autogenerate: { directory: "labs" } }],
        },
        {
          label: "Assignments",
          items: [{ autogenerate: { directory: "assignments" } }],
        },
        {
          label: "About",
          items: [{ autogenerate: { directory: "about" } }],
        },
      ],
      customCss: ["./src/styles/global.css"],
    }),
  ],

  ...(isVercelBuild ? { adapter: vercel() } : {}),
});