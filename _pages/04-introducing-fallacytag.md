---
layout: default
title: "4. The Proposal - What FallacyTag Might Be 🎬"
nav_order: 5
---

## 4. The Proposal - What FallacyTag Might Be 🎬
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}
---

**FallacyTag** is a lightweight reasoning aid—a subtle seismograph for argument structure.

It doesn’t declare truth or call out errors. It just picks up on small tremors in reasoning—moments where things might not follow—and sends a gentle signal your way.

The nudge is quiet, contextual, and optional. You’re free to ignore it. Or to pause, look closer, and decide for yourself.

### 4.1 Demo: What You’re Seeing

<video width="600" controls controls autoplay muted loop>
  <source src="{{ '/assets/fallacytag_demo.mp4' | relative_url }}" type="video/mp4">
  Your browser does not support the video tag.
</video>

**👉 Try it yourself**: [coherentdrift.github.io/fallacytag/demo](/fallacytag/demo/?theme=academic)

The demo reveals more than an interface. The tagged text isn’t synthetic—it was generated using the prompt strategy [implied in the previous section](/fallacytag/pages/03-scaffolded-intelligence/#32-designing-within-limits), applied to a real published opinion article[^1].

What you’re seeing is not just a surface mockup, but an early sketch of what FallacyTag can become: a reasoning-aware layer that pairs content, critique, and context.

### 4.2 Tagging Loop

The core of FallacyTag can be traced in a single arc:

- A piece of content is analyzed
- A reasoning flaw is detected
- A tag is gently surfaced

Then the loop pauses—for the user.

This process is visualized below:
![The core loop](/fallacytag/assets/images/4 - Tag loop.svg).
> *Figure: The FallacyTag interaction loop.*
>  
> Tags are rendered on reasoning flaws, and users may dismiss, revise, or ignore them—each action feeding back differently into the system.

The system doesn’t push. It marks a moment of uncertainty—and steps back. From there, it depends on whether you’re reading or writing—and the kind of attention you’re bringing to the page.

Some readers will nod, mentally flag the moment, and move on.

Others may tap the tag to expand it—or mark it as incorrect. In some interfaces, dismissing a tag may even remove the highlight—quietly affirming the user’s decision and restoring flow.

And some—if they’re in writing mode—may return to the source and revise it.

Each path keeps agency in the user’s hands. The tag never insists.

FallacyTag allows users to mark a tag as helpful or incorrect, but whether that feedback can meaningfully improve the system is [an open question](/fallacytag/pages/appendices/appendix-c/).

### 4.3 Related Work

We don’t know how to build better models, but we hope to make better readers.

FallacyTag draws on recent research on how large language models (LLMs) can detect logical fallacies in natural language. Recent studies have fine-tuned models like GPT-3.5 and evaluated open-source LLMs (e.g., LLaMA, Phi, Gemma) on benchmark datasets, with techniques like zero-shot chain-of-thought prompting significantly boosting classification performance[^2].

However, the academic work generally treats fallacy detection as a self-contained NLP task, focusing on accurately classifying errors. FallacyTag has a different approach. It considers model outputs not as definitive labels but as interpretive cues—presented in context, embedded in text, and always optional. The goal is not to perfect detection[^3] but to promote perception: to help users recognize when reasoning may not hold.

This reframing places FallacyTag closer to a pragmatic tradition of argument analysis. Rather than policing correctness, it supports reflection and dialogue—echoing theories that view fallacies as context-sensitive missteps rather than fixed logical violations[^4].

FallacyTag also works in messier terrain. While many benchmarks focus on short, synthetic examples, FallacyTag engages with real-world discourse, including essays, transcripts, and commentary. Its purpose isn’t to declare “wrong.” It’s to gently ask: “Might this not follow?”

---

FallacyTag operates on transcripts—textual representations of speech, video, or writing—enabling it to work across various formats. But the way it lands depends on the medium.

That’s the challenge we take up next.

---

[Previous](/fallacytag/pages/03-scaffolded-intelligence/){: .btn } [Next](/fallacytag/pages/05-modalities-and-fit/){: .btn }

---
[^1]: The full prompt is available [inside the demo](/fallacytag/demo).
[^2]: See [Teo et al. (2025)](https://doi.org/10.1007/978-981-96-8197-6_29) and [Manickavasagam & Bandara (2025)](https://doi.org/10.1007/978-3-031-90341-0_4) for overviews of LLM-based fallacy detection. These studies fine-tuned models like GPT-3.5 on datasets such as LOGIC and LOGIC Climate, achieving F1 scores above 0.8 in some configurations using chain-of-thought prompting and few-shot learning.
[^3]: To be clear: we are not objecting to others perfecting detection - it’s a valuable goal, and it’s clear why researchers focus on it. We do not contribute to that effort in this paper.
[^4]: This perspective is drawn from the work of Douglas Walton and Frans van Eemeren, who argue that fallacies are better understood as context-dependent breakdowns in dialogue rather than as fixed, formal violations of reasoning. See also historical discussions in [Hamblin (1970)](https://archive.org/details/fallacies0000hamb/page/n5/mode/2up) as well as later developments in computational argumentation theory (e.g., argumentation frameworks, dialogue games, and defeasible reasoning systems treat fallacies as strategic moves gone wrong or contextually inappropriate actions.)
