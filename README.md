# CS 312: System Administration

This repository contains the source code for the CS312 website.

## Contributing

Course-design and content work is tracked in [issues](https://github.com/adulbrich/cs312/issues),
organised by area (`area:lectures`, `area:labs`, ...) and by kind of work
(`type:content`, `type:decision`, ...). The **Next Iteration** milestone holds what is
committed for the next offering; **Backlog** holds what is wanted but not yet scheduled.

Found a typo, a broken link, or an instruction that does not work? Please open an issue.

The per-term instructor checklist lives in
[`.github/ISSUE_TEMPLATE/term-setup.md`](.github/ISSUE_TEMPLATE/term-setup.md);
open a fresh copy of it at the start of each term.


## PDFs

The `scripts/generate-pdfs.sh` helper will retrieve and generate individual PDFs for all lectures, studios, assignments, and practicalities from the live deployment. It will then generate a combined version of all files. To run it, use:

```bash
cd scripts
chmod +x ./generate-pdfs.sh
./generate-pdfs.sh
```

You can change the `BASE` variable in the script to point to a different deployment if needed.

To generate slides from marp, use:

```shell
cd slides
bun x @marp-team/marp-cli@latest intro.md --pdf --allow-local-files
```

To generate a PDF from a single MD file, use:

```shell
# TODO: improve because this is very average
pandoc input.md --pdf-engine=wkhtmltopdf -V margin=1in -o output.pdf
```

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```text
.
├── .claude/
│   └── skills/
├── .github/
│   └── ISSUE_TEMPLATE/
├── canvas/
├── public/
├── scripts/
├── slides/
├── src/
│   ├── assets/
│   ├── components/
│   ├── content/
│   │   ├── docs/
│   │   └── config.ts
│   └── env.d.ts
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

Important directories and files include:

- `.claude/skills/`: authoring skills that define the house style for lectures, labs, activities, and assignments
- `canvas/`: assets for Canvas LMS (TSV rubrics, HTML assignments). The assignment pages import these TSVs at build time, so they are not optional
- `scripts/`: helper scripts for generating PDFs, etc.
- `slides/`: slide decks for lectures in Marp Markdown format
- `src/content/docs/`: all lecture notes, studios, assignments, practicalities, and other documentation, in `mdx` format
- `src/components/`: reusable components for assignments and lectures, including a LaTeX component, and reactive Svelte components for assignments
- `astro.config.mjs`: Astro configuration file, update sidebar entries here

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:4321`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

## Resources

- [Starlight Getting Started](https://starlight.astro.build/getting-started/) -- Astro template
- [TailwindCSS](https://tailwindcss.com/) -- for styling
- [Svelte](https://svelte.dev/docs/svelte/overview) -- for reactive components
- [Starlight Page Actions](https://github.com/dlcastillop/starlight-page-actions), or alternatively [Starlight Contextual Menu](https://github.com/corsfix/starlight-contextual-menu)
- [Starlight Links Validator](https://github.com/HiDeoo/starlight-links-validator)
- [How to create an Astro LaTeX component](https://danidiaztech.com/create-astro-latex-component/) -- LaTeX component
- [KaTeX: The fastest math typesetting library for the web.](https://katex.org/) -- LaTeX component
- [Mermaid User Guide](https://mermaid.js.org/intro/getting-started.html) -- Mermaid component

## License

Licensed under [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/) (CC BY-SA 4.0). See [`LICENSE`](LICENSE).

You may share and adapt this material, including commercially, provided you give appropriate credit and license your adaptations under the same terms.
