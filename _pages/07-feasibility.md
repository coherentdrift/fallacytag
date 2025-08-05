---
layout: default
title: 7. Is It Feasible?
nav_order: 8
---

## 7. Is It Feasible?

{: .no_toc }

## Table of Contents

{: .no_toc .text-delta }

- TOC
{:toc}

---

Having explored FallacyTag’s function (Sections 3–5) and structure (Section 6), we now ask: can it work in practice? This section assesses feasibility across three dimensions: **technical**, **conceptual**, and **product**/**social**, each with its own risks and mitigation paths.

This isn’t a claim that FallacyTag must exist—only that it could be useful. If it prompts reflection in even one out of five cases, that may be enough.

Our conclusion isn’t a blanket yes or no. **FallacyTag is feasible—but only within a narrow operational scope, with rigorous design and bounded expectations.**

### 7.1 Technical Feasibility: Can LLMs Reliably Flag Fallacies?

#### Assessment: 🟢 High (within defined boundaries)

Large language models can reliably detect certain reasoning patterns, especially in short, self-contained statements where surface cues align with known fallacy types.

- **Detectable forms**: *Ad hominem*, *false dilemma*, and *appeal to authority* are among the most reliably identifiable. These patterns have stable linguistic signals and are less dependent on topic knowledge.

  - *Example*: “You can’t trust her view on climate change—she didn’t go to college.” → *Ad hominem*. This structure generalizes across domains.

- **Low domain dependence**: FallacyTag operates at the level of argument form, not factual accuracy or intent. It highlights patterns such as post hoc or *false dilemma* based on surface structure, without judging whether a claim is true or inferring a speaker’s motives. For instance, it might flag: “Because the economy is strong, the government must be doing a great job” as a post hoc fallacy—not because the claim is false, but because the causal link is assumed rather than demonstrated. This structural focus keeps detection tractable and sidesteps entanglement with domain knowledge or epistemic disputes.

  - *Example*: “A Nobel Prize-winning economist supports this plan—so it must be correct.” → *Appeal to authority*. This holds whether or not the claim aligns with truth.

- **Bounded inference minimizes error**: Limiting evaluation to sentence-level spans reduces hallucination risk and avoids synthetic logic across paragraph boundaries. For a high-level system overview, see [Section 6](/fallacytag/pages/06-how-it-works).

- **Precedent evidence**: While no public benchmark yet exists for large-scale fallacy detection, GPT‑4 demonstrates strong performance on a wide range of academic reasoning tasks. It performs well on structured, prompt-driven evaluations and is capable of recognizing certain informal fallacies in short, curated inputs.

    **Turnitin’s Revision Assistant** demonstrated that students could benefit from sentence‑level feedback on argumentative strength, particularly when feedback was constructive, rubric-aligned, and visually scaffolded[^1].

    However, in practice, *Revision Assistant* remained a niche offering and was eventually phased out, with limited evidence of sustained adoption[^2].

    Similarly, **IBM’s Project Debater** broke new ground in claim detection, key‑point mining, and evidence clustering, showing that large-scale argument analysis is technically feasible[^3]. Yet in public demonstrations and broader research deployments, the system often faltered when facing rhetorical nuance, satire, or emotionally charged content, underscoring how brittle even sophisticated structures can be in open-ended discourse[^4].

    FallacyTag builds on these precedents while diverging in emphasis. Rather than scoring essays or debating humans, it offers lightweight cues for users mid-conversation. Compared to traditional rule‑based fallacy detectors, FallacyTag offers greater adaptability and linguistic flexibility, without sacrificing interpretability —following Lipton’s pragmatic emphasis on actionable clarity over transparency[^5]. By avoiding hard‑coded triggers and relying on probabilistic surface pattern recognition, the system can respond to novel phrasings while still offering explicit reasoning stubs[^6].

- **Learning potential**: A feedback layer—tracking user responses such as ‘agree’, ‘dismiss’, or ‘unclear’—can support interface tuning, not model retraining. These interactions might be stored locally or anonymously (e.g., via browser-local telemetry) to improve UI behavior or flag ambiguous tagging patterns. Crucially, no automatic model fine-tuning is performed based on this data. Any learning loops must be human-in-the-loop: used to inform updated heuristics or reviewed batches, not dynamic adaptation. This limits misuse (e.g., brigading) and preserves interpretability. While human-in-the-loop tuning is viable long term, no automated adaptation is planned for early-stage systems. Future experiments might explore reinforcement-style learning for selective contexts, but these remain explicitly outside the MVP scope.
  
#### Limitations and edge cases

- Tagging is probabilistic, not deterministic. Even high-signal patterns can be falsely triggered by rhetorical language or sarcasm. For example, a satirical statement like “Oh, sure, because the moon landing was faked, vaccines must be dangerous” might be flagged for false cause, even though the intent is ironic. Without tonal cues, models may mistake performance for assertion.

- Fallacy initiation (detection) is more error-prone than follow-up explanation.

#### Conclusion

A constrained MVP—focused on a small set of structurally distinct fallacies is technically feasible with today’s tools. For early-stage deployment, the most technically tractable candidates include:

- Ad hominem
- False dilemma
- Appeal to authority
- Hasty generalization
- Post hoc (false cause)
- Straw man (in limited cases where paraphrasing is clearly evident)
  
These fallacies tend to have identifiable surface features and occur frequently in real-world argumentation. By contrast, more ambiguous types—such as slippery slope, begging the question, or equivocation—require context-sensitive inference and are excluded from MVP scope.

### 7.2 Conceptual Feasibility: Is Fallacy Detection a Coherent Task?

#### Assessment: 🟠 Moderate—Clear potential, but epistemic ambiguity looms

FallacyTag asks a delicate question: Can informal fallacies be flagged reliably, across varied contexts, without collapsing into misinterpretation or misuse?

The answer depends on how we **classify** fallacies—not just by name, but by their **structural properties**, **dependence on speaker intent**, and **sensitivity to cultural or genre norms**. Some forms are well-suited to light-touch, surface-level tagging. Others aren’t.

To guide both design and deployment, we distinguish fallacies across three axes:

| **Type** | **Examples** | **Implication for Tagging** |
| --- | --- | --- |
| **Structural** | Ad hominem, false dilemma, post hoc | Surface-level patterns with stable linguistic cues; most taggable. |
| **Intent-Dependent** | Straw man, red herring | Requires inferring motive or rhetorical context; often ambiguous. |
| **Culturally/Genre-Variant** | Appeal to tradition, appeal to emotion | Varies across discourse communities and settings; needs hedging. |

This tripartite framing aligns loosely with hierarchical models of fallacy classification, such as Lei & Huang’s *Logical Structure Tree* (2024), which structures logical connectives and argument spans[^7]. These systems capture important logical distinctions—but are model-facing, not user-facing. FallacyTag’s task is different: to surface useful[^8] cues for humans in situ, often mid-conversation, without requiring formal argument reconstruction.

While some fallacies are tightly defined, many involve judgment calls. Reasoning errors often depend on subtle distinctions between flawed structure and legitimate rhetorical variation.

- **Category boundaries are porous**: Some fallacies exhibit overlapping structures.
  - *Example*: “If we ban this one book, soon we’ll have no libraries.” → Could be slippery slope, or a provocative framing to spark debate.

- **Contextual ambiguity**: The same phrase can be fallacious or not depending on tone, audience, or genre.
  - *Example*: “You think the Earth is round? Galileo was jailed for saying that.” → Appeal to authority in science writing, but possibly parody in a satirical context.

- **Philosophical depth required**: Certain critiques (e.g., *begging the question*, *circular reasoning*) require close analysis of underlying assumptions, often beyond what can be inferred from surface text.

- **Design strategies**:

  - Use hedged tags (“Possible false dilemma?”) to acknowledge interpretive space.
  - Provide contextual explanations that cite the local inference (not global judgments).
  - Keep the system’s claims minimal and non-prescriptive.
  
#### What about false positives?

In FallacyTag’s design, a false positive—tagging a statement as potentially fallacious when the reasoning is sound—is treated not as a failure but as a low-cost prompt. Tags are framed as tentative cues (“Possible false dilemma”) and can be easily dismissed. The goal is not to mark errors but to activate reflection. That said, false flags are not epistemically neutral: they can introduce noise, draw attention away from valid reasoning, or erode trust if overused. To mitigate this, FallacyTag uses conservative thresholds for tagging, prioritizes clarity over coverage, and offers localized explanations that clarify the nature of the detected structure. The system assumes that the occasional unhelpful tag is acceptable if it fosters rare but meaningful moments of insight, and if the design makes it easy to ignore what doesn’t resonate.  

#### Conclusion

As discussed in [Section 7.1](/fallacytag/pages/07-feasibility/#71-technical-feasibility-can-llms-reliably-flag-fallacies), FallacyTag operates on surface structure, not truth claims or speaker intent. This design choice reflects long-standing debates in informal logic: while some theorists argue that rhetorical context and motive are essential to classifying fallacies—particularly in persuasive or adversarial speech[^9]—others point to a deeper tension. As early as [Hamblin (1970)](https://archive.org/details/fallacies0000hamb/page/n5/mode/2up), scholars noted the lack of a stable definition of fallacy—a challenge now known as *Hamblin’s dilemma*: either fallacies are too broadly defined to be analytically useful, or too narrowly defined to reflect real discourse. Subsequent frameworks, such as Walton’s argumentation schemes, attempt to formalize common failure modes but still depend on contextual interpretation.

FallacyTag deliberately avoids this ontological weight. It flags structural forms that are statistically or historically associated with reasoning breakdowns, without asserting that a given instance is fallacious. These cues are meant to activate reflection, not deliver correction. The goal is not to resolve debates, but to surface patterns worth re-examining.

Practically, this stance informs every aspect of the interface: tags are hedged, optional, and paired with short, local explanations. Research on metacognition supports this lightweight approach[^10], showing that even minimal, non-evaluative prompts can improve engagement and revision behavior.

Still, even well-intended prompts risk misfire if trust, tone, or context are mishandled. Systems that aim to model reasoning rarely fail for lack of structure—they fail for lack of scoping. FallacyTag’s constraints are not just limitations—they are design principles meant to protect interpretive diversity.

This design also learns from precedent. Turnitin’s Revision Assistant struggled to balance structure and nuance. ARG-miner and similar tools generalize poorly outside narrow research contexts. Even recent LLM-based detectors[^11], while capable, remain backend systems—optimized for analytics, not user experience.

FallacyTag takes a different path. It aspires to be clear without being authoritative, visible without being intrusive. If it earns trust, even in small circles, FallacyTag might help shape a culture where reasoning becomes a shared responsibility, not a private burden.

**What does this mean for design?** FallacyTag treats fallacies not as definitive errors, but as structural signals—tentative cues to prompt reflection. By using hedged tags, localized explanations, and conservative thresholds, it stays grounded in what LLMs can reliably surface. Conceptual ambiguity isn’t a blocker—it’s a constraint to design around.

### 7.3 Social Feasibility: Between Usefulness and Blowback

#### Assessment: 🟡 Conditional—Usable in selective contexts, risky in general ones

Having spent a decade living in one of those classic San Francisco buildings, where you can hear cockroaches snoring in the apartment two doors down, I passed up countless opportunities to gently point out logical fallacies in my neighbors' conversations. I am not proud of my cowardice, though I suspect it's a minority remorse.

Humor aside, the point is serious: reasoning interventions are delicate. While the technical idea is promising, social and institutional dynamics can quickly turn even neutral features into flashpoints. Consider the reaction to automated content moderation tools like YouTube’s comment filters or Facebook’s misinformation labels. Though designed to improve discourse quality, they often triggered accusations of bias, political manipulation, or speech suppression. In many cases, the mere act of labeling content—regardless of accuracy—was seen as alignment with institutional power. Even in educational contexts, plagiarism detectors have drawn criticism for undermining trust and creating adversarial dynamics. Writing tools like GPT-based advisors and Gradescope-style rubrics have gained traction in classrooms, but not without criticism. Their success often hinges on whether they’re framed as aides to reflection or enforcement. Similarly, even systems that model reasoning structure well can fail if they overreach their context or suggest unintended authority. These examples underscore how even well-intentioned tools must navigate perception, not just function.

- **Risk of user misunderstanding**: Some users may interpret fallacy tags as authoritative fact checks, censorship, or ideological moderation. For example, in a heated election forum, a tag like 'false dilemma' applied to a candidate’s supporter could be seen as delegitimizing their viewpoint, potentially leading to accusations of bias by the platform or demands for tag transparency and reversal. Such cases can snowball into PR crises or policy disputes if not anticipated and managed carefully.

  - *Example*: A comment flagged for "appeal to emotion" in a political debate could be interpreted as bias—even if technically justified.

- **Vulnerability to performance**: Tags can be exploited rhetorically (“You got flagged!”) or serve as mockery. This undermines their intended purpose.

- **Differential trust tolerance**: Structured environments like academic classes or formal debates are more accepting of logic tools. Open social platforms may view them as intrusive.

- **Deployment approaches**:

  - Opt-in overlays (e.g., browser extensions for Reddit, news sites).
  - Private feedback tools for writers, educators, and researchers.
  - Pilots in logic-focused spaces (e.g., r/ChangeMyView, moderated classrooms).

#### Conclusion

{: .highlight }
Pilot wisely, or not at all.

FallacyTag can succeed in domains where users already value reflection and are open to structured feedback. It is ill-suited to general-purpose or adversarial platforms without robust customization and explanation layers.

Early deployment belongs in the bounded environments: logic-focused subreddits, academic writing seminars, structured peer review systems, internal product retrospectives, or postmortem discussions in engineering teams. These contexts allow careful calibration of tone, mutual expectations, and tolerance for ambiguity.

Broader use should wait until interpretability, opt-in mechanics, and user control are robust. FallacyTag isn’t a switch to flip globally—it’s a tool that must prove its value, one careful use case at a time.

Without careful scoping, FallacyTag could become not a tool for reflection, but a cudgel—wielded to shame, score points, or suppress dissent under the guise of reasoning.

**For builders, the first win isn’t scale—it’s fit**. Choose a setting where better reasoning is welcome and small mistakes don’t poison the well.

### 7.4 Summary Table

Taken together, these three dimensions—technical, conceptual, and social—don’t just define feasibility; they define the system itself. FallacyTag is not feasible despite its constraints, but because of them. Each boundary (sentence-level detection, hedged labeling, opt-in use) exists to manage a distinct risk: hallucination, misinterpretation, or misuse. When those boundaries align, the system becomes both workable and worthwhile.

The table below summarizes feasibility across all three dimensions—scoring likelihood, surfacing risks, and clarifying key design constraints.

| Dimension | Feasibility | Key Risks | Implementation Boundaries |
| --- | --- | --- | --- |
| **Technical** | 🟢 **High (narrow scope)** | Hallucination, ambiguous triggers, noise | Sentence-level inference; fallacy-type filtering; *does not generalize to subtle or novel patterns* |
| **Conceptual** | 🟠 **Moderate (boundaries matter)** | Fuzzy definitions, rhetorical overlap, cultural variance | Hedged labels; local explanations; *avoids deep premise analysis or intent modeling* |
| **Social/Product** | 🟡 **Conditional (context-sensitive)**  | Misinterpretation, backlash, misuse | Opt-in deployment; interface restraint; *unsuitable for adversarial environments without significant adaptation* |

### 7.5: Scope Boundaries: What FallacyTag Doesn’t Do

The diagram below outlines what FallacyTag is designed to detect—and what it deliberately avoids.

![Scope boundary](/fallacytag/assets/images/7.5%20-%20Scope%20Boundary.svg)
> Figure: FallacyTag Scope Boundary

FallacyTag is explicitly not a fact-checker or moderator. It neither assesses factual correctness nor judges the intent or sincerity behind claims. It focuses strictly on the surface structure of reasoning, detecting recognizable patterns historically associated with reasoning failures.

These constraints directly shape the interface:

- **Probabilistic tagging** produces intentionally hedged cues (e.g., “Possible false dilemma”) to indicate uncertainty transparently.
- **Surface structure** emphasis ensures tags maintain neutrality, refraining from judgment about intent or correctness
- **Sentence-level evaluation** prevents FallacyTag from speculative or global inference across arguments or contexts.

Respecting these scope boundaries is critical. Attempting to handle ambiguous fallacies, interpret intent, or verify truthfulness prematurely risks diluting user trust and increasing misinterpretation. Expansion beyond current constraints should proceed only after careful validation within tightly controlled use cases.

FallacyTag’s strength—and its trustworthiness—comes from this careful scoping. The moment it attempts more, it risks accomplishing less.

---

The following section examines how this constraint mindset carries through the system’s design, especially where stakes are high and ambiguity is fundamental.

---

[Previous](/fallacytag/pages/06-how-it-works){: .btn } [Next](/fallacytag/pages/08-constraints/){: .btn }

---
[^1]: Revision Assistant’s [white paper](https://help.turnitin.com/revision-assistant/student/assignments/understanding-signal-checks.htm) describes “Signal Checks” that highlight sentence‑level strengths and weaknesses tied to rubric-based feedback, visually scaffolded with icons and comments.
[^2]: Despite its pedagogical promise, [Revision Assistant](https://help.turnitin.com/Resources/RA%20Curriculum%20Resources/Research/Turnitin_Revision_Assistant___Behind_the_Scenes.pdf) never became a central offering within Turnitin’s portfolio and appears to have been quietly phased out—a pattern consistent with known institutional resistance to over‑automated feedback tools ([Inside Higher Ed., 2016, January 21](https://www.insidehighered.com/news/2016/01/21/turnitin-expanding-beyond-plagiarism-detection-launches-revision-assistant)).
[^3]: IBM’s [Project Debater](https://www.nextplatform.com/2019/03/27/ibm-project-debater-speaks-to-the-future-of-ai/) was engineered to identify claim structures, evidence clusters, and produce speech segments in live debate contexts, demonstrating argument-mining at scale ([Roitman et al, 2021](https://aclanthology.org/2021.emnlp-demo.31.pdf)).
[^4]: Coverage of its live debate against champion Harish Natarajan and analysis in [The New Yorker](https://www.newyorker.com/news/annals-of-populism/the-limits-of-political-debate) highlight that while the system excelled at data-driven argument, it struggled with the rhetorical subtlety, emotional resonance, and ambiguity intrinsic to open discourse.
[^5]: This mirrors broader insights in explainable AI: what matters most isn’t model transparency per se, but whether the system offers cues that users can understand and act on. [Lipton (2018)](https://doi.org/10.1145/3233231) argues that interpretability in machine learning is often misunderstood: developers conflate transparency with usability, or mistake post-hoc rationales for ground truth. FallacyTag’s interface design follows the more pragmatic view: it emphasizes actionable clarity over full model transparency, offering interpretive scaffolding rather than mechanical exposure.
[^6]: In FallacyTag, “probabilistic tagging” refers to soft classification based on the model’s estimated likelihood that a given span matches the structural profile of a fallacy type. These probabilities—derived from internal confidence scores or auxiliary classifiers—are not exposed to users numerically. Instead, they shape how tags are presented (e.g., hedged phrasing like “Possible false dilemma”) and how confidently a tag is surfaced in the UI. Unlike rule-based systems with fixed triggers, FallacyTag relies on surface pattern recognition guided by LLM inference and optionally refined through heuristics or human review. This design prioritizes flexibility and interpretive humility over deterministic output.
[^7]: [Lei & Huang (2024)](https://aclanthology.org/2024.emnlp-main.730) propose a Logical Structure Tree using constituency parses and connectives to model relations between argumentative spans, modestly boosting LLM-based fallacy detection in structured benchmarks. While theoretically rigorous, these methods require formal parse trees and are optimized for classification pipelines rather than real-time human-facing interaction.
[^8]: A tag is considered useful not when it proves someone wrong, but when it supports **cognitive activation**: prompting the user to pause, reconsider structure, or engage more deliberately with counterarguments. In writing contexts, success might look like increased revision of tagged sentences or greater diversity of rhetorical forms in subsequent drafts. In discussions, it might mean that a user edits or qualifies a claim, or simply signals awareness (“Fair point”). Even a low engagement rate (e.g., one in five tags sparking reflection) could constitute value if backlash and confusion remain rare.
[^9]: Many theorists argue that fallacy classification is inseparable from rhetorical context. [Tindale (2007)](https://www.cambridge.org/core/books/fallacies-and-argument-appraisal/201129A0FFA542571A10622B493D93A4) emphasizes that fallacies are best understood as dialogic missteps, not just structural violations, making audience, motive, and genre essential to judgment. [Hansen (2023)](https://doi.org/10.1007/s10503-023-09606-9) adds that fallacies often rely on what he calls the “appearance condition”: a poor argument that seems valid in context. [Hamblin (1970)](https://archive.org/details/fallacies0000hamb/page/n5/mode/2up), meanwhile, exposed a foundational ambiguity in how fallacies are defined—either too broad or too narrow to function consistently. FallacyTag sidesteps these tensions. It treats surface patterns as prompts, not verdicts—an approach aligned with usability over ontological precision.
[^10]: Research shows that localized, non-evaluative prompts about structure or reasoning—even without detailed feedback—can improve engagement, revision frequency, and metacognitive awareness. For instance, [Roscoe, Allen, and McNamara (2018)](https://files.eric.ed.gov/fulltext/ED590415.pdf) found that different tutoring formats influenced motivation and strategy uptake, while [Wilson and Roscoe (2020)](https://www.researchgate.net/publication/323326660_Metacognitive_Overload_Positive_and_Negative_Effects_of_Metacognitive_Prompts_in_an_Intelligent_Tutoring_System) observed that sentence-level cues increased revision behavior and rhetorical flexibility.
[^11]: E.g., [Teo et al. (2025)](https://link.springer.com/chapter/10.1007/978-981-96-8197-6_29), [Manickavasagam & Bandara (2025)](https://link.springer.com/chapter/10.1007/978-3-031-90341-0_4).
