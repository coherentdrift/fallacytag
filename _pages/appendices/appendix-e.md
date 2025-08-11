---
layout: default
title: "Appendix E - Independence, Correlation, and Weighting"
parent: Appendices
nav_order: 5
---

## Appendix E - Independence, Correlation, and Weighting
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

The seven dimensions in the [scorecard](/fallacytag/pages/09-worth-building/#93-the-scorecard) are deliberately scored independently and given equal weight in the overall total. This choice reflects a trade-off between methodological purity and practical usability.

### Why Independence Matters

Treating dimensions as independent forces the evaluator to consider each on its own merits. This:

- **Reduces double-counting** — Without separation, a single strength (e.g., precise discourse) might indirectly inflate scores in related areas (e.g., clarity of claims), creating a falsely positive profile.
- **Highlights weak links** — An excellent showing in five dimensions doesn’t obscure the fact that one or two are inadequate.
- **Allows targeted mitigation** — Some dimensions are more readily observable or controllable. For example:
  - User Control & Transparency can often be addressed via deployment choices.
  - Tag Interpretability depends more on shared scaffolding or onboarding.

Treating them independently allows for direct intervention where needed without recalculating the whole profile.
  
### Known Correlations

In practice, some dimensions will be statistically related.

Examples:

- Strong *Discourse Structure* often supports *Clarity of Claims*.
- *User Intent* and *Tone & Stakes* can influence each other in high-conflict settings.

We treat these as conceptually distinct despite overlap, for two reasons:

1. Correlation is not causation — a strength in one dimension doesn’t guarantee adequacy in another.
2. Correlation strength varies widely by context (e.g., formal debate vs. casual group chat).
3. Keeping them separate simplifies application and avoids the need for statistical modeling in deployment.

### Why Equal Weighting

Weighting dimensions according to perceived importance can, in theory, produce a more “accurate” measure. In practice, it often:

- **Invites meta-debates** — Discussions drift toward whether “Tone & Stakes” deserves more weight than “User Control & Transparency” instead of focusing on the evidence for each score.
- **Adds false precision** — Assigning, say, 1.5× to a dimension can imply a level of measurement accuracy we don’t actually have.

Our choice to weight equally is deliberate, not because all dimensions are equally important, but because:

- Their salience is context-dependent (e.g., Modality Fit may be critical for YouTube, less so for text forums).
- The goal is to provoke discussion, not enforce priorities.
- We want a usable default that minimizes subjective weighting disputes.
  
### Confidence in Measurement

Scoring confidence varies by dimension:

- Some scores reflect concrete, easily-verified conditions (Is the input text?).
- Others require contextual judgment (Is reasoning the goal?).

This hybrid nature reflects the tool’s role: not a precise readiness metric, but a structured prompt for reflective deployment.

### Possible Future Refinements

If the scorecard were deployed at scale and large, high-quality datasets were available, statistical analysis could inform:

- Adjusted weights to better predict successful deployments.
- Clustering or factor analysis to identify which dimensions most strongly co-vary in practice.
- Context-specific weight sets (e.g., separate for synchronous vs. asynchronous environments).

Until then, independence and equal weighting are pragmatic defaults: they minimize complexity, reduce bias from subjective weighting decisions, and keep the tool accessible to non-technical evaluators.
