---
layout: default
title: "Appendix D: FallacyTag Variability Model"
nav_order: 4
parent: Appendices
---

## Appendix D: FallacyTag Variability Model
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

This appendix presents a structured view of the FallacyTag architecture as a product line architecture (PLA), capturing its key variation points, available options, and constraints. It supports implementers in identifying viable configurations and understanding architectural trade-offs.

### 🔧 Variation Points Summary Table

| Variation Point      | Options                                                      | Constraints                                                                                      | Notes                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Privacy Handling** (Privacy ↔ Observability) | Local-only, Session-based, Identity-linked                   | Must preserve user autonomy; no profiling; minimal friction                                      | Options vary in how much data persists and travels: "local-only" retains nothing, "identity-linked" enables long-term telemetry, requiring strong safeguards. |
| **Inference Type** (Statelessness ↔ Adaptivity)  | Prompt-only, Session-adaptive, Fine-tuned w/ memory          | Must preserve auditability and avoid unpredictable drift                                         | "Prompt-only" provides maximal transparency. "Fine-tuned" risks subtle shifts. Session-adaptive sits in between, retaining state temporarily.                 |
| **Tag Strategy**  (Interpretability ↔ Expressive Power)   | Symbolic (sentence-level), Discourse-aware, Learned patterns | Must maintain interpretability; minimize hallucination                                           | "Symbolic" uses explicit templates and rule-based mappings. "Learned patterns" are more flexible but harder to explain.                                       |
| **UI Integration** (Separation ↔ Intrusion)  | Post-hoc Review, Inline Overlay, Export-Only                 | Must preserve primary experience flow; avoid disruptive or adversarial UX                        | "Post-hoc" works best in slower or asynchronous modes; "inline" suits text; "export-only" fits detached workflows like podcasts.                              |
| **Feedback Use**  | None, Aggregate Telemetry, User-linked Adaptation            | Feedback must not affect inference by default; linkage to identity must be explicitly authorized | Intersects both privacy and adaptivity: feedback pipelines can erode statelessness and compromise anonymity. Aggregate telemetry enables improvement without retraining or profiling.                |
| **Downstream Use** (Reflection ↔ Enforcement Drift) | Reflective tagging, Optional annotations, Scoring/moderation | Must avoid authoritative or punitive use; system intent must remain transparent | Tags may be reused for judgment or ranking downstream, even if designed for reflection. Implementers must guard against misinterpretation of system posture. |

### 🧭 Feature Hierarchy Diagram

![Feature hierarchy diagram](/fallacytag/assets/images/Appendix%20D%20-%20Feature%20Hierarchy%20Diagram.svg)

### 📌 Usage

This model provides implementers and researchers with a structured way to reason about system variants. It complements the prose discussion in [Section 6.2](/fallacytag/pages/06-how-it-works) and is suitable for:

- Evaluating architectural fit for a target domain (e.g., public discourse vs. classrooms)
- Documenting design decisions and their implications
- Supporting modular implementation planning

Future work may include mapping these features to implementation modules or tracing variation point dependencies.
