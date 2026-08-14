---
name: cs312-assignment
description: Use when creating or editing assignment files (MDX files in src/content/docs/assignments/) or their rubric TSV files (canvas/assignments/). Enforces the operational-specification structure of CS 312 assignments, including the business narrative framing, dual-deliverable submission format, rubric TSV columns, and progression logic that builds each assignment on the previous one. Always load this skill before writing or editing any assignment file or rubric.
---

# Assignment Style Guide

This skill governs how assignments are written and revised for the CS 312 course website (Astro/Starlight, MDX format). Assignments are operational specifications: they tell students what to build, what to prove, and how it will be evaluated. They are not tutorials, activities, or labs.

Assignments occupy the fourth Diátaxis category (reference/specification). Unlike activities and labs, which guide students step by step, assignments give students a goal and let them decide how to reach it. The documentation, design decisions, and proof of operation are the product.

## The Philosophy

**Every assignment is an operational brief, not an instruction set.** Students must make defensible engineering decisions, document them clearly, and prove the system works under realistic conditions. "Another operator could follow your docs without asking you questions" is the standard throughout the course.

**Assignments tell a story.** The course follows the Minecraft server arc: each assignment hands students a more complex operational challenge, building directly on the previous one. The story grows in realism and scope. A student reading Assignment 3 already knows the server from Assignment 2; they are not starting over.

**Operational maturity compounds.** Security posture, cost awareness, recoverability, documentation quality, and proof-of-operation standards persist and deepen across all assignments. Requirements from earlier assignments are not repeated verbatim but are implicitly carried forward.

**Proof over claims.** Every significant requirement must be evidenced in the video or documented in the PDF. Students do not get credit for saying they did something; they get credit for showing it.

## Workflows

CS 312 assignments move through three states. The skill behaves slightly differently in each.

**Creating a new assignment (draft).** Create the MDX file in `src/content/docs/assignments/` with `draft: true` in the frontmatter. Create the rubric TSV in `canvas/assignments/` alongside it (start from `canvas/assignments/_template/template_rubric_details_name.tsv`). Populate the `ai-summary` comment block (see below) and the LOs comment block before writing the assignment body. Do not link the assignment from `schedule.mdx` yet: a link to a `draft: true` page produces a 404.

**Iterating on a draft assignment.** Edit freely. Keep `draft: true`. Update the `ai-summary` block whenever prerequisites (prior assignment, lectures, labs), the new technology scope, or persistent requirements change. Keep the rubric TSV in lockstep with the MDX: every requirement in the MDX should map to a criterion or rating element in the TSV, and every criterion in the TSV should evaluate something the MDX actually asks for.

**Editing a published assignment.** Preserve the published state. Update the `ai-summary` block on material changes, especially when video checkpoints or requirements shift. Verify every `prereq_assignment`, `prereq_lectures`, and `prereq_labs` slug still exists and is published; a slug still in draft means the assignment leans on unpublished content, which is a flag for the instructor.

## Draft Flag Policy

**Never flip `draft: true` to `draft: false` yourself, and never remove the `draft` key.** The instructor is the only person who publishes a page. If you believe an assignment is ready, say so in your reply and let the instructor decide. Treat `draft: true` as authoritative: the assignment is not a source of truth, and `schedule.mdx` must not link to it.

If the instructor asks you to publish the assignment, run the Schedule Alignment check below first, propose any needed fix, and only flip the flag after the instructor confirms.

## Schedule Alignment

`src/content/docs/introduction/schedule.mdx` is the canonical week-by-week plan and is the student's source of truth. Each week table links the assignment for that week when one is due.

When the instructor asks you to publish an assignment (remove `draft: true`):

1. Confirm the assignment is named in the correct week in `schedule.mdx` with the correct `Ops N:` prefix and slug.
2. If named only in prose (because it used to be a draft), propose converting the name to a markdown link in the form `[Ops N: Title](/assignments/<slug>/)`.
3. Confirm every `prereq_assignment`, `prereq_lectures`, and `prereq_labs` slug in the `ai-summary` block is published. A published assignment that depends on unpublished content is a student-visible break.
4. Confirm the rubric TSV exists at the path referenced in the MDX's `?raw` import, and that it parses cleanly (`bun run build` succeeds).

Do not edit `schedule.mdx` without stating the proposed change first and getting the instructor's confirmation.

## File Locations

- **Assignment MDX files**: `src/content/docs/assignments/`
- **Rubric TSV files**: `canvas/assignments/`
- **Rubric template**: `canvas/assignments/_template/template_rubric_details_name.tsv`

## Frontmatter

```yaml
---
title: 'Ops N: Assignment Title'
description: 'One sentence describing the operational challenge the student will solve.'
sidebar:
  order: N
---
```

The `title` prefix is always `Ops N:` where N is the assignment number. The description is a single sentence framing the operational challenge, not a learning objective.

While the assignment is in development, set `draft: true` in the frontmatter. Only the instructor removes it. See **Draft Flag Policy** above.

## Imports

```mdx
import { Aside } from '@astrojs/starlight/components';
import RubricTable from '../../../components/RubricTable.astro'
import rubricTsv from '../../../../canvas/assignments/assignment-N-rubrics.tsv?raw'
```

Only import `Aside` if you actually use it. Always import `RubricTable` and the rubric TSV. Never import `Steps`, `ActivityQuestion`, `LabSubmissionNote`, or `HistoricalNote` in assignments.

## Learning Objectives Comment Block

Immediately after the imports, add a hidden comment listing the LOs this assignment addresses. Students do not see this; it is for the instructor.

```mdx
{/* LOs:
- LO3: [Learning objective text]
- LO5: [Learning objective text]
*/}
```

## AI Summary Block

Directly after the LOs comment, include an `ai-summary` MDX comment. This is a terse, parseable record of what the assignment requires and what it assumes students already have. It is hidden from students but lets other tooling (and other GenAI sessions) verify cross-page alignment without reading the full assignment.

````mdx
{/* ai-summary
type: assignment
slug: <filename without .mdx>
order: <sidebar.order>
prereq_assignment: <slug of previous assignment, or "none">
prereq_lectures: <comma-separated slugs, or empty>
prereq_labs: <comma-separated slugs, or empty>
new_scope: <the new technology or approach this assignment adds, one clause>
persistent_requirements: <carried-over requirements; semicolon-separated>
story_beat: <Obsidian Dynamics hook, one clause>
*/}
````

Rules:

- `prereq_assignment` is the single previous assignment whose operational baseline carries forward, or `none` for Assignment 1.
- `prereq_lectures` names the lectures whose concepts are being used. Keep this list minimal and directly load-bearing.
- `prereq_labs` names the labs whose practical experience is assumed (the student has already done these labs at lower stakes).
- `new_scope` is the single new capability this assignment adds on top of the previous assignment's baseline.
- `persistent_requirements` names the requirements that carry forward implicitly across assignments (cost controls, security posture, documentation quality) rather than being re-stated in full.
- `story_beat` is the Obsidian Dynamics hook compressed to a single clause.
- Update the block whenever requirements, rubric scope, or prerequisites change.

**Example** (`minecraft-1-manual-server.mdx`):

````mdx
{/* ai-summary
type: assignment
slug: minecraft-1-manual-server
order: 1
prereq_assignment: none
prereq_lectures: linux-server-planning-and-configuration, networking-fundamentals, system-security-and-hardening
prereq_labs: cloud-environment-setup, manual-web-server-deployment
new_scope: manual operation of a persistent Linux service on EC2
persistent_requirements: AWS Academy only; cost controls documented; minimize public exposure
story_beat: CEO mandates a company Minecraft server with zero budget and one assigned engineer
*/}
````

## Section Structure

Every assignment follows this structure in order. Do not skip sections or reorder them.

### 1. Opening Narrative (no heading)

The very first content block (no heading) is a 2-4 sentence business narrative that frames why the work matters. It names a fictional business context, a problem, and stakes. It does not list requirements; it sets the scene.

The narrative should:
- Name the business and the problem (Obsidian Dynamics)
- Give the student a role and a constraint
- End with what they are being asked to do (one sentence, no requirements detail)
- Be specific and operational. "Build the server" is better than "complete the assignment."

**Example from Assignment 1:**

> The CEO of Obsidian Dynamics read an article about "employee engagement" on a cross-country flight and landed with a vision: a company Minecraft server, live by Friday. The IT budget for this initiative is zero dollars. The headcount assigned to it is you. There was no discussion.
>
> Your stakeholders do not care *how* it runs; they care that it is reachable, stable, and well-operated. You have one EC2 instance, an SSH key, and whatever dignity you brought to work this morning. Build the server **completely manually** on AWS Academy.

**Example from Assignment 3:**

The narrative should acknowledge what the student has already built (the containerized server from Assignment 2) and explain why automation is now necessary. It does not repeat Assignment 2's requirements. It frames the new challenge: the manual process does not scale, cannot be audited, and cannot survive a rebuild.

**Tone:** Direct, dry, slightly wry. The student is a competent engineer being handed a real problem with real consequences. They are not being babied.

### 2. Learning Objectives

```markdown
## Learning Objectives

- [Action verb]: [What students will be able to do operationally].
- [Action verb]: [What students will be able to do operationally].
```

3-4 bullets. Operational outcomes only: configure, demonstrate, produce, apply, implement. Not "understand" or "learn about." Each LO should connect directly to a requirement in the assignment.

### 3. Constraints (AWS Academy)

```markdown
## Constraints (AWS Academy)

- You must use AWS Academy resources only.
- [Constraint specific to this assignment's technology scope.]
- [Constraint specific to cost or security.]
- You must document cost controls...
```

The constraints section lists hard rules: what platform, what approach is forbidden, what must be documented. These are not suggestions. They carry weight in the rubric.

Recurring constraints across all assignments:
- AWS Academy only
- Document cost controls (instance size + stop schedule + at least one guardrail)
- Minimize public exposure (SSH restricted, only required ports open)
- IAM instance profiles over hardcoded credentials wherever credentials are needed

Each assignment adds constraints appropriate to its scope.

### 4. Requirements

```markdown
## Requirements

### A. Infrastructure and Access

### B. Service Operation

### C. [Technology-specific section]

### D. Documentation
```

Requirements sections define what the student must build. Lettered subsections (A, B, C, D, E) group related requirements. Each requirement is a bullet or short prose statement. Requirements must be specific enough to evaluate but not so prescriptive that they dictate a single implementation.

**Language pattern:** "must" for hard requirements; no hedging. "You may use any defensible X" when the implementation choice is the student's.

**What belongs in Requirements vs. Hints:** Requirements define the outcome. Hints tell the student how to get there. Do not put "Paper recommends Java 21" in Requirements; that is a Hint.

**Documentation requirement:** Every assignment has a documentation requirement, but the scope grows with each assignment. Assignment 1 requires a runbook. Assignment 3 requires the runbook plus an architecture diagram, Terraform variable docs, a change process, and a teardown checklist. State the required sections explicitly.

### 5. Hints

```markdown
## Hints

[Short prose about what these hints are for.]

- [Operational tip with a link if relevant.]
- [Common setup issue to avoid.]
```

Hints are optional but expected in earlier assignments where students are new to the technology. They reduce friction on setup so students can focus on the operational skills the assignment is actually testing.

Hints should:
- Warn about common setup traps specific to the service (Minecraft)
- Not give away design decisions (those belong to the student)

End the Hints section with a sentence affirming student autonomy on implementation choices that the assignment does not constrain:

> You can use any Minecraft server software you like. The key is that your documentation is clear and reproducible for another operator.

### 6. What You'll Submit

```markdown
## What You'll Submit

1. **[Document type] (PDF)** [description of what it covers, operator-facing standard]
2. **Narrated screen recording (max 3 minutes)**. Your server MOTD must include your name or student ID. **Submit timestamps alongside the video** (e.g., "Checkpoint 1: 0:00, Checkpoint 2: 0:38, ..."):
   1. [Checkpoint 1 description]
   2. [Checkpoint 2 description]
   3. [Checkpoint 3 description]
   4. [Checkpoint 4 description]
```

Every assignment has exactly two deliverables: a PDF and a narrated screen recording. Both are always present.

**PDF:** Named by what it is ("Tutorial Runbook", "Architecture Documentation", "Incident Report and Postmortem"). Described with the operator-facing quality standard: "another operator with basic Linux knowledge could follow without asking you questions."

**Video:** Always max 3 minutes. Always requires MOTD with name or student ID. Always requires timestamps submitted alongside the video (not embedded in the video). Always has exactly 4 timestamped checkpoints. Each checkpoint must be a specific observable action with a specific expected output; it cannot be vague.

**Checkpoint design rules:**
- Checkpoint 1 always establishes the baseline state: AWS console visible, instance running, service responding.
- Middle checkpoints test the specific skills introduced in this assignment (persistence, automation, orchestration, etc.).
- The final checkpoint always demonstrates a complete lifecycle or failure-recovery event (reboot and recovery, destroy and rebuild, pod failure and recovery, incident drill).
- Every checkpoint requires something a student cannot fake: nmap output with MOTD, systemctl status after reboot, terraform destroy + apply, a running pod after failure.

### 7. Rubric

```mdx
## Rubric

<RubricTable tsv={rubricTsv} sourceLabel="canvas/assignments/assignment-N-rubrics.tsv" caption="[Short assignment title]" />
```

The RubricTable component renders the TSV rubric. The `sourceLabel` matches the TSV filename. The `caption` is a short title for the assignment (2-5 words).

### 8. Extra Credit (up to +10)

```markdown
## Extra Credit (up to +10)

- **[Feature name] (+N)**: [What it is and what justifies the credit].
- **[Feature name] (+N)**: [What it is and what justifies the credit].

Extra credit must stay within this assignment's [technology] scope (no [technologies forbidden in this assignment]).
```

Extra credit is always explicitly scope-limited. The final sentence names technologies that are out of scope (i.e., technologies from later assignments). This prevents students from completing future assignment work early for credit.

Point values: typically 3-4 options totaling +10. Individual items are worth 2-5 points each.

Extra credit should test depth within the assignment's technology scope, not breadth across future topics. For Assignment 1 (manual operations), extra credit covers service hardening and operational diagnostics. For Assignment 3 (IaC), extra credit covers drift detection and advanced pipeline features.

## Writing the Rubric TSV

The rubric lives in `canvas/assignments/assignment-N-rubrics.tsv`. Create it alongside the MDX file. Do not leave the rubric as a placeholder.

### TSV Column Schema

The file is tab-separated with no quotes. Row 1 is headers; do not include it in assignment rubrics (Canvas ignores it on import). Each subsequent row is one rubric criterion.

Columns in order:
1. `title_or_outcome_id` — criterion title (short, descriptive, include point value in parens)
2. `description` — full description of what is being evaluated
3. `use_range` — always `false` for CS 312 rubrics
4. `rating_points_1` — highest point value
5. `rating_title_1` — label for highest rating
6. `rating_description_1` — what earns this rating
7. `rating_points_2` — second tier points
8. `rating_title_2` — label for second tier
9. `rating_description_2` — what earns this rating
10. `rating_points_3` — third tier points (use 0 if only 3 tiers)
11. `rating_title_3` — label for third tier
12. `rating_description_3` — what earns this rating
13. (optional) `rating_points_4`, `rating_title_4`, `rating_description_4` — fourth tier if needed

**Always end the file with a final empty-titled row** (just a tab with no content) to signal end-of-rubric to Canvas.

### Rating Tier Conventions

Be consistent in how you define rating tiers across criteria. Make sure tiers are consistent across assignments.

When a criterion has multiple sub-elements, name them explicitly in the description and in each rating tier: "All four elements", "Three of four elements", "Two of four elements", "One or zero elements." This makes grading mechanical and defensible.

### Video Checkpoint Criteria

Video checkpoints always use `use_range: false` and 3 tiers (Complete / Partial / Missing). The description names all required visible elements. Each rating tier explains exactly what evidence is needed. The criterion title includes the point value: `Video: [What it proves] (N)`.

**Pattern for Complete:**
> All [N] elements clearly shown: [element 1], [element 2], [element 3].

**Pattern for Partial:**
> [N-1] of [N] elements clearly shown, or one element is ambiguous (e.g., [common issue], [common issue]).

**Pattern for Missing:**
> No credible [checkpoint name] demonstrated.

### Non-Video Criteria

Non-video criteria describe what is evaluated and list the sub-elements it covers. The description uses "Evaluated on N elements:" or lists specific required sections. Rating tiers count how many elements are present.

**Criterion title format:** `[Area]: [What it covers] (N)` where N is the point value.

### Total Points

100 points (10 optional extra credit)

Video checkpoints should be worth 40-45% of the base rubric total. Documentation and operational proof criteria share the rest. This weighting keeps assessment anchored to demonstrated behavior.

## Assignment Progression

Each assignment inherits the previous assignment's operational baseline and adds a new layer of complexity. When writing a new assignment, understand what students already have and what they are being asked to change or add.

**When writing a new assignment:**
1. Confirm exactly what the student has from the previous assignment. Do not re-explain the previous work; reference it as existing baseline.
2. Identify what changes and what is carried forward unchanged.
3. Write requirements only for what is new or upgraded. Persistent requirements (cost controls, security posture, documentation quality) are stated once in the appropriate section, not repeated from prior assignments.
4. Adjust extra credit to stay within the new assignment's scope but point toward the next one conceptually.

## Writing Style

### Specification Voice

Assignments are written in specification voice: direct, imperative, no hand-holding. This is different from the tutorial voice in activities or the how-to voice in labs.

- Use "must" for hard requirements, not "should" or "can."
- Use "you may use any defensible X" for implementation choices the student controls.
- Do not explain how to do the thing; that is what lectures, activities, and labs are for.
- Do not say "you will learn" or frame requirements as learning outcomes. The assignment states what must be built.

**Examples of specification voice:**

> A dedicated `minecraft` operating system user.

> The server starts automatically on reboot and restarts on failure.

> Playbook is idempotent; re-running against the same host produces no errors and no unintended changes.

**Not specification voice:**

> You will want to make sure the server starts automatically. This is important because if the instance reboots, the server would not come back up without this step.

### Operational Language

Use operational terms without explanation. Students have the lectures and labs for background:
- "defensible engineering decisions"
- "operator-grade"
- "another operator could follow without guesswork"
- "idempotent"
- "pinned deployable version"
- "pre-change checklist"
- "post-change validation"

### No Emdashes

Never use emdashes (`—` or `--` as a dash in prose). Use colons, semicolons, commas, or periods.

### Length Calibration

Assignments in this course typically run roughly **1,000 to 1,500 words** of MDX (the rubric TSV is separate). Assignments much under 1,000 usually under-specify requirements; assignments much over 1,500 usually have tutorial contamination that should be cut or moved to the Hints section. Word count is a diagnostic, not a target.

### Factual Currency

Assignment requirements and rubrics drive grading. A wrong version requirement, a stale port number, or a command that no longer exists can force a mid-week clarification to the entire class and invalidates rubric criteria. Before stating any version, port, quota, or tool-specific behavior, verify it from an authoritative source. Especially:

- Minimum tool versions (Java for Paper, Docker Engine, Terraform CLI, Kubernetes)
- Ports and protocols (default Minecraft port, exposed service ports)
- AWS Academy Learner Lab constraints (session length, instance quotas, allowed services)
- Cost-control recommendations that reflect current AWS pricing
- Commands referenced in video checkpoints (`nmap`, `systemctl`, `kubectl`, `terraform`)

If you cannot verify quickly, leave `{/* TODO: verify <claim> */}` next to the claim in the MDX and mention it in your reply. A wrong fact in an assignment gets amplified by every student who runs it, and it is expensive to fix once grading is underway.

### No Tutorial Contamination

Do not include step-by-step instructions in assignments. Requirements say *what*, not *how*. If you find yourself writing "First, do X. Then do Y," that belongs in a hint or an activity, not a requirement.

### Italic and Bold Usage

Use `*italics*` sparingly for terms or proper nouns that deserve emphasis. Use `**bold**` for key document names or critical terms in requirements. Do not bold entire sentences.

## Validation

After writing or editing, run:

```bash
bun run build
```

This validates MDX syntax, component imports, and TSV path references. Fix all errors before considering the work complete.

If you created a new rubric TSV, also verify that the path in the import statement matches the actual filename exactly.
