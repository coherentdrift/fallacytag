---
layout: default
title: "Appendix C: On Learning from User Feedback"
nav_order: 3
parent: Appendices
---

## Appendix C: On Learning from User Feedback

### B.1 The Intuition

FallacyTag invites feedback. When a user marks a tag as “incorrect,” that judgment is recorded. In theory, such input could help the system improve—by refining detection strategies, adjusting thresholds, or adapting to context over time. The intuition is familiar: learn from disagreement.

But in practice, learning from this kind of feedback is much harder than it looks.

### B.2 Why Feedback Is Ambiguous

Not all rejections are equal—and not all are about reasoning. A user might dismiss a tag because:

- It feels wrong for the tone or genre (e.g., casual podcast vs. formal debate)  
- They don’t like the interruption  
- They agree with the conclusion, and mistake critique for contradiction  

In reasoning contexts, the line between *“this is a fallacy”* and *“this rubs me the wrong way”* is thin. Even sincere feedback can mislead if the signal is entangled with sentiment, ideology, or attention mode.

### B.3 Social Bias and Tribal Rejection

Beyond ambiguity, there’s distortion. In public contexts, feedback is shaped by:

- **Confirmation bias** — users tend to protect reasoning they agree with  
- **Social signaling** — rejections often reflect tribal alignment, not logical appraisal  
- **Moral loading** — tags may be read as ideological attacks, not structural cues  

In polarized environments, these effects can dominate. Tags get rejected not because they’re wrong, but because they’re unwelcome. In such settings, FallacyTag may not be misfiring—it may simply be misfit.

### B.4 Strategies Considered (and Their Limits)

We explored multiple feedback-driven improvement strategies:

| Strategy                | Idea                                        | Limitation                                                    |
|-------------------------|---------------------------------------------|----------------------------------------------------------------|
| Rejection Clustering    | Flag tags that get dismissed often          | May reinforce local bias or majority opinion                   |
| Contextual Caching      | Tune logic by media format or genre         | Requires strong priors; risks overfitting                      |
| Prompt Chain Feedback   | Feed rejections back into generation chains | Adds complexity without clear gains                            |
| Revision Tracing        | Look for edits following dismissals         | Sparse and difficult to correlate with feedback meaningfully   |
| Cohort Modeling         | Segment users by behavior for weighting     | Requires scale and raises privacy/framing questions            |

Each approach offered a partial signal. None yielded a robust, general-purpose improvement loop.

### B.5 Why the Loop Is Open—For Now

FallacyTag currently stores feedback but does not act on it. This is intentional.

In a system designed to support reasoning—not just user preference—learning from ambiguous or adversarial signals may do more harm than good. The system might shift toward comfort, not clarity.

The right path may involve:

- Better modeling of user intent  
- New interaction patterns that disambiguate feedback  
- Feedback that arises from editing behavior, not just button taps  

Until then, restraint is a feature, not a limitation. The system listens—but it does not contort.