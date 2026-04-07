---
name: lecture-notes
description: Use when creating or editing lecture notes (MDX files in src/content/docs/lectures/). Enforces the concept-first, prose-heavy, investigation-ready style established by hardware-fundamentals, virtualization-basics, linux-server-planning-and-configuration, and networking-fundamentals-lan-wan.
user_invocable: true
---

# Lecture Notes Style Guide

This skill governs how lecture notes are written and revised for the CS 312 course website (Astro/Starlight, MDX format). Every lecture in this course has at least one (and up to two) hands-on activities that illustrate the concepts during class, but the lecture notes themselves never mention those activities, labs, or assignments.

## What Lecture Notes Are For

Lecture notes are explanations in the Diátaxis sense: understanding-oriented material that permits reflection. They are not tutorials (step-by-step tasks), not how-to guides (task-oriented procedures), and not reference material (dry enumeration of facts). Their purpose is to deepen and broaden the student's understanding of a topic so that all the other things they do (activities, labs, assignments) make sense and connect.

The perspective of an explanation is higher and wider than a tutorial or a how-to guide. It does not take the student's eye-level view; it steps back to survey the whole terrain. A student reading a lecture note should come away with a web of connections: why things are the way they are, how they relate to each other, what the tradeoffs are, and how the concepts fit into a larger system.

**Make connections.** Lecture notes weave a web of understanding. Connect concepts to each other, to prior lectures, to future lectures, and to things students already know from the real world. A concept that sits in isolation is fragile; one that connects to many other things is durable.

**Provide context.** Explain why things are so. Design decisions, historical reasons, technical constraints, and real-world consequences all belong here. Do not just state what something is; explain why it exists, what problem it solves, and what would break without it.

**Address the bigger picture.** Discuss history, alternatives, tradeoffs, and the evolution of ideas. Lecture notes are the right place to say "Before DNS, every computer maintained a flat file called HOSTS.TXT" or "Docker chose this design because the alternative required modifying the guest OS." These are not digressions; they are the connective tissue of understanding.

**Admit opinion and perspective.** Explanation can and should consider alternatives, counterexamples, and different approaches to the same question. "NAT is elegant for home networks but creates headaches for peer-to-peer applications" is legitimate lecture note content. All knowledge is shaped by perspective; acknowledging this builds richer understanding than presenting a single view as the only one.

**Keep explanation bounded.** Explanation tends to absorb other things. Resist the urge to include step-by-step instructions or reference tables that belong elsewhere. If a concept needs a procedure to illustrate it, show the key command with prose explanation around it, not a tutorial walkthrough. If something is purely a reference (a full list of flags, every possible option), link to external documentation rather than reproducing it.

**Use the language of explanation.** Lecture notes should sound like a thoughtful expert talking through a subject:

- "The reason X works this way is because historically..."
- "Y is better than Z for this use case because..."
- "An X in this context is analogous to a Y in..."
- "Some engineers prefer the first approach because... but this comes with the tradeoff that..."
- "Notice that X and Y are solving the same underlying problem in different ways."

## Before Writing or Editing

1. **Read the schedule** (`src/content/docs/introduction/schedule.mdx`) to understand where this lecture sits in the course sequence.
2. **Read the previous lecture** (by `sidebar.order` in frontmatter) to verify you do not re-explain concepts already covered. Reference them briefly instead ("As covered in the Virtualization lecture, ...").
3. **Read the next lecture** (by `sidebar.order`) to understand what this lecture must prepare students for. Lay conceptual groundwork without duplicating content that belongs in the next lecture.
4. **Read existing lecture notes** in `src/content/docs/lectures/` that are already polished (hardware-fundamentals, virtualization-basics, linux-server-planning-and-configuration, networking-fundamentals-lan-wan, containerization-with-docker) to calibrate tone and depth.
5. **Check for overlap**: if a concept is thoroughly explained in an adjacent lecture, do not re-explain it. A brief forward or backward reference with a phrase like "covered in [Lecture Name]" is sufficient.

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
- Set `draft: true` while developing; remove it when ready for students.

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
- **Steps**: ordered procedural steps (rare in lecture notes; more common in activities and labs).
- **Tabs/TabItem**: for OS-specific or distribution-specific variations (rare in lectures).

Do NOT import `ActivityQuestion`, `RubricTable`, or `LabSubmissionNote` in lecture notes.

## Structure

### Opening Paragraph (The Problem Statement)

Every lecture begins with one or two paragraphs that establish *why* this topic matters. The opening should:

- Present concrete, relatable problems that a sysadmin or developer would face.
- Make the student feel the pain of not knowing the material.
- Avoid naming any specific activity, lab, or assignment.
- End by previewing what the lecture will cover and what the student will be able to do afterward.

**Good example** (from hardware-fundamentals):
> A server randomly reboots under load: is it the PSU, faulty RAM, or a thermal issue? A new workstation will not POST. A storage upgrade doubles cost but only marginally improves throughput because the bottleneck is elsewhere in the system. As a system administrator, these are the hardware situations that will land on your desk.

**Good example** (from networking-fundamentals):
> A server that nobody can connect to, a web application that times out intermittently, a database that suddenly stops responding: these are networking problems, and they will land on your desk.

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

### HistoricalNote

Use `<HistoricalNote title="...">` for historical context that enriches understanding: the origin of a technology, the problem it was designed to solve, key people involved. These should be self-contained and interesting. They are optional; not every lecture needs one, but most benefit from at least one.

### Examples

Use concrete, specific examples throughout. Prefer:

- Real tools, real commands, real output.
- Scenarios a sysadmin would encounter ("You SSH into an EC2 instance and...").
- Relatable contexts: home routers for NAT, university networks for subnetting, cloud instances for VMs.

Avoid:

- Abstract "imagine a system that..." without specifics.
- Contrived scenarios that would never occur in practice.

## Penultimate Section: Putting It All Together (or Takeaways)

The second-to-last section should be a prose synthesis that:

- Ties the lecture's concepts together into a coherent narrative.
- Traces a realistic end-to-end scenario that touches multiple concepts from the lecture.
- Reinforces what the student should now be able to do or reason about.
- Optionally connects forward to the next lecture or future topics.

This section should be titled "Putting It All Together" or a similar descriptive name. It should be entirely prose, no code blocks or tables.

## Final Section: Resources

The last section is always `## Resources`. It contains an unordered list of external links where students can learn the same concepts through different media or go deeper. Include a mix of:

- YouTube videos (crash courses, conference talks, deep dives)
- Official documentation
- Wikipedia articles for foundational concepts
- Blog posts or articles from reputable sources
- Books (if particularly relevant)

Format each link as:

```mdx
- <a href="URL" target="_blank" rel="noopener noreferrer">Title (Source Type)</a>
```

No annotations or descriptions on resource links; the title should be self-explanatory. Aim for 5-12 resources per lecture.

## Writing Style

### Prose Rules

- **No emdashes.** Use proper punctuation instead: colons, semicolons, commas, periods, or parentheses. This applies to both the Unicode character and the `--` convention.
- **Favor active voice.** "The router rewrites the source address" over "The source address is rewritten by the router."
- **Write in second person** when addressing the student: "You will see...", "You can inspect...", "Your next step is..."
- **Use present tense** for concepts that are always true: "DNS translates names to addresses." Use future tense for what students will do: "By the end you will be able to..."
- **Define acronyms on first use**: "DHCP (Dynamic Host Configuration Protocol)" then just "DHCP" afterward.
- **Be precise with technical terms.** Do not say "the server" when you mean "the DHCP server." Do not say "the file" when you mean "/etc/resolv.conf."

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
- Forward and backward references to other lectures in the course.
- Tables for structured comparisons.
- Code blocks for illustrative commands (not step-by-step tutorials).

## Validation

After writing or editing, run:

```bash
bun run build
```

This validates the MDX syntax and catches import errors, broken component usage, and other build-time issues. Fix any errors before considering the work complete.
