---
name: cs312-activity
description: Use when creating or editing activity files (MDX files in src/content/docs/activities/). Enforces the tutorial-style, hands-on, concept-illustrating structure of the CS 312 course. Always load this skill before writing or editing any activity file.
---

# Activity Style Guide

This skill governs how activities are written and revised for the CS 312 course website (Astro/Starlight, MDX format). Activities are always paired with exactly one lecture. They give students a guided, hands-on experience that lets the instructor talk through the concepts from that lecture while the students work. A well-designed activity should fit comfortably in a 1 hour 20 minute class session, leaving time for oral explanations between steps.

Activities are tutorials in the Diátaxis sense: learning-oriented experiences where the student learns by doing, not by reading. The principles below govern every design decision in an activity.

## What Makes a Good Tutorial

**The teacher bears nearly all responsibility.** The student's only obligation is to follow directions. The teacher is responsible for what will be learned, what the student will do to learn it, and for the student's success. This means the activity must be:

- **Meaningful**: the student should have a sense of achievement at each step and at the end.
- **Successful**: the student must be able to complete it. Every step must produce the expected result for every student, every time.
- **Logical**: the path through the activity must make sense as a sequence.
- **Usefully complete**: the student must encounter all the actions, concepts, and tools they need to become familiar with.

**Show the learner where they are going.** State at the outset what the student will accomplish. Do not say "you will learn" (that is presumptuous). Say "we will do."

**Deliver visible results early and often.** Every step should produce a result the student can see. Understanding comes from making connections between causes and effects, so let students see results rapidly and repeatedly.

**Maintain a narrative of the expected.** At every step the student is anxious: will this produce the right result? Provide constant feedback that they are on the right path. Show expected output. Flag likely signs of going wrong. Prepare students for surprising results: "This command will return several hundred lines of output."

**Point out what the learner should notice.** A student focused on following steps will miss things unless prompted. Close the loops of learning by pointing things out in passing: "Notice that the prompt changed," "You will see your interface is now listed as enp0s3."

**Ruthlessly minimize explanation.** A tutorial is not the place for explanation. When a student is focused on following directions and getting results, explanation distracts them. A one-sentence context clue is enough: "We use HTTPS because it is more secure." Save the rest for the lecture. Resist the urge to explain; trust that the student will learn from doing.

**Focus on the concrete.** Keep the student moving from one concrete action to the next. Do not pause to generalize or abstract. The student's mind will extract the general patterns from the concrete examples on its own.

**Ignore options and alternatives.** There is always more than one way to do something. Do not mention alternatives unless the student genuinely needs to make a choice. Every option you mention is cognitive overhead.

**Aspire to perfect reliability.** A student who follows your directions and gets unexpected results loses confidence in the tutorial, the instructor, and themselves. The activity must work for every student, every time.

## Workflows

CS 312 activities move through three states. The skill behaves slightly differently in each.

**Creating a new activity (draft).** Create the file in `src/content/docs/activities/` with `draft: true` in the frontmatter. Set `sidebar.order` to match the paired lecture's order. Populate the `ai-summary` comment block (see below) before writing the activity body. Do not add the activity to `schedule.mdx`: activities are not individually listed in the weekly tables at present.

**Iterating on a draft activity.** Edit freely. Keep `draft: true`. Update the `ai-summary` block whenever the paired lecture, practiced concepts, prerequisite activities, or expected output change. If the draft matures enough that you believe it is ready for students, say so in your reply. The instructor is the only person who flips the draft flag (see Draft Flag Policy).

**Editing a published activity.** Preserve the published state. Update the `ai-summary` block on material changes. Re-check the paired lecture named in `ai-summary`: it must still exist, must not be in draft, and must still cover what the activity claims to practice.

## Draft Flag Policy

**Never flip `draft: true` to `draft: false` yourself, and never remove the `draft` key.** The instructor is the only person who publishes a page. If you believe an activity is ready, say so in your reply and let the instructor decide. Treat `draft: true` as authoritative: the activity is not a source of truth, and other pages must not link to it as if it were.

If the instructor asks you to publish the activity, run the Schedule Alignment check below first and propose any needed fix before flipping the flag.

## Schedule Alignment

`src/content/docs/introduction/schedule.mdx` is the canonical week-by-week plan. It currently lists lectures, labs, and assignments per week but not individual activities; activities inherit their week from the paired lecture's `sidebar.order`.

When the instructor asks you to publish an activity (remove `draft: true`):

1. Confirm the `paired_lecture` named in the `ai-summary` block exists and is not itself in draft. A published activity linked to a draft lecture is a broken link on the live site.
2. Confirm every `prereq_activities` slug is also published. A published activity that depends on draft setup is a student-visible break.
3. If the course ever changes to list activities per week in `schedule.mdx`, propose the schedule update before flipping the flag. Otherwise, no schedule edit is needed for activities.

Do not edit `schedule.mdx` without stating the proposed change first and getting the instructor's confirmation.

## Before Writing or Editing

1. **Read the corresponding lecture notes** thoroughly. Know what concepts the lecture covers, in what order, and with what examples. The activity should visit those concepts through hands-on steps, not explain them again.
2. **Understand the prerequisite state**: what does the student have set up from previous activities? Activities build on each other. Do not repeat setup that was already done.
3. **Estimate timing**: each `<Steps>` block with explanation prose should take 5-15 minutes. A major section with student reading time and instructor discussion takes longer. Aim for 4-6 major sections across the full 80 minutes.
4. **Read the `ai-summary` blocks** of the paired lecture and any prerequisite activities. They summarize scope and prerequisites in under 20 lines and are far cheaper than re-reading entire pages.

## Frontmatter

```yaml
---
title: "Short, Action-Oriented Title"
description: "One sentence describing what the student will do and what they will end up with."
sidebar:
  order: <number matching the linked lecture's order>
---
```

- Set `draft: true` while developing. Only the instructor removes it. See **Draft Flag Policy** above.

## Imports

Only import components you actually use:

```mdx
import { Aside, Steps, Tabs, TabItem } from '@astrojs/starlight/components';
import ActivityQuestion from '/src/components/ActivityQuestion.astro';
import FigureWithCaption from '/src/components/FigureWithCaption.astro';
import LetterList from '/src/components/LetterList.astro';
```

- **Steps**: the primary structural component. Use for any numbered procedural sequence. Nearly every section uses this.
- **ActivityQuestion**: use after key steps to prompt students to connect what they just did to the corresponding lecture concept. Do not use it for factual recall; use it to make students reason about what they observed.
- **Aside**: tips, notes, cautions about the immediate step. Use sparingly; if the information is critical, it belongs in the step prose itself.
- **Tabs/TabItem**: use when instructions genuinely differ by OS or architecture (macOS/Linux/Windows, or x86-64/ARM). Use `syncKey` to sync tabs across sections: `<Tabs syncKey="os">`.

Do NOT import `HistoricalNote`, `RubricTable`, or `LabSubmissionNote` in activities.

## AI Summary Block

Every activity starts with an `ai-summary` MDX comment immediately after the imports. This is a terse, parseable record of what the activity practices and how it connects to the paired lecture. It is hidden from students but lets other tooling (and other GenAI sessions) verify cross-page alignment without reading the full activity.

````mdx
{/* ai-summary
type: activity
slug: <filename without .mdx>
order: <sidebar.order matching the paired lecture>
paired_lecture: <lecture slug>
practices: <concepts from the paired lecture being practiced; semicolon-separated; one line>
prereq_activities: <comma-separated slugs, or empty>
output: <what the student produces or sees by the end, one clause>
*/}
````

Rules:

- `paired_lecture` is required and must be the slug of one real lecture page. Every activity has exactly one paired lecture.
- `practices` names concepts from the paired lecture that this activity illustrates hands-on. It should overlap with the paired lecture's `covers` field but be phrased as what the student does, not what the lecture explains.
- `prereq_activities` lists earlier activities whose setup state this one depends on (e.g., an EC2 instance from a prior activity, a VM that is already installed).
- `output` is the concrete end state: the parts list, the configured VM, the working service, the completed dashboard.
- Update the block whenever the paired lecture, practiced concepts, or prerequisites change.

**Example** (`hardware-build-spec.mdx`):

````mdx
{/* ai-summary
type: activity
slug: hardware-build-spec
order: 1
paired_lecture: hardware-fundamentals
practices: socket/chipset/memory compatibility; QVL checking; form factor and case constraints; TDP and PSU sizing
prereq_activities:
output: a compatible parts list in PCPartPicker matching a chosen scenario
*/}
````

## Structure

### Opening Paragraph

The first paragraph (no heading) does three things:

1. States what this activity practices and names the corresponding lecture with a link.
2. Briefly describes what the student will do and build across the whole activity.
3. Ends with what the student will be able to do or have by the end.

Keep it to 2-3 sentences. Do not explain concepts here; save that for the lecture.

**Pattern:**

```text
This activity puts into practice the concepts from the [Lecture Title](/lectures/lecture-slug/) lecture. [What you will do, in one sentence]. By the end, [what you will have accomplished].
```

**Example of a strong opening:**

```text
This activity puts into practice the concepts from the [Linux Server Planning and Configuration](/lectures/linux-server-planning-and-configuration/) lecture.
Where Debian's installer handles partitioning, bootloader installation, user creation, and networking automatically, Arch Linux makes you do each step by hand.
By the end of this exercise, you will have directly touched every layer of a Linux system that most distributions hide behind a setup wizard.
```

**Another example:**

```text
This activity puts into practice the concepts from the [Networking Fundamentals (LAN/WAN)](/lectures/networking-fundamentals-lan-wan/) lecture.
Instead of simulating a network, you will investigate a real one: the network your machine is connected to right now.
By the end, you will be able to sit at any Linux machine, answer the question "what is this machine's network situation?", and trace a packet from the shell prompt to the public internet and back.
```

### What You Will Need

A short bulleted list of prerequisites: hardware, software, accounts, prior activity state, internet connection. Be specific. Students should be able to check this list before class and know whether they are ready.

Include download links for ISOs, tools, or accounts students need to set up before arriving. If a specific version matters, say so. For software, link to the official installation instructions rather than re-writing them.

### Horizontal Rules

Use `---` between major sections to create visual breaks. This signals a shift in what the student is doing and helps the instructor see natural pause points for discussion.

### Section Structure

Each section (`##` heading) covers one coherent chunk of work that takes 10-20 minutes. Within a section, use `###` subsections when there are distinct phases.

Every section begins with **1-2 sentences of prose** before the first `<Steps>` block:

- What are we doing in this section?
- Why does it matter in the context of what we are building? (One sentence, practical, not conceptual.)

Do not start a section with a Steps block, a code block, or a list.

**Example of a well-formed section opening:**

> A raw disk has no structure. Before Linux can use it, you must divide it into partitions and tell the firmware what each one is for.

**Example of another:**

> To configure the installed system, you need to "pivot" into it using `chroot` (change root). `arch-chroot` remounts `/mnt` as the root directory (`/`) for this shell session, so every path and every command now refers to the installed system rather than the live environment.

### Steps

Use `<Steps>` for any numbered procedural sequence. Each numbered item should be one distinct action. Break a complex action into sub-steps using nested `<Steps>`.

Within each step:

1. **Command or action first.** Show the code block or UI instruction before the explanation.
2. **Explanation after.** Explain what the command does and what the student should see. Do not explain the underlying concept in depth; refer to the lecture for that.
3. **Expected output.** When a command produces output the student needs to interpret, show a representative example inline.

**Example of a well-formed step:**

> **1. Show all network interfaces and their addresses:**
>
> ```bash
> ip addr show
> ```
>
> You will see at least two interfaces: `lo` (loopback, always `127.0.0.1`) and one or more real interfaces (likely `enp0s3` or similar). Focus on the real interface. Record the interface name, IP address, and prefix length.

**Example of another step with expected output:**

> **5. Verify your work.** Type `p` to print the partition table. You should see something like:
>
> ```
> Device   Boot Start       End   Sectors  Size Id Type
> /dev/sda1      2048    616447    614400  300M ef EFI (FAT-12/16/32)
> /dev/sda2    616448   1437695    821248  400M 82 Linux swap / Solaris
> /dev/sda3   1437696  16777215  15339520  7.3G 83 Linux
> ```

Explain what commands do at the level of "what this tool does and what the output means," not at the level of "why the underlying system works the way it does" (that is the lecture's job).

**Example of the right depth:**

> `genfstab` generates the filesystem table so the installed system knows how to mount its own partitions at boot. The `-U` flag tells it to identify each partition by UUID rather than by device name. UUID-based entries are more reliable because device names like `/dev/sda` can change if you add or rearrange disks.

**Too deep (save for lecture):**

> UUIDs were introduced in the DCE RPC specification in 1987 and are 128-bit identifiers generated from a combination of time, node address, and random bits...

**Too shallow:**

> Run this command to generate the fstab.

### ActivityQuestion

Place an `<ActivityQuestion>` after a step where the student has just observed something that directly illustrates a concept from the lecture. The question should:

- Ask the student to connect what they just observed to the concept in the lecture.
- Require reasoning, not factual recall. "What did you see?" is not a good question. "Why did that happen, and what does it mean for production deployments?" is.
- Be specific to what just happened. Avoid generic questions.

**Good examples** (reasoning, specific to what just happened):

> Why does the EFI System Partition use FAT32 instead of ext4? What would happen if you formatted it as ext4?

> The lecture describes four boot stages: firmware, bootloader, kernel, systemd. Which specific steps in this activity correspond to each stage? The firmware stage is handled by the VM; what did you configure in your hypervisor that relates to it?

> Your VM has a private address (e.g., `10.0.2.15`), but `curl https://ifconfig.me` returned a different public IP. How many separate NAT translations are happening between this VM and the internet? Trace each one.

**Bad example** (factual recall, generic):

> What is NAT?

Use at most one `ActivityQuestion` per sub-section (every 5-10 steps). Too many questions slow the class down.

### Asides

- **`<Aside type="tip">`**: a shortcut, an alternative approach, or a helpful tool.
- **`<Aside type="note">`**: context or clarification that interrupts the flow if put in prose. Platform differences, "why it is named this way," optional variants.
- **`<Aside type="caution">`**: a common mistake or a destructive action the student must understand before proceeding.
- Always include a `title` attribute.

Do not use asides as a way to smuggle in conceptual explanations. If it is a concept, it belongs in the lecture. If it is a practical note about the immediate step, it belongs in an aside.

**Example of a well-formed Aside:**

```mdx
<Aside type="tip" title="Made a mistake?">
If you make a mistake at any point, type `o` at the fdisk prompt to wipe the partition table and start over. Changes are not written to disk until you explicitly tell fdisk to do so.
</Aside>
```

**Example of a Note aside:**

```mdx
<Aside type="note" title="About the live environment">
You are currently running from a RAM-based live environment. Nothing you do here persists to disk until you explicitly install it. The live environment is your staging area.
</Aside>
```

### The Penultimate Section: Something Submittable

The second-to-last section (before "Going Further") should produce a concrete artifact the student can screenshot or that carries a personal identifier. The activity should reach a natural moment of "look what we built" that:

- Displays something on screen that proves the work is done (a running service, a successful command with output, a web page, a file they created).
- Ideally includes something personal: the student's username, a hostname they chose, a message they wrote, their ONID.
- Requires no special instructions about submission. The instructor knows what to look for; the student just gets to the point where the thing works and the output is visible.

Design the steps in this section so that the final command or action produces a clean, unambiguous output that a screenshot captures well: a clean terminal session with the hostname and username visible, a browser window showing their page, a `systemctl status` showing active (running).

Do not write "take a screenshot" or "submit this to Canvas" or mention any submission mechanics. The activity ends at "this is working."

### Going Further (Optional)

If present, this is the last section. It is for students who finish early or want to explore beyond the activity. It should not be required for completing the activity.

Use `## Going Further` as the heading.

**Do not write a bare list of documentation links.** That is the format for the lecture notes Resources section. The Going Further section in an activity is different: it tells the student what to *do* next, not just what to read.

Open with 1-2 sentences of prose that acknowledge what the student has accomplished and bridge to the next challenge. Then name one specific next project or tutorial — the closest equivalent to what they just did, one step up in complexity. Think of it as "the Vagrant equivalent": a concrete hands-on thing to build or follow, not a documentation index.

After the prose, you may include 2-4 tool or resource links, but each must be framed as an actionable suggestion with a description of what it does and when to use it, not a bare link title. Embed links inline rather than as standalone bullets where possible.

**Example of the right tone:**

> You have worked through the core mechanics. The natural next step is to build something real. The Docker documentation's [Getting Started guide](…) walks you through containerizing a complete application, adding a database with Compose, and pushing the finished image to a registry. Plan about an hour for it.
>
> If you would rather start from your own code, pick a project in a language you know and write a Dockerfile for it from scratch. Start with a single-stage build, then improve it: multi-stage, smaller base image, non-root user, health check. Run `docker images` after each change and watch the size.

**Example of what NOT to write:**

> - [Docker Compose Documentation](…)
> - [Multi-Stage Builds](…)
> - [Docker Security](…)

## Timing Guidance

Design activities to fit within 1 hour 20 minutes with instructor explanations between steps. As a rough guide:

| Section type | Time |
| --- | --- |
| Intro and What You Will Need | 0 minutes (pre-class) |
| Setup / installation step | 10-15 minutes |
| Investigation or configuration section | 10-20 minutes |
| Instructor pause for discussion | 3-5 minutes |
| Submittable final step | 5-10 minutes |

If a section takes more than 20 minutes, split it. If setup (downloading, installing) is expected to take a long time, note it in "What You Will Need" and ask students to do it before class.

Activities in this course typically run roughly **2,500 to 4,500 words**. Activities much under 2,000 usually skip necessary context for students working alone; activities much over 5,000 usually cannot finish in the 1 hour 20 minute session. Word count is a diagnostic, not a target; use it to catch drift, not to pad or clip content.

## Factual Currency

Activities specify exact commands and tools students will run, so wrong facts fail the class in real time. Before writing any command, URL, tool version, or default that you are not certain is current, verify it from an authoritative source. Especially:

- Installation commands and package names (`apt install`, `brew install`, `choco install`)
- Tool versions students must have (Docker, Terraform, kubectl, Ansible, k3s)
- Download URLs and registry paths; links rot
- AWS console navigation paths; these change without notice
- Cross-platform command differences (macOS vs Ubuntu vs Windows) when the activity uses `<Tabs>` variants

If you cannot verify something quickly, leave `{/* TODO: verify <claim> */}` next to the claim and call it out in your reply. A broken step in an activity loses the class five minutes of attention and erodes trust in the rest of the tutorial.

## Writing Style

### Tutorial Voice

- Write in second person: "You will see...", "Run this command...", "Open the file..."
- Present tense for what is happening now: "The installer shows..." "The output contains..."
- Short, direct sentences. One idea per sentence.
- Use the active voice.

**Examples of the right voice in step prose:**

> `enable` registers the service to start automatically at every boot. `start` starts it immediately. `--now` combines both into one command. Without `enable`, the service would start this session but not persist after a reboot.

> You will see `lo` (loopback) and one other interface, likely `enp0s3` or similar. Note the name.

> After a few seconds, GRUB should appear, select Arch Linux, and drop you at a login prompt. Log in as `archuser` with the password you set.

### Explanation Depth

Activities explain **what a command does and what the output means**, not **why the underlying system works that way**. The lecture covers the why.

- **OK:** "`ip addr show` lists every network interface and its assigned address."
- **Too deep:** "`ip addr show` works because the kernel exposes interface state through netlink sockets, which iproute2 reads using..."
- **Too shallow:** "Run this command."

After showing what a command does, show what the output means in context:

> You will see at least two interfaces: `lo` (the loopback interface, always `127.0.0.1`) and your main interface. Note the name of the main interface for the next step.

### No Emdashes

Never use emdashes (Unicode `—` or `--` used as a dash in prose). Use proper punctuation: colons, semicolons, commas, or periods.

### No Lecture Repetition

Do not copy or paraphrase concept explanations from the lecture notes. If a concept is needed for context, give one sentence:

- **OK:** "This is the ARP cache."
- **Not OK:** A paragraph explaining how ARP broadcasts work and why MAC addresses are needed at layer 2.

### What Activities Must NOT Contain

- Conceptual deep dives (those belong in lecture notes).
- Warnings about submission, grading, or Canvas.
- References to other assignments or labs.
- Speculative content ("you might want to..."); everything in the steps should be done.
- Long asides that could be cut without affecting the activity outcome.

## Validation

After writing or editing, run:

```bash
bun run build
```

This validates the MDX syntax and catches import errors, broken component usage, and other build-time issues. Fix any errors before considering the work complete.
