---
name: cs312-lecture-notes
description: Use when creating or editing lecture notes (MDX files in src/content/docs/lectures/). Enforces the concept-first, prose-heavy, investigation-ready style of the CS 312 course. Always load this skill before writing or editing any lecture file.
---

# Lecture Notes Style Guide

This skill governs how lecture notes are written and revised for the CS 312 course website (Astro/Starlight, MDX format). Every lecture in this course has at least one hands-on activity that illustrates the concepts during class, but the lecture notes themselves never mention those activities, labs, or assignments.

## What Lecture Notes Are For

Lecture notes are explanations in the Diátaxis sense: understanding-oriented material that permits reflection. They are not tutorials (step-by-step tasks), not how-to guides (task-oriented procedures), and not reference material (dry enumeration of facts). Their purpose is to deepen and broaden the student's understanding of a topic so that all the other things they do make sense and connect.

The perspective of an explanation is higher and wider than a tutorial or a how-to guide. It does not take the student's eye-level view; it steps back to survey the whole terrain. A student reading a lecture note should come away with a web of connections: why things are the way they are, how they relate to each other, what the tradeoffs are, and how the concepts fit into a larger system.

**Make connections.** Lecture notes weave a web of understanding. Connect concepts to each other, to prior lectures, to future lectures, and to things students already know from the real world. A concept that sits in isolation is fragile; one that connects to many other things is durable.

**Provide context.** Explain why things are so. Design decisions, historical reasons, technical constraints, and real-world consequences all belong here. Do not just state what something is; explain why it exists, what problem it solves, and what would break without it.

**Address the bigger picture.** Discuss history, alternatives, tradeoffs, and the evolution of ideas. These are not digressions; they are the connective tissue of understanding.

**Admit opinion and perspective.** Explanation can and should consider alternatives, counterexamples, and different approaches to the same question. All knowledge is shaped by perspective; acknowledging this builds richer understanding than presenting a single view as the only one.

**Keep explanation bounded.** Explanation tends to absorb other things. Resist the urge to include step-by-step instructions or reference tables that belong elsewhere. If a concept needs a procedure to illustrate it, show the key command with prose explanation around it, not a tutorial walkthrough.

**Use the language of explanation.** Lecture notes should sound like a thoughtful expert talking through a subject:

- "The reason X works this way is because historically..."
- "Y is better than Z for this use case because..."
- "An X in this context is analogous to a Y in..."
- "Some engineers prefer the first approach because... but this comes with the tradeoff that..."
- "Notice that X and Y are solving the same underlying problem in different ways."

## Workflows

CS 312 lectures move through three states. The skill behaves slightly differently in each.

**Creating a new lecture (draft).** Create the file in `src/content/docs/lectures/` with `draft: true` in the frontmatter. Populate the `ai-summary` comment block (see below), fill in the rest of the frontmatter, and write an initial skeleton that follows the structure rules in this skill. Do not touch `schedule.mdx` yet: a link to a `draft: true` page produces a 404 on the live site.

**Iterating on a draft lecture.** Edit content freely. Keep `draft: true`. Update the `ai-summary` block whenever coverage, prerequisites, or cross-page relationships change. If the draft matures enough that you believe it is ready for students, say so in your reply. The instructor is the only person who flips the draft flag (see Draft Flag Policy).

**Editing a published lecture** (no `draft` key, or `draft: false`). Preserve the published state. Refresh the `ai-summary` block only if coverage or cross-page relationships materially change. If you are restructuring, re-read the pages named in `ai-summary` (previous lecture, next lecture, paired activities, supported labs) to avoid creating duplication or gaps with them.

## Draft Flag Policy

**Never flip `draft: true` to `draft: false` yourself, and never remove the `draft` key.** The instructor is the only person who publishes a page. If you believe a lecture is ready, say so in your reply and let the instructor decide. Treat the presence of `draft: true` as authoritative: the page is not yet a source of truth, and other pages must not link to it as if it were.

If the instructor asks you to publish the lecture, run the Schedule Alignment check below first, propose any missing schedule update, and only flip the flag after the instructor confirms.

## Schedule Alignment

`src/content/docs/introduction/schedule.mdx` is the canonical week-by-week plan and is the student's source of truth. Each week table lists lectures, labs, and assignments with markdown links. A link to a `draft: true` page produces a 404; a non-draft lecture that is missing from the schedule is effectively invisible to students.

When the instructor asks you to publish a lecture (remove `draft: true`):

1. Confirm the lecture is named in the correct week in `schedule.mdx`.
2. If named only in prose (because it used to be a draft), propose converting the name to a markdown link in the form `[Title](/lectures/<slug>/)`.
3. If the adjacency implied by `schedule.mdx` disagrees with `prereq_lectures` or `followup_lectures` in the `ai-summary` block, flag the mismatch before changing anything.

Do not edit `schedule.mdx` without stating the proposed change first and getting the instructor's confirmation.

## Before Writing or Editing

1. **Read the schedule** (`src/content/docs/introduction/schedule.mdx`) to understand where this lecture sits in the course sequence.
2. **Read the previous lecture** (by `sidebar.order` in frontmatter) to verify you do not re-explain concepts already covered. Reference them briefly instead ("As covered in the Virtualization lecture, ...").
3. **Read the next lecture** (by `sidebar.order`) to understand what this lecture must prepare students for. Lay conceptual groundwork without duplicating content that belongs in the next lecture.
4. **Check for overlap**: if a concept is thoroughly explained in an adjacent lecture, do not re-explain it. A brief forward or backward reference with a phrase like "covered in [Lecture Name]" is sufficient.
5. **Read the `ai-summary` blocks** of the previous lecture, next lecture, and any paired activity or supported lab. They summarize coverage in under 20 lines each and are far cheaper than re-reading entire pages.

## Frontmatter

```yaml
---
title: "Descriptive Title"
description: "One-sentence summary: what concepts this lecture covers and why they matter."
sidebar:
  order: <number>
---
```

- `order` determines sequence in the sidebar and defines prerequisite/successor relationships.
- Set `draft: true` while developing. Only the instructor removes it. See **Draft Flag Policy** above.

## Imports

Only import components you actually use. The available components are:

```mdx
import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';
import HistoricalNote from '/src/components/HistoricalNote.astro';
import FigureWithCaption from '/src/components/FigureWithCaption.astro';
```

- **Aside**: tips, notes, cautions. Use `type="tip"`, `type="note"`, or `type="caution"`. Always add a `title` attribute.
- **HistoricalNote**: for historical context that enriches understanding but is not required knowledge. Always include a `title` attribute.
- **FigureWithCaption**: for images with captions. Always use this component for images.
- **Steps**: ordered procedural steps (rare in lecture notes; more common in activities).
- **Tabs/TabItem**: for OS-specific or distribution-specific variations (rare in lectures).

Do NOT import `ActivityQuestion`, `RubricTable`, or `LabSubmissionNote` in lecture notes.

## AI Summary Block

Every lecture starts with an `ai-summary` MDX comment immediately after the imports. This is a terse, parseable record of what the lecture covers and how it connects to other pages. It is hidden from students but lets other tooling (and other GenAI sessions) verify cross-page alignment without reading the full lecture.

````mdx
{/* ai-summary
type: lecture
slug: <filename without .mdx>
order: <sidebar.order>
covers: <main concepts, semicolon-separated, one line, under 200 chars>
prereq_lectures: <comma-separated slugs, or empty>
followup_lectures: <comma-separated slugs, or empty>
paired_activities: <comma-separated slugs, or empty>
supports_labs: <comma-separated slugs, or empty>
*/}
````

Rules:

- `covers` is a one-line semicolon-separated list of main topics, not a table of contents.
- Every slug must be the filename of a real page (without `.mdx`). Leave a field blank (no value) if nothing applies.
- Update the block whenever coverage, prerequisites, or cross-page relationships change.
- Do not move or rename the block. Tooling finds it by the `ai-summary` marker at the top of the file.

**Example** (`hardware-fundamentals.mdx`):

````mdx
{/* ai-summary
type: lecture
slug: hardware-fundamentals
order: 1
covers: motherboard/CPU platform; memory (DDR, ECC); storage (SATA, NVMe, PCIe); PSU and ATX; cooling and form factors; POST
prereq_lectures:
followup_lectures: virtualization-basics, linux-server-planning-and-configuration
paired_activities: hardware-build-spec
supports_labs: the-bare-metal
*/}
````

## Structure

### Opening Paragraph (The Problem Statement)

Every lecture begins with one or two paragraphs that establish *why* this topic matters. The opening should:

- Present concrete, relatable problems that a sysadmin or developer would face.
- Make the student feel the pain of not knowing the material.
- Avoid naming any specific activity, lab, or assignment.
- End by previewing what the lecture will cover and what the student will be able to do afterward.

**Tone to aim for:** Direct and grounded in operational reality. The reader should feel the problem immediately.

**Example of strong opening prose:**

> A Linux server is just Linux, with the same kernel, the same commands, and the same file hierarchy, but configured deliberately: right-sized for its workload, secured for network exposure, and arranged so that services start reliably and can be debugged when they do not. This lecture walks through the decisions and tools that matter from the moment you choose a distribution to the moment a service is running and monitored.

**Another example:**

> A server that nobody can connect to, a web application that times out intermittently, a database that suddenly stops responding: these are networking problems, and they will land on your desk.

**Weak openings to avoid:**

- "In this lecture we will cover..." (too passive, no urgency)
- "Networking is an important topic because..." (too abstract)
- "This lecture is about X, Y, and Z." (table of contents, not a problem statement)

### Section Structure

Every section (`##`) and subsection (`###`) must begin with an introductory paragraph that:

1. Explains what this section covers and why it matters in the context of the lecture.
2. Connects to previous sections where relevant ("Building on the socket and chipset foundation, memory determines...").
3. Sets up the concepts before any code blocks, tables, or asides appear.

Never start a section with a code block, table, list, or component. Always lead with prose.

### Concept Depth

Lecture notes are **heavy on concepts**. Every technical term, protocol, tool, or mechanism must be explained when first introduced:

- Define the term in plain language.
- Explain how it works at the level appropriate for the course.
- Give a specific, concrete example.
- Explain why it matters operationally (what breaks if you get it wrong, what it enables when you get it right).

Do not assume students already know a term unless it was defined in a previous lecture. If referencing a term from a previous lecture, a brief parenthetical reminder is helpful: "NAT (Network Address Translation) rewrites..."

**Example of good concept depth** (defining a technical concept the right way):

> **Swap** is disk space the kernel can use as an overflow area for memory pages that are not currently active. Swap is much slower than RAM, so it is not a performance feature. It is a pressure-relief valve. A small amount of swap can keep a machine alive long enough to recover from a memory spike instead of immediately killing processes.

**Example of concept with tradeoffs included:**

> A **rolling-release** distribution continuously publishes new package versions instead of bundling them into large, infrequent releases. Arch is the canonical example. The advantage is freshness: new kernels, drivers, compilers, and language runtimes appear quickly. The tradeoff is operational volatility. A server on a rolling distribution asks you to absorb change continuously, which is useful for learning and desktop experimentation but usually a poor default for production infrastructure unless your team is intentionally staffed and tooled for that pace.

### Prose Over Lists

Favor prose paragraphs over bullet lists. Use lists only when:

- Presenting a set of discrete, parallel items (e.g., a list of namespace types, a list of ports).
- Comparing options side by side.
- Providing actionable guidelines or checklists at the end of a section.

When a concept can be explained in a flowing paragraph, do so. Do not fragment explanations into bullets.

### Tables

Use tables for structured comparisons (port numbers, namespace types, filesystem features, command flags). Always introduce the table with a sentence explaining what it shows and why it matters.

### Code Blocks

- Use fenced code blocks with language identifiers (`bash`, `yaml`, `dockerfile`, `ini`, etc.).
- Precede every code block with a sentence or paragraph explaining what the command does and why you would use it.
- Include comments inside code blocks sparingly; explain in prose above the block instead.
- Show realistic, runnable examples. Avoid pseudo-code unless illustrating a pattern.

### Asides

- **`<Aside type="tip">`**: practical advice, best practices, operational shortcuts.
- **`<Aside type="note">`**: supplementary information, context, or clarifications that are useful but not essential to the main flow.
- **`<Aside type="caution">`**: common mistakes, dangerous defaults, things that break silently.
- Always give asides a `title` attribute.
- Do not overuse asides. If something is central to the lecture, put it in the main prose.

**Example of a well-formed Aside:**

```mdx
<Aside type="tip" title="Prefer LTS and Stable Releases">
For servers, always prefer an LTS or Stable release over a rolling or short-lived release. A server that quietly drifts out of security support is a liability you may not notice until it is too late.
</Aside>
```

### HistoricalNote

Use `<HistoricalNote title="...">` for historical context that enriches understanding: the origin of a technology, the problem it was designed to solve, key people involved. These should be self-contained and interesting. They are optional; not every lecture needs one, but most benefit from at least one.

**Example of content appropriate for a HistoricalNote:**

> Before UEFI and GPT became normal, PCs booted using legacy BIOS and the MBR (Master Boot Record). The MBR is the first 512-byte sector of a disk. It contained both a tiny piece of boot code and the partition table. That design was historically important but severely constrained: 512 bytes is barely enough for a stub loader, and the classic MBR partition table supports only four primary partitions and has a 2 TB addressing limit.

### Examples

Use concrete, specific examples throughout. Prefer:

- Real tools, real commands, real output.
- Scenarios a sysadmin would encounter ("You SSH into an EC2 instance and...").
- Relatable contexts: home routers for NAT, university networks for subnetting, cloud instances for VMs.

Avoid:

- Abstract "imagine a system that..." without specifics.
- Contrived scenarios that would never occur in practice.

**Example of concrete operational grounding:**

> In practice, you should choose a distribution using three filters. First, does the software you need officially support it? Database vendors, security agents, and monitoring tools often document only a subset of distributions. Second, does your team already know it? A familiar distribution with boring tooling is often safer than a theoretically superior one nobody can operate confidently at 2 AM. Third, does its release model match the workload?

### Links

When first introducing a concept, link to external documentation or resources that provide authoritative information. You can link to official documentation, RFCs, or reputable explainers including good Wikipedia articles. Use markdown links in the prose. Do not duplicate these links in the Resources section at the end; the Resources section is for additional learning, not for every reference.

**Do NOT link to other lectures in the course.** Cross-lecture references belong in prose only: "as covered in the Virtualization lecture" or "the Networking Fundamentals lecture goes deeper on this." Hyperlinking between lecture pages creates maintenance coupling and pulls readers away from the current page. Name the lecture in prose; do not link to it.

## Penultimate Section: Takeaways

The second-to-last section should be a prose synthesis that:

- Ties the lecture's concepts together into a coherent narrative.
- Traces a realistic end-to-end scenario that touches multiple concepts from the lecture.
- Reinforces what the student should now be able to do or reason about.
- Optionally names adjacent lectures in prose to orient the student, without linking to them.

This section should be titled "Takeaways". It should be prose, not bullets.

## Final Section: Resources

The last section is always `## Resources`. It contains an unordered list of external links where students can learn the same concepts through different media or go deeper. Include a mix of:

- YouTube videos (crash courses, conference talks, deep dives)
- Official documentation
- Blog posts or articles from reputable sources
- Books (if particularly relevant)

Format each link as:

```mdx
- <a href="URL" target="_blank" rel="noopener noreferrer">Title (Author or Channel Name) (Source Type)</a>
```

No annotations or descriptions on resource links; the title should be self-explanatory. Aim for 5-12 resources per lecture.

## Writing Style

### Prose Rules

- **No emdashes.** Use proper punctuation instead: colons, semicolons, commas, periods, or parentheses. This applies to both the Unicode character (`—`) and the `--` convention.
- **Favor active voice.** "The router rewrites the source address" over "The source address is rewritten by the router."
- **Write in second person** when addressing the student: "You will see...", "You can inspect...", "Your next step is..."
- **Use present tense** for concepts that are always true: "DNS translates names to addresses." Use future tense for what students will do: "By the end you will be able to..."
- **Define acronyms on first use**: "DHCP (Dynamic Host Configuration Protocol)" then just "DHCP" afterward.
- **Be precise with technical terms.** Do not say "the server" when you mean "the DHCP server." Do not say "the file" when you mean "/etc/resolv.conf."

### Tone Calibration

The writing should sound like a knowledgeable colleague who respects the reader's intelligence. It is direct, not formal. It does not hedge excessively, but it admits uncertainty and opinion where appropriate. The voice is active, grounded, and unhurried. It does not talk down to the reader, but it also does not skip steps or assume shortcuts.

**Good:** "Arch Linux is excellent for understanding Linux because it exposes more of the system directly and assumes less. That same quality makes it less forgiving operationally. On a production server, the question is not 'Can Arch do this?' but 'Do you want this server to require constant careful attention?' Usually the answer is no."

**Too formal/distant:** "Arch Linux provides an educational environment but is not recommended for production deployments due to its rolling-release model and lack of stability guarantees."

**Too casual/loose:** "Arch is cool for learning stuff but you probably don't want it on a real server lol."

### What Lecture Notes Must NOT Contain

- **No references to activities, labs, or assignments.** The lecture stands alone as a conceptual reference. Students and instructors will naturally connect lecture concepts to hands-on work, but the notes themselves never say "In the upcoming lab..." or "The activity will ask you to..."
- **No tutorial-style walkthroughs.** Lecture notes explain concepts and show illustrative commands. They do not guide students step-by-step through a task. That belongs in activities.
- **No running scenarios that thread through the entire lecture.** Use multiple independent examples. A "20-person office" or "building a web app" scenario that persists across all sections creates artificial coupling and makes individual sections harder to reference independently.
- **No setup instructions** (installing Docker, creating an AWS account, etc.). Those belong in activities or labs.
- **No mention of "students" or "you will do in class."** The lecture notes are a timeless reference, not a course schedule. They should not assume any particular timeline or mode of engagement.

### What Lecture Notes SHOULD Contain

- Deep conceptual explanations with the "why" always present.
- Concrete examples using real tools and real output.
- Operational context: what breaks, what to check, how to diagnose.
- Historical context where it enriches understanding.
- Prose references to adjacent lectures by name ("as covered in the Virtualization lecture"). Never hyperlink to other lectures.
- Tables for structured comparisons.
- Code blocks for illustrative commands (not step-by-step tutorials).

## Length Calibration

Proper class lectures in this course range roughly **6,000 to 10,000 words**, with a typical band of **7,000 to 9,000 words**. Aim for that band on new lectures. A lecture under 6,000 words usually means important concepts were skipped or flattened into lists; a lecture over 10,000 words usually means tutorial or reference material has crept in and should be cut or moved to the paired activity.

Section-overview pages like `introduction.mdx` are an explicit exception: they are the front-of-section tour, not class lectures, and run under 1,000 words.

Word count is a diagnostic, not a target. If a topic legitimately needs more space to be explained well, use it. If it does not, stop. Run `wc -w src/content/docs/lectures/<file>.mdx` after a major edit to sanity-check you are in the band.

## Factual Currency

Lecture notes age quickly on versions, standards, pricing, and default commands. Before writing any claim that names a specific version, generation, size, or default, verify it from an authoritative source: official documentation, release notes, standards-body sites, or recent primary sources. Examples of things that drift in this course's scope:

- Tool minimum versions (Java for Paper, Docker Engine, Terraform CLI, Kubernetes minor versions)
- Hardware generations (DDR version, PCIe generation, ATX PSU generation)
- OS lifecycle years (Ubuntu LTS support windows, RHEL major lifetimes)
- AWS service defaults and Free Tier / Academy quotas
- Command syntax (`docker compose` vs `docker-compose`, `systemctl` flags, `ip` vs `ifconfig`)

If you cannot verify something quickly, leave `{/* TODO: verify <claim> */}` next to the claim in the MDX and call it out in your reply rather than guessing. Concrete, falsifiable claims that turn out to be wrong do the most damage to a lecture's authority.

## Validation

After writing or editing, run:

```bash
bun run build
```

This validates the MDX syntax and catches import errors, broken component usage, and other build-time issues. Fix any errors before considering the work complete.
