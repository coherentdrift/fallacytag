---
layout: default
title: 6. How It Works
nav_order: 7
---

## 6. How It Works
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}
---

### 6.0 System Architecture: Core Pipeline

FallacyTag is a modular system designed to surface informal reasoning flaws in near real time—supporting reflection, not enforcement. Its architecture scaffolds awareness without overstepping into correctness policing or ideological filtering. Every design decision—from sentence-scoped inference to symbolic tagging and optional feedback—serves this posture: to promote interpretability, protect agency, and enable insight without control.

While the core engine is shared across media, execution paths diverge by modality—particularly in how fallacies are surfaced, interpreted, and acted upon. As detailed in [Section 5.5](/fallacytag/pages/05-modalities-and-fit/#55-from-logic-to-delivery-adapting-the-pipeline), text allows inline tagging and real-time interaction; video supports scroll-synced overlays or delayed review; and audio restricts feedback to post-hoc summaries or ratings. These constraints don’t just shape the how of delivery—they influence what can be surfaced at all. Subtle or interpretive fallacies may be reserved for modalities with richer context and more forgiving UX, while simpler, structurally distinctive fallacies can be safely tagged across formats. This section sets aside those delivery-layer specifics to focus on the core, modality-agnostic pipeline that drives all deployments.

#### 🔁 System Flow (Conceptual Sketch)

The conceptual pipeline below illustrates the architecture’s top-down flow:

![System flow](/fallacytag/assets/images/6%20-%20System%20flow.svg)
> *Figure: System Flow Overview*

The pipeline flows top-down, from raw input to user-visible tags and optional telemetry. Each stage—preprocessing, inference, tagging, display, feedback—is modular, enabling platform flexibility, targeted testing, independent upgrades, and runtime introspection across deployment environments. Inference execution may vary by context: synchronous for small browser-based use, and batched or asynchronously queued in larger-scale or server-hosted deployments. Future deployments may include policy-based model routing, dynamically selecting among local, remote, or compressed inference backends based on platform constraints, latency budgets, or privacy posture. Failures in one component (e.g., inference timeout or malformed tag) are quarantined by design, allowing downstream stages to continue without disruption.

### 6.1 Key Components

Each pipeline component plays a distinct role in transforming input into interpretable tags. Though modular, they work in concert to uphold FallacyTag’s core commitments: scoped reasoning, symbolic clarity, and user-centered feedback.

Below, we walk through each pipeline component shown above, clarifying its role, boundaries, and behavior.

#### 📅 Input Source

The system operates on textual transcripts, regardless of the original input medium. For native text sources, such as Substack posts or article excerpts, the transcript is extracted and segmented. For audio and video sources, transcripts are obtained either from host platforms (e.g., YouTube captions) or generated via automatic speech recognition (ASR) when no aligned transcript is available[^1].

Once in transcript form, the input is segmented into interpretable units. For text, this typically means sentence- or paragraph-level chunks. For audio and video transcripts, the system preserves timestamp alignments to support downstream tagging and review. Segmentation aims to balance contextual coherence with UI anchorability: longer spans improve reasoning fidelity, but may be harder to surface precisely in the interface.

This layer may also apply domain-specific filters—e.g., limiting analysis to opinion sections or speaker turns longer than 10 seconds. It is also responsible for privacy filtering, deduplication, and suppressing segments previously tagged or flagged.

#### 🪜 Preprocessing & Parsing

Input is cleaned, span-split, and optionally filtered (e.g., quotations, sarcasm, or unattributed fragments). This stage may incorporate platform-specific exclusions.

#### 🧠 Inference Engine (LLM)

Each transcript span is evaluated by a **prompt-tuned LLM**, which returns

A confidence-ranked list of fallacy candidates

A reasoning span for each candidate (e.g., sentence or token range)

A short **explanatory stub** for the top candidate

These stubs are displayed alongside tags to support lightweight reflection, and may also inform prompt tuning or tag clustering.

If the model returns invalid output or fails to meet minimal structural guarantees, the span is silently skipped, ensuring graceful degradation with no interface disruption. Inference traces—including prompt version, candidate list, scores, reasoning spans, and explanations—can be logged for debugging or audit purposes, subject to deployment-specific privacy constraints.

The model is **not fine-tuned**.

#### 🏷️ Tag Generation

Inferred flaws are matched to a **curated taxonomy** of sentence-detectable, structurally distinctive fallacies (e.g., ad hominem, straw man). Each tag includes metadata for confidence, severity, and display logic. Matching is based on heuristics over LLM output patterns, confidence scores, and linguistic cues, with fallback rules for handling overlaps or ambiguity between candidate tags. Tagging behavior is versioned alongside the taxonomy, allowing detection logic to evolve without ambiguity or retroactive reinterpretation of prior outputs. The taxonomy itself is defined externally in a structured, versioned format, enabling modular updates and safe expansion as reasoning patterns or discourse norms evolve.

#### 🖼️ UI Overlay & Display

Tags are rendered inline or adjacent to the original text, depending on the platform. Multiple tags per span may stack, sequence, or be summarized for clarity. The UI emphasizes minimal disruption and reader agency. Tag anchoring relies on stable identifiers—such as character offsets, speaker timestamps, or structural markers—depending on the platform, to ensure resilience against layout changes or content updates. Tag display behavior—such as stacking thresholds, visibility toggles, or label phrasing—is governed by configurable UI policies, not embedded logic, enabling safe and targeted evolution over time.

#### 👍 User Feedback Layer

Users may agree with or dismiss tags. All feedback is **local by default**. Repeated actions may alter tag visibility, but never affect inference.

#### 📊 Telemetry Aggregator (Opt-In)

When enabled, telemetry aggregates **anonymized** feedback patterns without identity linkage, session tracking, or device fingerprinting. Tracked metrics may include tag-level dismissal or confirmation rates, frequency of no-feedback spans, and overall fallacy type distributions. These aggregate signals help surface system-level blind spots or UX friction points.

Critically, this feedback is not used to retrain the model or alter inference. Its purpose is diagnostic, not adaptive: to inform future prompt versioning, guide interface tuning, and support regression testing, without compromising user privacy or autonomy.

#### 🛠️ Heuristic Tuning / Prompt Updates

Based on population-level feedback, human reviewers may adjust prompts, thresholds, or tag phrasing. No model weights are changed. Updates are periodic, reversible, and auditable. Prompt and taxonomy changes are gated by human review and may require stability checks—such as regression tests against known span sets—to prevent unintended behavioral drift. Evaluation of prompt effectiveness may include aggregate dismissal patterns, manual review, and selective precision-recall estimation over curated test sets.

---

While each component is defined here, some behaviors are intentionally left flexible. Section 6.2 explores how these components may be varied to suit different goals.

### 6.2 Implementation Spectrums and Design Posture

The architecture described above is not a fixed blueprint—it’s a flexible foundation. While the overall pipeline remains stable, key components can behave quite differently depending on the values and context of a particular deployment. These choices aren’t just technical—they reflect deeper commitments. This section explores five such spectrums: recurring tensions that shape what FallacyTag is, and what it isn’t.

These spectrums represent recurring, structured points of variation—places where thoughtful implementers are likely to diverge. In software engineering, this idea is formalized as a *product line architecture* (PLA): a family of related systems built from shared parts with intentional variability[^2]. A summary of this model is available in [Appendix D](/fallacytag/pages/appendices/appendix-d).

Five key variation points define the FallacyTag product line.

#### Variation Point 1: Privacy ↔ Observability

*Options*: Local-only feedback, session-based tracking, identity-linked telemetry

*Constraints*: Must preserve user autonomy, avoid behavioral profiling, and support aggregate system-level tuning only

FallacyTag treats user privacy as a first-order constraint. Feedback is local by default, and telemetry—when present—is system-level, optional, and anonymous. This posture rules out identity-linked traces or persistent profiling. However, it still allows for diagnostic aggregation: signals such as dismissal rates, tag confirmation ratios, and non-response frequencies can be collected across users in an anonymized form.

This tradeoff limits the system’s ability to trace individual or session-level failures over time. Without persistent cross-user traces, it may miss finer-grained UX friction, blind spots, or regressions. That said, FallacyTag remains unconvinced that per-user feedback pipelines meaningfully improve reasoning quality. It draws a bright line between **diagnostic telemetry**, which supports quality assurance, and **adaptive inference**, which could compromise interpretability, stability, and trust.

In more bounded or cooperative domains—such as classroom settings, research communities, or opt-in enterprise contexts—the calculus may shift. Richer feedback collection may be acceptable, or even desired, so long as consent and transparency are preserved. In contrast, broad public deployments must prioritize minimalism to earn trust.

#### Variation Point 2: Interpretability ↔ Expressive Power

*Options*: Sentence-level symbolic tags, discourse-aware analysis, learned tag patterns. 

*Constraints*: Must preserve transparency and attribution; hallucination and ambiguity must be minimized.

The system limits analysis to sentence-level spans and matches flaws against a curated, symbolic taxonomy. This enables clean attribution and minimal hallucination. But it also excludes longer-span reasoning flaws, discourse-level inconsistencies, and many fuzzy rhetorical tactics. Some implementations may favor broader context windows or learned tag patterns. Those changes might improve coverage, but likely at the expense of transparency, stability, and user trust.

For example, implementations targeting more structured or "friendly" domains—such as academic writing or formal debate—may tolerate greater expressive complexity. These contexts often assume a higher baseline of coherence, tone, and seriousness, creating more headroom for experimental models or broader reasoning spans without destabilizing the user experience.

#### Variation Point 3: Statelessness ↔ Adaptivity

*Options*: Prompt-only inference, session-tuned prompting (e.g., models that adapt formatting or content over short-lived sessions without persistent memory), fine-tuned models with memory.

*Constraints*: Must support versioning and auditability; adaptive behaviors must not compromise traceability.

Inference is stateless, using prompt templates rather than feedback-driven retraining. This ensures version control and resistance to drift. But it also constrains the system’s ability to adapt, whether to user preferences, emergent discourse forms, or adversarial input. Fine-tuning, memory, or session-based models may offer responsiveness, but they introduce new forms of opacity, brittleness, and alignment risk.

#### Variation Point 4: Reflection ↔ Enforcement Drift

*Options*: Reflective tagging, optional user annotations, and downstream scoring. 

*Constraints*: Must avoid authoritative or punitive use; system intent must remain transparent

FallacyTag is built for reflection, not adjudication. It avoids verdicts. But that posture is not always preserved downstream. Tags that signal flawed reasoning may be reused—deliberately or not—for scoring, ranking, or moderation. Licensing and UI design can discourage misuse, but not prevent reinterpretation. Implementers should consider how their choices affect not only what the system outputs, but also how that output may be reinterpreted.

#### Variation Point 5: Separation ↔ Intrusion

*Options*: Post-hoc Review, Inline Overlay, Export-only

*Constraints*: Must preserve primary experience flow; avoid disruptive or adversarial UX

Different UI integration strategies shape how users encounter tags. FallacyTag favors separation: tagging occurs post-hoc or inline in ways that are intentionally non-disruptive. But some deployments may prefer intrusive feedback—such as real-time overlays or active interventions—especially in structured settings like classrooms or productivity tools.

- Post-hoc review works best in slower or asynchronous workflows, such as reviewing essays, analyzing forum threads, or reflecting on meeting transcripts.
- Inline overlays can be helpful for textual feedback, but risk breaking flow if overused.
- Export-only modes may suit cases where tagging is detached from the original user experience.

This spectrum shapes user trust and retention: interventions that feel overly assertive or judgmental may erode engagement, even if they improve clarity.

---

[Appendix D](/fallacytag/pages/appendices/appendix-d) provides a tabular summary of these variation points, including constraints and deployment contexts.

While [Section 6.2](fallacytag/pages/06-how-it-works/#62-implementation-spectrums-and-design-posture) surfaces variation points across the product line, the sections that follow document one principled configuration. These decisions are neither arbitrary nor final, but they reflect an opinionated stance, optimized for clarity, trustworthiness, and feasibility. Other deployments may differ. This one is buildable.

### 6.3 One Configuration: Functional and Non-Functional Design Commitments

Having mapped the key axes of variability, we now describe one concrete implementation. This build draws on established reference patterns—common to writing tools, content moderation pipelines, and explainable AI—but applies them with specific architectural commitments. While FallacyTag aligns with best practices in NLP and content tagging, it departs from enforcement systems and agentic LLM chains where transparency, restraint, and trustworthiness are harder to guarantee.

#### ✅ Functinal Alignment

The following functions define the baseline configuration used in current prototypes and illustrative use cases. Other deployments may adapt or extend them.

| **Function** | **FallacyTag Implementation** | **Proven Reference Points** | **Variation Point** |
| --- | --- | --- | --- |
| **Input Preprocessing** | Segment into sentence-level spans, filter quotes/sarcasm | Content moderation tools (e.g., Perspective API) | Tag Strategy |
| **Local Inference** | Prompt-tuned LLM analyzes local structure for flaws | Symbolic NLP tagging (Turnitin, Grammarly) | Inference Type |
| **Symbolic Tag Generation** | Fallacy labels with confidence, stub, metadata | FactRank, argument mining tools | Tag Strategy |
| **UI Overlay** | In-line or adjacent tags, minimal disruption | Writing tool plugins, browser-based linters | UI Integration |
| **Feedback Collection** | Local-only agree/dismiss actions | Explainable AI UX patterns | Feedback Use |
| **Telemetry Aggregation** | Anonymized, periodic, system-level only | Apple differential privacy model, DuckDuckGo telemetry | Privacy Handling |

These patterns enable fast inference, high interpretability, and platform-agnostic deployment.

#### 🔒 Configuration Commitments (How This Variant Behaves)

FallacyTag encodes architectural constraints that serve its mission: transparency, restraint, and trustworthiness. These aren't limitations—they are **deliberate tradeoffs**.

| **Concern**    | **FallacyTag Constraint**  | **Typical Alternative** |
|----------------------|----------------------------|-------------------------|
| **Interpretability** | In this configuration, inference is scoped to sentence-level spans only. This avoids logic that crosses sentences or paragraphs, reducing hallucinations and enabling clear attribution of each tag. This constraint is enforced by limiting input spans at preprocessing and rejecting prompts that reference prior context. For example, the system does not attempt to detect multi-sentence causal chains or inconsistencies that emerge across paragraph boundaries. | CoT, ReAct, discourse-aware transformers |
| **Latency** | Stateless, span-by-span inference supports low-latency interaction in this variant. This allows for fast, lightweight evaluation—suitable for browser extensions, transcripts, or streaming UX. Simple latency ceilings (e.g., per-span inference < 200ms) may serve as fitness functions in live deployments.  | Agent orchestration, multi-hop reasoning |
| **Privacy** | User interactions (e.g. thumbs-up/down) remain local by default in this configuration. Optional telemetry is restricted to system-level aggregation and does not include identity, history, or session linkage. | Adaptive models, A/B tuning, user profiling |
| **Stability**    | Versioned prompt templates enforce consistent behavior and auditability in this configuration, avoiding feedback-driven retraining. This ensures that reasoning behavior is auditable, reversible, and resistant to drift. | Fine-tuned or RAG-based self-adjusting systems |
| **Portability**  | System components—preprocessing, inference, tagging, and rendering—are modular and decoupled, enabling deployment across heterogeneous environments (e.g., browser extension, server batch, embedded transcript viewer) without altering core logic. This separation also supports independent versioning, targeted upgrades, and fault isolation. Platform-specific constraints (e.g., memory or model size) may require lightweight models, quantized variants, or delegated inference in edge deployments. These modular boundaries also support other product variants with different deployment environments or model constraints. | End-to-end, opaque cloud APIs with fixed UX |
| **Adversarial Input**| LLM-based span analysis may be misled by adversarial phrasing, sarcasm, rhetorical questions, or malformed syntax. | Future versions may explore robustness benchmarks or adversarial test cases, but the MVP assumes cooperative input. |

### 6.4 Architectural Risks and Limitations

This configuration reflects principled constraints, but those choices introduce tradeoffs. The table below surfaces key risks, grouped by system layer.

| **Risk Category**   | **Risk Description** | **Mitigation Strategies** | **Variation Point**  |
|-----------------------|----------------------|---------------------------|----------------------|
| **Reasoning Scope** | Sentence-level analysis may miss fallacies that span multiple sentences or turns, risking false negatives. This significantly limits the ability to identify more complex, holistic reasoning flaws. | Clarify scope in UI; explore future discourse-aware modules. | Tag Strategy |
| **Prompt Drift**  | Prompt-only control avoids retraining but still permits subtle behavior changes over time. | Strict versioning, changelogs, and regression trace validation. Ensuring consistent behavior across updates remains a challenge. Prompt effectiveness may be evaluated using span-level precision over test sets, aggregate dismissal patterns, or telemetry-driven heuristics. These signals inform updates without requiring retraining or compromising traceability. | Inference Type |
| **Tag Overload**  | Multiple tags per span can overwhelm users or reduce trust in signal quality. | Composite tags, user-tunable verbosity, and minimum confidence thresholds. | Tag Strategy |
| **Tag Misinterpretation** | Users may treat tags as verdicts, even though the system avoids factual adjudication. | Tentative language in UI (e.g., “Possible”), hoverable rationale, and clear disclaimers. | Downstream Use |
| **Component Drift** | Decoupled modules (e.g., preprocessing vs. UI) may fall out of sync, causing mismatches or bugs. | Early schema contracts in place between preprocessing and tagging modules; integration tests using real-world spans planned for post-MVP rollout. Fitness functions may later track version compatibility across modules. | UI Integration |
| **Feedback Blindness**| Privacy-first feedback limits visibility into real-world failure cases or UX pain points—especially without persistent session or identity linkage. | Use aggregate, anonymous telemetry to surface broad patterns (e.g. frequent dismissals). Encourage opt-in diagnostic instrumentation in bounded contexts. Consider pairing with small-scale, human-in-the-loop review when feasible. | Privacy Handling, Feedback Use |
| **Downstream Misuse** | External users or platforms might repurpose tags for enforcement, moderation, or scoring—against the system's design intent. | Licensing limits, public documentation of purpose, and—if required—tag-level metadata or watermarking to track provenance and discourage repurposing. | Downstream Use |
| **Adversarial Input** | LLM-based span analysis may be misled by adversarial phrasing, sarcasm, rhetorical questions, or malformed syntax. | Future versions may explore robustness benchmarks or adversarial test cases, but the MVP assumes cooperative input. | Not currently mapped to a variation point, but may warrant future expansion of product-line scope.   |

These risks are specific to the current configuration. As the FallacyTag product line evolves, new variation points (e.g., adversarial robustness) may emerge, offering additional tradeoff surfaces.

---

FallacyTag’s architecture encodes more than a pipeline—it expresses a stance. By privileging transparency over adaptation, modularity over monoliths, and reflection over adjudication, it aims to create space for clearer thinking, not to enforce it. Even if it fails to improve discourse, it shows that reasoning can be surfaced architecturally, without policing or intrusion.

---

**What’s next?**

We’ve shown that FallacyTag is buildable. But that’s not the same as saying it’s feasible. [Section 7](/fallacytag/pages/07-feasibility) steps back to ask a harder question: Could this work in the real world, not just as a system, but as a product? The analysis that follows considers technical performance, conceptual integrity, and social fit, because success depends on all three.

---

[Previous](/fallacytag/pages/05-modalities-and-fit){: .btn } [Next](/fallacytag/pages/07-feasibility){: .btn }

---

[^1]: ASR-generated transcripts may include recognition errors, especially in noisy environments, with overlapping speech, or when speakers have uncommon accents. While sufficient for many use cases, these imperfections can occasionally affect tagging accuracy.
[^2]: *Product Line Architecture (PLA)* is a formal software engineering methodology for designing families of systems with shared components and intentional variation. It helps structure design choices across a solution space, rather than prescribing a single implementation. See [Pohl et al., 2005](https://link.springer.com/book/10.1007/3-540-28901-1) for an overview, or [Clements & Northrop's Software Product Lines (SEI, 2001)](https://www.sei.cmu.edu/library/software-product-lines-practices-and-patterns/) for foundational guidance.
