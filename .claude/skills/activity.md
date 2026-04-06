---
name: activity
description: Use when creating or editing activity files (MDX files in src/content/docs/activities/). Enforces the tutorial-style, hands-on, concept-illustrating structure established by hardware-build-spec, vm-setup, arch-linux-install, and network-detective.
user_invocable: true
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

**Show the learner where they are going.** State at the outset what the student will accomplish ("In this activity we will install Arch Linux from scratch and configure it to accept SSH connections"). Do not say "you will learn" - that is presumptuous. Say "we will do."

**Deliver visible results early and often.** Every step should produce a result the student can see. Understanding comes from making connections between causes and effects, so let students see results rapidly and repeatedly. Each result should be something the student can recognize as meaningful.

**Maintain a narrative of the expected.** At every step the student is anxious: will this produce the right result? Provide constant feedback that they are on the right path. Show expected output. Flag likely signs of going wrong. Prepare students for surprising results: "This command will return several hundred lines of output."

**Point out what the learner should notice.** A student focused on following steps will miss things unless prompted. Close the loops of learning by pointing things out in passing: "Notice that the prompt changed," "You will see your interface is now listed as enp0s3," "The address here is different from the one you saw earlier."

**Ruthlessly minimize explanation.** A tutorial is not the place for explanation. When a student is focused on following directions and getting results, explanation distracts them and blocks learning. Providing a one-sentence context clue is enough: "We use HTTPS because it is more secure." Save the rest for the lecture notes. Resist the urge to explain; trust that the student will learn from doing.

**Focus on the concrete.** Keep the student moving from one concrete action to the next. Do not pause to generalize or abstract. The student's mind will extract the general patterns from the concrete examples on its own - that is what minds do.

**Ignore options and alternatives.** There is always more than one way to do something. Do not mention alternatives unless the student genuinely needs to make a choice. Every option you mention is cognitive overhead that takes the student off the path.

**Aspire to perfect reliability.** A student who follows your directions and gets unexpected results loses confidence in the tutorial, the instructor, and themselves. The activity must work for every student, every time. This requires careful testing and iteration, not just careful writing.

**Use tutorial language.** The language of a tutorial reinforces the teacher-student relationship and keeps the student oriented:

- "We will..." (we are in this together)
- "First, do x. Now, do y." (no ambiguity)
- "The output should look something like..." (clear expectations)
- "Notice that..." / "You will see..." (close the learning loops)
- "You have now configured a working SSH server." (acknowledge what was accomplished)

## Before Writing or Editing

1. **Read the corresponding lecture notes** thoroughly. Know what concepts the lecture covers, in what order, and with what examples. The activity should visit those concepts through hands-on steps, not explain them again.
2. **Read the reference activities** to calibrate tone, pacing, and structure: `hardware-build-spec.mdx`, `vm-setup.mdx`, `arch-linux-install.mdx`, and `network-detective.mdx`.
3. **Understand the prerequisite state**: what does the student have set up from previous activities? Activities build on each other (e.g., arch-linux-install uses the VM from vm-setup; network-detective uses the Arch VM from arch-linux-install). Do not repeat setup that was already done.
4. **Estimate timing**: each `<Steps>` block with explanation prose should take 5-15 minutes. A major section with student reading time and instructor discussion takes longer. Aim for 4-6 major sections across the full 80 minutes.

## Frontmatter

```yaml
---
title: "Short, Action-Oriented Title"
description: "One sentence describing what the student will do and what they will end up with."
sidebar:
  order: <number matching the linked lecture's order>
---
```

- Set `draft: true` while developing; remove it when ready for students.

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

**Example (from arch-linux-install):**
> This activity puts into practice the concepts from the Linux Server Planning and Configuration lecture. Where Debian's installer handles partitioning, bootloader installation, user creation, and networking automatically, Arch Linux makes you do each step by hand. By the end of this exercise, you will have directly touched every layer of a Linux system that most distributions hide behind a setup wizard.

### What You Will Need

A short bulleted list of prerequisites: hardware, software, accounts, prior activity state, internet connection. Be specific. Students should be able to check this list before class and know whether they are ready.

Include download links for ISOs, tools, or accounts students need to set up before arriving. If a specific version matters, say so.

### Horizontal Rules

Use `---` between major sections to create visual breaks. This signals a shift in what the student is doing and helps the instructor see natural pause points for discussion.

### Section Structure

Each section (`##` heading) covers one coherent chunk of work that takes 10-20 minutes. Within a section, use `###` subsections when there are distinct phases.

Every section begins with **1-2 sentences of prose** before the first `<Steps>` block:

- What are we doing in this section?
- Why does it matter in the context of what we are building? (One sentence, practical, not conceptual.)

Do not start a section with a Steps block, a code block, or a list.

### Steps

Use `<Steps>` for any numbered procedural sequence. Each numbered item should be one distinct action. Break a complex action into sub-steps using nested `<Steps>`.

Within each step:

1. **Command or action first.** Show the code block or UI instruction before the explanation.
2. **Explanation after.** Explain what the command does and what the student should see. Do not explain the underlying concept in depth; refer to the lecture for that.
3. **Expected output.** When a command produces output the student needs to interpret, show a representative example inline.

A well-formed step looks like this in the rendered output:

> **1. Check your network interfaces:**
>
> `ip addr show`
>
> You will see at least two interfaces: `lo` (loopback, always `127.0.0.1`) and your main interface. Note the name of the main interface for the next step.

Explain what commands do at the level of "what this tool does and what the output means" not at the level of "why networking works the way it does" (that is the lecture's job).

### ActivityQuestion

Place an `<ActivityQuestion>` after a step where the student has just observed something that directly illustrates a concept from the lecture. The question should:

- Ask the student to connect what they just observed to the concept in the lecture.
- Require reasoning, not factual recall. "What did you see?" is not a good question. "Why did that happen, and what does it mean for production deployments?" is.
- Be specific to what just happened. Avoid generic questions.

**Good example** (reasoning, specific to what just happened):

> The ping from your laptop to the VM times out even though the VM can reach the internet. Explain why using the concept of NAT. What would you need to configure to SSH into the VM from your laptop while it is in NAT mode?

**Bad example** (factual recall, generic):

> What is NAT?

Use at most one `ActivityQuestion` per sub-section (every 5-10 steps). Too many questions slow the class down.

### Asides

- **`<Aside type="tip">`**: a shortcut, an alternative approach, or a helpful tool.
- **`<Aside type="note">`**: context or clarification that interrupts the flow if put in prose. Platform differences, "why it is named this way," optional variants.
- **`<Aside type="caution">`**: a common mistake or a destructive action the student must understand before proceeding.
- Always include a `title` attribute.

Do not use asides as a way to smuggle in conceptual explanations. If it is a concept, it belongs in the lecture. If it is a practical note about the immediate step, it belongs in an aside.

### The Penultimate Section: Something Submittable

The second-to-last section (before "Going Further") should produce a concrete artifact the student can screenshot or that carries a personal identifier. The activity should reach a natural moment of "look what we built" that:

- Displays something on screen that proves the work is done (a running service, a successful command with output, a web page, a file they created).
- Ideally includes something personal: the student's username, a hostname they chose, a message they wrote, their ONID.
- Requires no special instructions about submission. The instructor knows what to look for; the student just gets to the point where the thing works and the output is visible.

Design the steps in this section so that the final command or action produces a clean, unambiguous output that a screenshot captures well: a clean terminal session with the hostname and username visible, a browser window showing their page, a `systemctl status` showing active (running).

Do not write "take a screenshot" or "submit this to Canvas" or mention any submission mechanics. The activity ends at "this is working."

### Going Further (Optional)

If present, this is the last section. It is for students who finish early or want to explore beyond the activity. Keep it short: 2-5 bullets or a short paragraph with links to external resources, documentation, or related tools. It should not be required for completing the activity.

Use `## Going Further` as the heading.

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

## Writing Style

### Tutorial Voice

- Write in second person: "You will see...", "Run this command...", "Open the file..."
- Present tense for what is happening now: "The installer shows..." "The output contains..."
- Short, direct sentences. One idea per sentence.
- Use the active voice.

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
