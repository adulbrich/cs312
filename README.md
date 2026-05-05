# CS 312: System Administration

This repository contains the source code for the CS312 website.

## To Do

### Next Iteration Plan

- [ ] Reframe the course around service ownership, engineering judgment, and process over tool syntax.
- [ ] Start each lab and assignment with a short service-ownership prompt: who uses this service, what promise are we making, what constraints cannot be violated, how will we know when that promise is broken, and what evidence proves success.
- [ ] Offer multiple tooling options when the learning objective is process rather than a specific vendor or product.
- [ ] Move observability and recoverability earlier so Ops 1 and Ops 2 already require basic health checks, log inspection, backup and restore evidence, and a simple detection plan.
- [ ] Use lecture time more often for stakeholder scenarios, design reviews, incident debriefs, and gamedays, while keeping labs implementation-heavy.
- [ ] Design judgment work for 70+ students as async-first decision studios with optional live debriefs, not as discussion-heavy in-class activities that depend on high attendance.
- [ ] Treat AI use as unavoidable rather than something to police away. Keep rubrics clear, allow AI as drafting/scaffolding support, and make students responsible for verification, evidence, and final decisions.
- [ ] Do not reward polished prose by itself. Weight local system evidence, verification of claims, trade-off reasoning, and the ability to defend a decision under the assignment's constraints.
- [ ] Add lightweight defense mechanisms for major submissions: short recorded walkthroughs, TA spot-audits, random viva questions, peer review, or brief lab check-ins.
- [ ] Use LLMs, when helpful, as stakeholder simulators and critique partners for async work, not as the sole judge of student decisions.
- [ ] Update assignment rubrics so a working system is necessary but not sufficient. Weight rollback plans, runbooks, alert quality, blast radius control, capacity and cost reasoning, and written justification more heavily.
- [ ] Include a few intentionally flawed or risky requirements so students practice pushing back and proposing safer alternatives.

### Course Design Backlog

- [ ] At term end, review slugs and titles for consistency across assignments, labs, activities, lectures, and practicalities. After renaming files, update Canvas and rely on filenames rather than duplicated slug values where possible.
- [ ] Check with TAs whether labs need more step-by-step depth relative to activities. Labs should stay more how-to focused and go slightly further operationally.
- [ ] Improve the project rubric.
- [ ] Draft an "AI-tolerant, not AI-proof" assessment pattern for the course: short structured judgment memo, tied to real system evidence, plus a cheap audit path.
- [ ] Build 4 to 5 async decision studios tied to existing labs and assignments, each with a short prompt, a compact deliverable, and a TA-friendly rubric.
- [ ] Create a reusable rubric for judgment quality: problem framing, constraint discovery, trade-off quality, safety and operability, evidence and verification, and clarity of recommendation.
- [ ] Expand the resources sections beyond reading to include videos, podcasts, and other media.
- [ ] Review the Linux Sysadmin Handbook for gaps in coverage.
- [ ] Consider guest lectures.

### Content and Tooling Backlog

- [ ] Add references to other HashiCorp tools where they genuinely fit, such as Vault, Nomad, and Consul.
- [ ] Revisit the First Container Orchestration Deployment (k3s) lab and change the MariaDB example to use a PVC-backed deployment in a future iteration.
- [ ] Build a small reusable To-Do application for future activities, using a frontend plus a Flask backend with Postgres, and optionally nginx as a reverse proxy.
- [ ] Keep the To-Do app intentionally small: create, list, update, complete, and delete tasks, with a health endpoint and environment-variable configuration.
- [ ] Package the To-Do app so it can appear in multiple activities: local development, containerization, reverse proxying, CI/CD, and Kubernetes deployment.
- [ ] Decide whether the frontend should be server-rendered in Flask or a separate lightweight frontend so the app stays simple enough for intro infrastructure work.
- [ ] Add seeded demo data and a reset path so activities can start from a known-good state without long setup.
- [ ] Prepare a progression path for the To-Do app across the course: run locally, containerize, add Postgres persistence, put nginx in front, deploy to Kubernetes, then add monitoring and logging.
- [ ] Decide whether GitOps should be required, optional, or discussed as one possible operating model.
- [ ] Decide whether and where to cover email as part of operations work, especially alert delivery or scheduled job output.
- [ ] Add the DNS exercise back from 2024.
- [ ] Evaluate honeypot content, such as T-Pot CE, as a possible addition.
- [ ] Investigate [Angie](https://en.angie.software/).

### Research Queue

- [ ] Watch [If I would start DevOps from 0 - How would I start and what would I learn](https://www.youtube.com/watch?v=Cpy20DnIDTI).
- [ ] Watch [Observability: the present and future, with Charity Majors](https://www.youtube.com/watch?v=SvEjS4-2WJQ).

## Instructor Checklist

Every term:

- [x] Create **AWS Academy** class
- [x] Add TAs to AWS Academy
- [x] Add students to AWS Academy
- [x] Add TAs to Canvas
- [ ] Create **GitHub Classroom** class and add TAs (optional for students)
- [ ] Update GitHub Classroom link in Canvas
- [ ] Update the version of this repository if making changes (`package.json`)

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

## 🚀 Project Structure

Inside of your Astro + Starlight project, you'll see the following folders and files:

```text
.
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
├── tailwind.config.mjs
└── tsconfig.json
```

Important directories and files include:

- `canvas/`: assets for Canvas LMS (TSV rubrics, HTML assignments)
- `scripts/`: helper scripts for generating PDFs, etc.
- `slides/`: slide decks for lectures in Marp Markdown format
- `src/content/docs/`: all lecture notes, studios, assignments, practicalities, and other documentation, in `mdx` format
- `src/components/`: reusable components for assignments and lectures, inlcuding a Latex component, and reactive Svelte components for assignments
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
