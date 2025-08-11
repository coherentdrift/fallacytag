---
layout: default
title: "9. Conditional Case - When This Is Worth Building"
nav_order: 10
---

## 9. Conditional Case: When This Is Worth Building

{: .no_toc }

## Table of Contents

{: .no_toc .text-delta }

- TOC
{:toc}

FallacyTag is not a neutral feature—it introduces friction, scaffolding, and risk. We need a principled way to decide where it belongs and where it doesn’t. Not every context that values clarity is ready for structural tagging. This section offers a framework.

And yes, that framework involves a scorecard.

### 9.1 Dirac, Scorecards, and the Dangers of Numbers

Physicist Paul Dirac famously hated small talk. At a dinner party, someone once teased him: “We hear you don’t talk much, Dr. Dirac. Why is that?” Dirac replied: “Because words are dangerous. They can be misused.”

Now, if your spidey sense is tingling—good. The same chatbot that dreamed up this exchange also argued strenuously against giving you another manipulative instrument: a scorecard. It kept proposing softer names (“Fit Gauge,” “Readiness Lens”), replacing numbers with emojis, and otherwise trying to protect you from the risk of being misled—risks like:

False precision – numbers look more objective than they are.

Pass/fail thinking – totals invite binary “good/bad” judgments.

Aggregate blindness – a single score can hide very different underlying patterns.

Weaponization – numbers get cherry-picked to justify decisions.

Shortcutting nuance – people skip the explanation and look at the score.

And yet here we are.

![Dirac reading a scorecard](/fallacytag/assets/images/9%20-%20Dirac%20reviewing%20a%20scorecard.png)

Why stoop so low? Because you probably want it. Your supervisor (if you are lucky to have one) almost certainly does. And, deep down, I’m hoping the scorecard spits out something unexpected—something that makes you think. I trust you to see through the emojis, the naming gymnastics, and the polite evasions. I also trust you not to harm yourself with it.

### 9.2 What the Scorecard Is and Isn’t

The scorecard is not a truth oracle. It doesn’t model human behavior, politics, or the psychology of defensiveness. It won’t predict adoption rates or guarantee utility. But it can do something narrower and still useful:

{: .highlight }
It helps surface design-relevant characteristics of your intended context—before you build.

By scoring across a few key dimensions, it encourages reflection: What kind of reasoning happens here? How hostile is the tone? Would users appreciate this nudge, or resist it? The goal is not precision, but structured judgment. Two use cases might score the same overall for entirely different reasons—that’s the point. This is a profile, not a thermometer.

### 9.3 The Scorecard

The scorecard is a pre-deployment litmus test: a structured prompt for assessing whether an environment is cognitively, socially, and logistically compatible with lightweight, sentence-level reasoning cues. It doesn’t capture everything, but it flags what matters most.

#### 9.3.1 Dimensions

Each environment is scored across seven dimensions—not for detection accuracy or engineering quality, but for environmental fit.

These dimensions are conceptually defined, but scoring works best when anchored in what can be observed. The table below pairs each definition with a plain-language question (“What it asks”) and concrete indicators (“What to look at / Evidence”) to make evaluation practical.

<div style="min-height:1747px" id="datawrapper-vis-PSNzY"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/PSNzY/embed.js" charset="utf-8" data-target="#datawrapper-vis-PSNzY"></script><noscript><img src="https://datawrapper.dwcdn.net/PSNzY/full.png" alt="Table" /></noscript></div>

Each is scored 0–2:

- **2** = Clear alignment with FallacyTag’s design constraints
- **1** = Mixed; could work with care, or in sub-contexts
- **0** = High risk of harm, misfit, or irrelevance

##### 9.3.1.1 Independence & Weighting

We score each dimension independently for several reasons:

1. **Avoid double-counting** — Overlaps between dimensions can inflate scores and mask weaknesses.
2. **Different observability and mitigation paths** — Some dimensions are easier to measure or address than others, so we want to adjust them without recalculating others.
3. **Correlations exist but are ignored for scoring** — Dimensions often reinforce each other (e.g., strong “Discourse Structure” can boost “Clarity of Claims”). Still, we treat them as separate to keep the rubric simple and usable without statistical modeling.

We also use equal weighting:

- This avoids meta-debates over which dimensions “matter more” and keeps the focus on the evidence for each score.
- Equal weighting here doesn’t mean all dimensions are equally important — their salience varies by context, and our confidence in measuring them also varies.

See [Appendix E](/fallacytag/pages/appendices/appendix-e) for the detailed rationale, examples, and possible refinements.

#### 9.3.2 Interpreting Scores

{: .highlight }
This isn't a metric. It's a lens.

Scores don’t dictate decisions—they highlight tension. A low number doesn’t mean “don’t deploy,” just as a high one doesn’t mean “go ahead.” What matters is why an environment scores the way it does—and whether those constraints can be designed around.

Use the scorecard to surface risk, clarify tradeoffs, and sharpen judgment. Treat it less like a checklist and more like a pre-mortem: where might this go wrong, and why?

Interpret as prompts, not pass/fail:

<div style="min-height:402px" id="datawrapper-vis-dN3o4"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/dN3o4/embed.js" charset="utf-8" data-target="#datawrapper-vis-dN3o4"></script><noscript><img src="https://datawrapper.dwcdn.net/dN3o4/full.png" alt="Table" /></noscript></div>

This helps shift the question from “Can we do this?” to something more precise:

{: .highlight }
“Does this environment invite the kind of reasoning support FallacyTag is built to offer?”

The following section puts this into practice with a set of representative use cases. Some score high, some fail dramatically—and each tells us something about what “fit” really means.

### 9.4 Use Cases in Context

Scorecards are only as useful as the conversations they provoke. To ground the dimensions in real environments, we now apply them to a range of representative use cases. These are not endorsements or rejections. They’re sketches—each one intended to expose how environmental characteristics shape the viability of reasoning feedback.

**This is also where the focus begins to shift**. Much of the prior work on fallacy detection—including Lei & Huang’s *Logical Structure Tree* (2024) and Sourati et al.’s *Tree of Fallacies* framework (2023)—has concentrated on representing and classifying flawed reasoning[^1][^2]. These contributions provide rich internal structures and have influenced the thinking behind this project. Yet, while they sometimes note possible applications, they rarely engage deeply with the deployment context: how, where, and for whom such feedback should be surfaced in practice.

The following use cases aim to extend that conversation. They treat **fit** and **fragility** as first-class concerns, exploring not just what a system like FallacyTag can detect, but whether the environment invites it to speak—and whether anyone’s likely to listen.

#### 9.4.1 Structured Peer Feedback in a College Writing Course

**Context**: Students use a learning platform (e.g., Eli Review, Canvas) to review each other’s essays. FallacyTag surfaces inline cues during feedback or revision.

<div style="min-height:481px" id="datawrapper-vis-HDXFP"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/HDXFP/embed.js" charset="utf-8" data-target="#datawrapper-vis-HDXFP"></script><noscript><img src="https://datawrapper.dwcdn.net/HDXFP/full.png" alt="Table" /></noscript></div>

**Total**: **12/14**

🟢 *Verdict*: A strong early fit. Minor concerns around control and social signaling, but these are manageable in educational settings. Tags should be visible only to the author and instructor.

#### 9.4.2 AI Chatbot Conversation with FallacyTag Overlay

**Context**: A user interacts with an AI chatbot via the standard web interface. A FallacyTag browser extension runs locally, surfacing inline reasoning flaws in the model’s outputs (not the user’s prompts).

<div style="min-height:577px" id="datawrapper-vis-vHFLR"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/vHFLR/embed.js" charset="utf-8" data-target="#datawrapper-vis-vHFLR"></script><noscript><img src="https://datawrapper.dwcdn.net/vHFLR/full.png" alt="Table" /></noscript></div>

**Total**: **12/14**

🟢 *Verdict*: Strong candidate. Tagging LLM output gives users a reasoning “second opinion” in real time. Especially valuable in contexts like news, health, or technical explanation, where the user is not just browsing but evaluating. Care must be taken to clarify that FallacyTag is reflecting on *model logic*, not user behavior. Still, as a low-friction tool for reflective interaction, it fits almost perfectly.

#### 9.4.3 Postmortem Docs in a Software Engineering Org

**Context**: Teams write retrospectives after production incidents. FallacyTag runs on the doc platform to highlight structural issues in reasoning (e.g., causal leaps, scapegoating).

<div style="min-height:465px" id="datawrapper-vis-79i72"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/79i72/embed.js" charset="utf-8" data-target="#datawrapper-vis-79i72"></script><noscript><img src="https://datawrapper.dwcdn.net/79i72/full.png" alt="Table" /></noscript></div>

**Total**: **14/14**

🟢 *Verdict*: Nearly ideal. Cultural norms already support structured thinking and low-ego critique.

### 9.4.4 🤡: AI Dungeon with FallacyTag

*This use case is unlike the others. It’s here in small part because a bad fit made apparent can teach as much as a good one, but mostly to entertain. Skip this section if you are not in the mood.*

**Context**: Interactive fiction game where users co-create absurdist narratives with an AI language model. FallacyTag is applied to player inputs and in-game character responses.

<div style="min-height:561px" id="datawrapper-vis-8ICnJ"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/8ICnJ/embed.js" charset="utf-8" data-target="#datawrapper-vis-8ICnJ"></script><noscript><img src="https://datawrapper.dwcdn.net/8ICnJ/full.png" alt="Table" /></noscript></div>

**Total**: **7/14**

🟡 *Verdict*: The system works. The user does not. FallacyTag here becomes meta-humor or misapplied rigor—a parody of itself. But that’s the point: not all flawed logic wants fixing. This case reveals what the viable ones have that this doesn’t: stakes, structure, and shared intention.

![Dirac playing AI Dungeon](/fallacytag/assets/images/9%20-%20Dirac%20playing%20AI%20Dungeon.png)

### 9.4.5 Podcast Player with Fallacy-Tagged Transcript View

**Context**: A mobile app offers transcripts of podcasts. FallacyTag adds optional timestamped reasoning cues for reflection post-listening.

<div style="min-height:529px" id="datawrapper-vis-6bD4i"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/6bD4i/embed.js" charset="utf-8" data-target="#datawrapper-vis-6bD4i"></script><noscript><img src="https://datawrapper.dwcdn.net/6bD4i/full.png" alt="Table" /></noscript></div>

**Total**: **7/14**

🟡 *Verdict*: Borderline viable in niche settings (e.g., academic or science podcasts). Mass-market rollout would likely underperform or backfire.

#### What would need to be true?

For this to work, podcast content would need to be consistently reflective—e.g., academic interviews, structured debates, or narrative explainers with defined argument arcs. More importantly, tag delivery must shift from real-time interruption to post-listening summary. A companion app that gently surfaces structural cues after the fact—perhaps with searchable timestamps—might preserve flow while still offering insight. Pairing this with user-curated moments (“mark this for deeper review”) could foster reflective uptake.

### 9.4.6 YouTube Comments on a Political Explainer

**Context**: A browser extension overlays FallacyTag annotations on YouTube comment threads below a video about climate policy.

<div style="min-height:497px" id="datawrapper-vis-8LUDv"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/8LUDv/embed.js" charset="utf-8" data-target="#datawrapper-vis-8LUDv"></script><noscript><img src="https://datawrapper.dwcdn.net/8LUDv/full.png" alt="Table" /></noscript></div>

**Total**: **3/14**

🔴 *Verdict*: Almost certainly counterproductive. The surface is too hostile, the control too weak, and the risk of misinterpretation too high.

#### What would need to be true?

Almost everything. First, tagging visibility would need to be opt-in and personal—a viewer-only lens rather than a public overlay. Second, the comment environment would need moderation norms already in place that favor reasoning over rhetoric. A better fit might be structured Q&A beneath educational videos or small-group classroom discussion portals using YouTube embeds. Even then, tagging should apply to content, not commenters. Failing that, the only viable angle here is meta—using the chaos of the comment thread itself as a teaching exhibit: “What tags would you apply to this exchange, and why?” That’s pedagogy, not product.

### 9.5 Reflection: Why These Examples Matter

These examples show what the scorecard can’t: how **the same system can feel elegant in one space and illegitimate in another**. It’s not just about who the users are—it’s about what the environment invites. FallacyTag doesn’t demand ideal conditions. But it needs conditions that don’t actively reject what it offers: clarity, humility, and structural reflection.

#### Why Offer Rescue Paths?

Scorecards don’t predict failure—they illuminate fit. Even low-scoring environments might support FallacyTag—but only with strong guardrails, clever reframing, or context-aware constraint. The question shifts from “Can we deploy here?” to “What would it take to make this work—and is it worth it?”

### 9.6 Summary: Worth, With Constraints

FallacyTag isn’t a grand vision. It’s a bounded intervention. Its value doesn’t lie in universality—it lies in fit.

Section 9 laid out that fit through three layers:

- **Why** does this kind of system demand special justification (9.0—9.2),
- **How** to evaluate environmental compatibility via the scorecard (9.3),
- **Where** that framework breaks open meaningful differences (9.4).

What emerges is not a binary. FallacyTag isn’t “appropriate” or “inappropriate”—it’s context-sensitive, socially fragile, and cognitively demanding. But when the setting aligns—when users are present to reason, when the tone allows gentle nudges, when control is visible and earned—it can work. It can help.

And that’s enough.

Designing for reflection, rather than judgment, is rare in software. Rarer still is designing with structural humility. FallacyTag invites both. The rest of this paper—architecture, tone, constraints—is built to preserve that stance.

[^1]: [Lei, S., & Huang, D. (2024)](https://aclanthology.org/2024.emnlp-main.730/) extract argument structure into a “logical structure tree” to guide LLM classification, yielding higher accuracy on benchmark datasets.
[^2]: [Sourati, Z., et al. (2023)](https://arxiv.org/abs/2212.07425) present an explainable classification pipeline for multiple fallacy types, evaluated on curated datasets, with limited discussion of user-facing integration.

---

[Previous](/fallacytag/pages/08-constraints){: .btn } [Next](/fallacytag/pages/10-call-to-explore/){: .btn }

---
