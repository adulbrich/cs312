---
name: cs312-labs
description: Use when creating or editing lab files (MDX files in src/content/docs/labs/). Enforces the how-to-guide structure, Pinnacle Provisions narrative, and question-before-tutorial pattern of CS 312 labs. Always load this skill before writing or editing any lab file.
---

# Lab Style Guide

This skill governs how labs are written and revised for the CS 312 course website (Astro/Starlight, MDX format). Labs are how-to guides in the Diátaxis sense: goal-oriented, task-focused, and addressed to a competent user who needs to accomplish something real. Their purpose is to give students a realistic operational task that practices the skills introduced in that week's lectures and activities. A well-designed lab should fit comfortably in a 1 hour 50 minute session, leaving time for questions and TA support.

A well-designed lab:

- Has a single, clear goal that the student can state before starting.
- Assumes competence. The student has attended lectures and done activities. The lab does not re-teach concepts; it puts them to use.
- Moves quickly to real action. There is no long preamble before the first command.
- Addresses real-world complexity: credentials that expire, resources that need cleanup, commands that behave differently across operating systems.
- Tells students what to watch for. The questions section primes students to notice specific things while they work.
- Closes the loop. The TA sign-off question confirms the lab is actually done, not just attempted.

## Workflows

CS 312 labs move through three states. The skill behaves slightly differently in each.

**Creating a new lab (draft).** Create the file in `src/content/docs/labs/` with `draft: true` in the frontmatter. Set `sidebar.order` to match the lab's week/sequence. Populate the `ai-summary` comment block (see below) before writing the lab body, and the LOs comment block alongside it. Do not link the lab from `schedule.mdx` yet: a link to a `draft: true` page produces a 404.

**Iterating on a draft lab.** Edit freely. Keep `draft: true`. Update the `ai-summary` block whenever prerequisites (lectures, activities, prior labs), the anchor tool, or the Pinnacle Provisions story beat change. If the draft matures enough that you believe it is ready for students, say so in your reply. The instructor is the only person who flips the draft flag (see Draft Flag Policy).

**Editing a published lab.** Preserve the published state. Update the `ai-summary` block on material changes. Verify every `prereq_lectures`, `prereq_activities`, and `prereq_labs` slug still exists and is published; a slug that is itself still in draft means the lab is leaning on unpublished content, which is a flag for the instructor.

## Draft Flag Policy

**Never flip `draft: true` to `draft: false` yourself, and never remove the `draft` key.** The instructor is the only person who publishes a page. If you believe a lab is ready, say so in your reply and let the instructor decide. Treat `draft: true` as authoritative: the lab is not a source of truth, and `schedule.mdx` must not link to it.

If the instructor asks you to publish the lab, run the Schedule Alignment check below first, propose any needed fix, and only flip the flag after the instructor confirms.

## Schedule Alignment

`src/content/docs/introduction/schedule.mdx` is the canonical week-by-week plan and is the student's source of truth. Each week table links the lab for that week.

When the instructor asks you to publish a lab (remove `draft: true`):

1. Confirm the lab is named in the correct week in `schedule.mdx`.
2. If named only in prose (because it used to be a draft), propose converting the name to a markdown link in the form `[Title](/labs/<slug>/)`.
3. Confirm every `prereq_lectures`, `prereq_activities`, and `prereq_labs` slug in the `ai-summary` block is published (no `draft: true`). A published lab that depends on unpublished prerequisites is a student-visible break.

Do not edit `schedule.mdx` without stating the proposed change first and getting the instructor's confirmation.

## Before Writing or Editing

1. **Read the schedule** (`src/content/docs/introduction/schedule.mdx`) to understand which week this lab falls in and which lectures precede it.
2. **Read the previous lab** to understand what infrastructure and files the student already has. Never ask students to set up something they already have.
3. **Read the corresponding lectures** to know which concepts the lab should exercise. The lab does not explain these concepts; it uses them.
4. **Read the corresponding activities** to know what was already practiced in a low-stakes environment. The lab should go deeper than the activity. Check what prerequisites students have from the activity (such as installing dependencies on their laptops).
5. **Read the `ai-summary` blocks** of the previous lab, the paired lectures, and any paired activities. They summarize scope and prerequisites in under 20 lines each and are far cheaper than re-reading entire pages.
6. **Identify the Pinnacle Provisions story beat.** Each lab advances the restaurant chain narrative. Find where the previous lab left off and continue the story logically.

## Frontmatter

```yaml
---
title: 'Short, Verb-Phrase Title (Tool or Technique)'
description: "Gerald's situation in one or two punchy sentences. Often includes a quote or concrete consequence."
sidebar:
  order: <number matching the lab's week/sequence>
---
```

- `description` is the Pinnacle Provisions hook, not a technical summary. It should make the reader feel the business problem immediately.
- Set `draft: true` while developing. Only the instructor removes it. See **Draft Flag Policy** above.
- Do not use emdashes in `description` or anywhere else.

## Imports

```mdx
import { Steps, Aside } from '@astrojs/starlight/components';
import LabSubmissionNote from '/src/components/LabSubmissionNote.astro';
```

- **Steps**: required for every procedural sequence. Every numbered action goes inside a `<Steps>` block.
- **Aside**: for warnings, tips, and notes about the immediate step. Always include a `title` attribute.
- **LabSubmissionNote**: placed immediately after the opening paragraph, before any section heading.

Do NOT import `ActivityQuestion`, `HistoricalNote`, `RubricTable`, or `FigureWithCaption` in labs.

## Structure

### Learning Objective Comment

Immediately after the imports, include a comment block listing the course Learning Objectives this lab addresses:

```mdx
{/* LOs:
- LO3: ...
- LO7: ...
*/}
```

This comment is invisible to students but helps the instructor map coverage.

### AI Summary Block

Directly after the LOs comment, include an `ai-summary` MDX comment. This is a terse, parseable record of what the lab does and what it depends on. It is hidden from students but lets other tooling (and other GenAI sessions) verify cross-page alignment without reading the full lab.

````mdx
{/* ai-summary
type: lab
slug: <filename without .mdx>
order: <sidebar.order>
week: <week number in schedule.mdx, 1-10>
prereq_lectures: <comma-separated slugs, or empty>
prereq_activities: <comma-separated slugs, or empty>
prereq_labs: <comma-separated slugs, or empty>
tool: <the new tool or technique this lab uses, one clause>
story_beat: <Pinnacle Provisions hook, one clause>
*/}
````

Rules:

- `week` is the week number in `schedule.mdx` (1-10).
- `prereq_lectures` names the lectures whose concepts this lab uses (not re-teaches).
- `prereq_activities` names activities whose low-stakes practice precedes this lab's higher-stakes use of the same tool.
- `prereq_labs` names labs whose infrastructure or state this lab inherits (e.g., a k3s cluster from a prior lab, the Terraform configuration from Lab 5).
- `tool` names the anchor tool or technique introduced in this lab. If several tools appear, name the primary one.
- `story_beat` is the Pinnacle Provisions hook compressed to a single clause.
- Update the block whenever prerequisites, the anchor tool, or the story beat change.

**Example** (`manual-web-server-deployment.mdx`):

````mdx
{/* ai-summary
type: lab
slug: manual-web-server-deployment
order: 3
week: 2
prereq_lectures: linux-server-planning-and-configuration, networking-fundamentals
prereq_activities: server-service-configuration
prereq_labs: cloud-environment-setup
tool: manual LAMP stack (Apache + PHP + MariaDB) on two EC2 instances
story_beat: Gerald wants a WordPress site, daughter picked it, budget is zero
*/}
````

### Opening Paragraph (The Story Beat)

The first paragraph (no heading) does three things:

1. Continues the Pinnacle Provisions narrative. Something has changed at the restaurant, or Gerald has made a request, or something broke.
2. Briefly explains the technical problem this creates.
3. Names the tool or technique the lab will use to solve it, and what the student will have by the end.

Keep it to 2-4 sentences. Do not explain how the tool works; the lecture did that.

**Pattern:**

```text
[The business situation at Pinnacle Provisions.] [What this means technically.] [What the student will do in this lab and what they will end up with.]
```

**Examples of strong opening paragraphs:**

> The website went down last Tuesday because someone ran `apt upgrade` and PHP broke. Gerald's exact words: "Can't you just put it in a box so this doesn't happen?" You are not sure he understands containers, but he is not wrong. Last lab, you installed Apache, PHP, MariaDB, and WordPress by hand: package by package, config file by config file. It took the entire session, and if you needed to do it again on a second server, you would have to repeat every step. In this lab, you will replicate your entire Lab 2 setup in about ten lines of Docker Compose configuration.

> Gerald's investor visited last week and asked, "How do you know your systems are healthy?" Gerald said, "We check." The investor asked, "How?" There was a long silence. In this lab, you will deploy Prometheus and Grafana on your k3s cluster, build a custom dashboard, define alerts, and trigger a real incident to see the detection-and-response loop in action.

**Avoid:**

- Opening with "In this lab, we will..." (too passive, no story)
- Explaining the tool conceptually (lecture already did this)
- Mentioning future labs or assignments

### LabSubmissionNote

Place `<LabSubmissionNote />` on its own line immediately after the opening paragraph, before `## Before You Start`. No blank line between the paragraph and the component.

### Before You Start

A brief bulleted list of exactly what the student needs before starting. Be specific: name the specific EC2 instances, files, or state from prior labs. For software, link to the official installation instructions rather than re-writing them.

```mdx
## Before You Start

You need:
- An AWS Academy Learner Lab environment
- The k3s cluster from Labs 7-8 with all workloads running
- SSH access to your EC2 instance
```

If any prerequisite requires non-trivial setup (like re-applying a Terraform configuration after a session restart), explain how here in 1-2 sentences.

### Concept Sections (Optional)

Some labs include a brief concept section between "Before You Start" and "Questions" to define 3-6 terms the student will encounter in the tutorial. Use this sparingly and only when:

- The tool or concept is brand new and the student genuinely cannot proceed without a working definition.
- The information is operational (what the tool does, what the command means) rather than conceptual (why it was designed that way).
- The information is not already covered in the lecture or activity. Do not re-teach concepts.

Keep each definition to 1-4 sentences. Use bold for the term. Do not explain history, alternatives, or tradeoffs; those belong in the lecture.

**Example of appropriate concept depth:**

> **Helm**: A package manager for Kubernetes. Helm **charts** bundle Kubernetes manifests, default configuration, and dependencies into installable packages, similar to how `apt` packages software for Debian-based systems.

**Example of too much depth (save for lecture):**

> Helm was created by Deis in 2015 and donated to the CNCF in 2018. It follows a client-server architecture (pre-v3) that was later simplified to client-only...

### Questions

The questions section appears before the tutorial, not after. This is the defining structural feature of CS 312 labs: students read the questions first, then look for the answers while working.

```mdx
## Questions

Watch for the answers to these questions as you follow the tutorial.

1. [Question with specific, observable answer.] *(N points)*
2. [Question.] *(N points)*
...
N. Get your TA's initials showing [specific, concrete evidence on screen]. *(N points)*
```

**Question design principles:**

- Every question has a specific, verifiable answer the student observes while working (a number, an ID, a status, a diff). Avoid questions whose answers require looking things up externally.
- Questions should span the tutorial: early questions check setup, middle questions check understanding of the core task, late questions check the final result.
- The final question always asks for TA initials on something visible on screen. This is the lab completion gate.
- Total points across all questions typically range from 20-30 points.
- Point values roughly reflect difficulty: factual observations (2-3 pts), comparison/reasoning (4-5 pts), TA sign-off (2-5 pts).

### Tutorial

The tutorial is the how-to portion of the lab. It is organized into `###` subsections, each covering one coherent phase of the task.

```mdx
## Tutorial

### Installing the Tool

[1-2 sentences: what we are doing in this phase and why it is a prerequisite.]

<Steps>

1. **Do the first action**

   ```bash
   command here
   ```

   [What this command does and what the student should see.]

2. **Do the second action**

   ...

</Steps>

### Configuring the Service

[1-2 sentences of context.]

<Steps>
...
</Steps>
```

**Rules for tutorial sections:**

- Every subsection begins with 1-2 sentences of prose before the first `<Steps>` block. Never start a subsection with a code block, list, or aside.
- Every numbered action in a `<Steps>` block has a bold title.
- Code blocks appear before explanation, not after.
- When a command produces output the student needs to read, show a representative example.
- Explain what each command does at the level of "what this does and what to look for," not "how the underlying system works."

**Example of a well-formed step:**

> **3. Verify the installation**
>
> ```bash
> terraform --version
> ```
>
> You should see `Terraform v1.x.x` (or higher). If you see `command not found`, the binary is not in your PATH; restart your terminal and try again.

**Example of too much explanation in a step (save for lecture):**

> Terraform uses a plugin-based architecture where each provider is a separate binary downloaded to `.terraform/`. The provider binary communicates with AWS via the AWS SDK, which wraps the REST API calls that actually create resources...

### Asides

- **`<Aside type="caution" title="...">`**: common mistakes, destructive operations, session-specific concerns (like rotating credentials).
- **`<Aside type="danger" title="...">`**: actions that will break something irreversibly if done wrong (deleting volumes, destroying state, running as root in production).
- **`<Aside type="note" title="...">`**: platform-specific variations, optional alternatives, or context that would interrupt the step prose.
- **`<Aside type="tip" title="...">`**: shortcuts or alternatives the student might prefer.

Always include a `title` attribute. Keep asides short: if it takes more than 3-4 sentences, it belongs in the step prose or a concept section.

### Cleanup (Optional)

If the lab creates AWS resources that cost money and are not needed by future labs, include a final cleanup section that destroys them:

```mdx
### Cleanup

Once your TA has initialed your work, destroy the resources to avoid unnecessary charges:

<Steps>

1. **Destroy all resources**

   ```bash
   terraform destroy
   ```

   Type `yes` when prompted.

</Steps>
```

Only include cleanup if the resources are truly not needed for the next lab. If the next lab builds on this one, do not include a cleanup section.

### Closing Sentence (Optional)

After the last tutorial section, a single sentence that either:
- Closes the Pinnacle Provisions story ("Gerald was impressed. He asked if you could do the same for the second location."), or
- Previews what the next lab will build on this one ("The infrastructure you provisioned here is what the next lab will configure.").

One sentence only. Do not use this to summarize what was learned.

## The Pinnacle Provisions Narrative

Every lab is a chapter in a running story about Pinnacle Provisions, a restaurant chain owned by Gerald. The narrative is not decoration: it gives students a business context for each technical task, which makes the goal of each lab tangible.

**Running cast:**
- **Gerald**: the owner. Not very technical. Makes requests that turn into your work. Occasionally anxious, sometimes impressed.
- **Pinnacle Provisions**: a restaurant chain, now multi-location. Grows in complexity as the course progresses.
- **The student**: the sysadmin/SRE solving the problems.

**Narrative arc across the course:**
- Labs 1-2: Setting up the first location manually (hardware, cloud, web server).
- Lab 3: Containerizing after the manual setup proves fragile.
- Lab 4: ECR and S3 for image management and backups.
- Lab 5: Terraform because the second location needs identical infrastructure.
- Lab 6: Ansible and CI/CD because manual deployment broke production.
- Labs 7-8: Kubernetes because the containers need orchestration.
- Lab 9: Observability because Gerald's investor asked how they know systems are healthy.

When writing a story beat, maintain continuity with what happened in the previous lab. Do not contradict the established facts of the narrative.

## Timing Guidance

Design labs to fit within 1 hour 50 minutes with time for questions and TA support.

Labs in this course typically run roughly **2,000 to 4,000 words**. Labs much under 1,500 usually do not fill the 1 hour 50 minute session productively; labs much over 4,500 usually have concept explanation that should move to the lecture or a concept section. Word count is a diagnostic, not a target; use it to catch drift, not to pad or clip content.

## Factual Currency

Labs walk students through real tools against real infrastructure, so wrong versions, wrong commands, or stale URLs cause immediate student confusion. Before writing any command, package name, version constraint, or navigation path, verify it from an authoritative source: official docs, release notes, the current AWS console, the current vendor download page. Especially:

- Install commands on specific OSes (Ubuntu 24.04 LTS, Amazon Linux 2023)
- Version constraints (Terraform CLI, kubectl, Helm, Ansible, Docker Engine, k3s)
- AMI IDs and instance types; prefer generic constraints over specific IDs unless intentionally pinned
- AWS Academy Learner Lab session behaviors (session timeout, credential rotation, quota limits)
- Ports and endpoints used in `nmap` or `curl` verification steps

If you cannot verify quickly, leave `{/* TODO: verify <claim> */}` next to the claim and call it out in your reply rather than guessing. A wrong fact in a lab step loses the class a large chunk of time.

## Writing Style

### Voice and Tense

- Write in second person: "You will...", "Run this command...", "You should see..."
- Present tense for what is happening now: "The output shows...", "Terraform creates..."
- Short, direct sentences. One idea per sentence.
- Active voice.

### Explanation Depth

Labs explain **what a command does and what the output means**, not **why the underlying system works that way**. That is the lecture's job. The right depth for a lab step is:

- **OK:** "`docker compose up -d` starts all services defined in `docker-compose.yml` in detached mode."
- **Too deep:** "Docker Compose communicates with the Docker daemon via a Unix socket at `/var/run/docker.sock`. The daemon spawns container processes using..."
- **Too shallow:** "Run this to start Docker."

### No Emdashes

Never use emdashes (Unicode `—` or `--` used as a dash in prose). Use colons, semicolons, commas, or periods instead.

### Forward References

Labs may mention that infrastructure will be used in the next lab, but they must not explain the next lab's tool or concepts. The purpose of the infrastructure is enough; the explanation belongs in the lecture and activity for that tool.

**OK:** "The next lab builds directly on this two-node infrastructure."

**Not OK:** "The next lab introduces Ansible, which requires one machine to act as the control node (where you run Ansible commands) and one or more managed nodes (the servers being configured)."

### Cross-Lab References

When a lab builds on prior work, name it explicitly:

- "Your two EC2 instances were provisioned by the Terraform configuration in the previous lab."
- "The k3s cluster from Labs 7-8 should still be running."
- "Re-apply the Terraform configuration from Lab 5 if the instances are not running."

This orients students who may have missed a lab or restarted their AWS session.

## What Labs Must NOT Contain

- **ActivityQuestion component** (activities only).
- **HistoricalNote component** (lecture notes only).
- **Deep conceptual explanations**: the lecture covered these. A definition is fine; a discussion of design history is not.
- **Canvas submission mechanics**: `<LabSubmissionNote />` handles this automatically. Do not write "submit to Canvas" or explain point totals.
- **Instructions for prior lab setup**: do not re-explain how to SSH into an EC2 instance after Lab 1 has covered it.
- **Premature forward references**: do not explain concepts from future lectures in the current lab.

## Validation

After writing or editing, run:

```bash
bun run build
```

This validates MDX syntax and catches import errors, broken component usage, and other build-time issues. Fix any errors before considering the work complete.
