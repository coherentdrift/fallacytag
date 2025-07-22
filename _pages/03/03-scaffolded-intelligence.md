---
layout: default
title: "3. Scaffolded Intelligence: How LLMs Can Support Better Reasoning"
nav_order: 4
---

## 3. Scaffolded Intelligence: How LLMs Can Support Better Reasoning
{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}

Can large language models identify fallacies? Not reliably. However, we can set conditions that allow us to capture much of the potential value.

We begin with an anecdote that showcases an LLM’s surprising moment of clarity (Section 3.0), and probe the conditions under which that clarity arises (3.1). From there, we sketch a design path that works within those limits rather than against them (3.2), and argue that the resulting interaction model may not only be sufficient, but also desirable (3.3).

### 3.0 A Glimpse of What’s Coming

Not long ago, I watched a [well-intentioned, skillfully produced 23-minute YouTube video](https://youtu.be/qf7ws2DF-zk) with my son. It explored Arrow’s Impossibility Theorem and the limitations of ranked voting systems. The analysis was methodical — until [the final minute](https://youtu.be/qf7ws2DF-zk?t=1261), when the tone subtly shifted from formal analysis to civic appeal. Suddenly, “democracy” was no longer a voting procedure but a cherished ideal. *That* Churchill quote appeared — never a good sign[^1]. An emotionally satisfying, logically unmoored closing followed. My antenna twitched hard enough to unseat my trucker hat.

Mildly bothered but unwilling to allocate much CPU to parenting, I brushed off the moment with a few glib remarks and let GPT-4 do the explaining. I asked the reportedly shaky logician to assess the reasoning in the video’s conclusion. Without coaching or fine-tuning, the bot accurately autocompleted some fallacies that are generally thorny to detect — such as equivocation, appeal to sentiment, and category error — far beyond what I expected.

This wasn’t rote fallacy labeling. The model demonstrated contextual sensitivity — tracking meaning shifts, identifying rhetorical substitutions for logic, and anchoring its analysis in the argument’s actual structure. [Teo et al. (2025)](https://doi.org/10.1007/978-981-96-8197-6_29) found that LLMs stumble on these flaws. They tested multiple LLMs on a structured fallacy classification task and found that performance was strongest for shallow, syntactically cued fallacies such as ad hominem or circular reasoning. Success rates dropped sharply when fallacies demanded contextual reasoning — tracking shifts, ambiguity, or intent. In those cases, even large models struggled to apply definitions or reason consistently across contexts. The pattern suggests that fallacy detection isn’t just a matter of fluency, but of structural grounding — something today’s models rarely do reliably unless the structure is already implicit in the input.

And then it hit me: I had scaffolded the task. Not intentionally, I was just talking through what I wanted explained to my kid, but the result [looked suspiciously like prompt engineering](https://coherentdrift.github.io/fallacytag/pages/03/03-appendix-a/#-prompt). Great. I’d become part of the model’s reasoning pipeline.

The surprise wasn’t that the model flagged obvious errors — but that [it caught reasoning drift](https://coherentdrift.github.io/fallacytag/pages/03/03-appendix-a/#-gpt-response) you’d expect it to miss. The model identified those subtler flaws accurately, not because it understood, but because I shaped the task in a way that allowed it to navigate[^2]. A fluent moment — but scaffolded. That’s what makes it interesting: it invites a reframing. Not “Can models detect fallacies?” — but “What if we designed systems around reasoning structure, not correctness?”

That’s the hinge: fallacy detection is brittle — brittle to tone, intent, ambiguity. But surfacing structure? That’s tractable. And if done well, transformative.

### 3.1 What Can Work Now: A Narrower but Useful Path

If the model needed me in the loop to think straight, at least one of us was in trouble.

So I tried a simpler question:
>Can a general-purpose LLM, with a plain prompt and no scaffolding, surface informal fallacies in a way that feels grounded and legible to a layperson?

Not reliably, not exhaustively — just, sometimes, usefully.

I ran a comically small experiment to test it. I went to Reddit’s [*r/ChangeMyView*](https://www.reddit.com/r/changemyview/), picked the first thread that wasn’t a political minefield, and pulled three consecutive recent comments. [I fed them, one by one, into GPT-4](https://coherentdrift.github.io/fallacytag/pages/03/03-appendix-b/) with a basic prompt: identify any flawed reasoning and explain why. No special formatting, no chain-of-thought nudges.

The [thread](https://www.reddit.com/r/changemyview/comments/1lp8uh9/cmv_local_politics_is_much_more_important_to_your/)’s claim was typical: “Local politics is much more important to your life than national politics.” The replies were sincere but messy—ripe for overreach.

- One cited Canadian municipalities to argue national politics mattered more. GPT flagged a false analogy and unsupported empirical claim. Fair.
- Another drew a neat line: local = speed bumps, national = healthcare. GPT pointed to false equivalence and oversimplification. Again, fair.
- A third listed federal programs to argue that national politics is more consequential. GPT noted cherry-picking and scope shifting—raising lifetime-scale policies to counter local day-to-day effects.

This wasn’t exactly a rigorous evaluation — three comments, one researcher, zero inter-rater reliability. However, under plain conditions, the model provided structured and sensible feedback. This is where prior studies suggest models have the best chance of success — and where a product like FallacyTag might be viable.

### 3.2 Designing Within Limits

FallacyTag isn’t a truth judge. It flags form, not verdicts. Instead of asking whether a claim is right or wrong, it highlights how the reasoning is shaped—inviting reflection rather than imposing judgment. That shift in design intent makes all the difference.

Structure-surfacing is tractable because it sidesteps the hardest parts of reasoning. Here’s how that tractability shifts depending on the type of reasoning and the structure of the input:

|                         | Plain but Coherent Text             | Disjoined Text              |
|:------------------------|:------------------------------|:----------------------------------|
| Surface-Level Fallacies | ✅ Reliable                    | ⚠️ Sometimes (depends on clarity) |
| Contextual Fallacies    | ⚠️ Possible (with scaffolding) | ❌ Fails: too messy / brittle     |

GPT-4 can help—but, by itself, it's not enough of an answer. The earlier examples worked because the task was shaped to fit the model’s strengths: clear text, stable discourse, no ambiguity about roles. The model followed a structure I didn’t even realize I was providing. That’s not product behavior—it’s scaffolded response.

Why doesn’t that generalize? Because the hard parts remain hard. LLMs still flounder with messy discourse, shifting tone, unstable goals. They don’t know when they’re helping—especially when reasoning becomes social, not just logical. A correct tag, surfaced at the wrong moment, can derail reflection. Reasoning isn’t just about logic. It’s about timing, tone, and trust.

That’s not about accuracy. It’s about fit—the difference between a system that clarifies and one that corrodes. Prompts can’t patch that gap. Prior efforts have tried: instruction tuning, custom prompting, multi-turn clarification[^3][^4]. These work in ideal settings, with motivated users.[^5][^6][^7] They don’t scale to noisy, asynchronous discourse.

FallacyTag takes a different tack: it accepts the limit and designs within it. No general truth judgments. No deep inferences. Just structural cues surfaced where the model’s fluency is stable—and offered only when useful.

So the MVP has to respect both constraints:

{: .highlight }
- **Model limits** define what can be flagged.
- **Interface design** defines how—and whether—it should be shown.

That path is narrow but viable: sentence-level cues, tuned to form over content, optional and deferential.

FallacyTag doesn’t try to be right—it tries to help. It surfaces the shape of reasoning: binary frames, abrupt pivots, unstable structure. Sometimes that shape hints at a fallacy; sometimes it just invites a second look.

This isn’t correctness automation. It’s structural affordance. And that’s the bet: that even a soft, nonjudgmental tag — if offered at the right time, with the right tone — can open space for reflection.

### 3.3 Nudges as Pedagogical Design

Leo Tolstoy spent years trying to define art, writing a [dense philosophical tome](https://www.gutenberg.org/files/64908/64908-h/64908-h.htm) that sprawls across almost 200 pages—only to arrive at a surprisingly simple idea: art is the transmission of emotion from artist to audience. He could have said it in a few paragraphs. After reading this section, you may be able to relate to Tolstoy's readers.

The interaction model outlined in Section 3.2—where the system highlights reasoning that may warrant another look without outright calling it fallacious—is not just a fallback when the model is uncertain. It may be the best way to promote critical thinking, precisely because of how it distributes both cognitive and social responsibility. What we discovered on our trek through the Himalayas, driven by technical necessity, was always nearby, on level ground, with signs, if we looked through the lens of pedagogical virtue.

From a learning science perspective, brief cognitive interruptions that demand user engagement are often more effective than immediate explanations. Theories of desirable difficulties[^8] show that introducing effortful, nontrivial steps—such as prompting a learner to retrieve or self-explain—can improve both retention and transfer. Rather than simply delivering the “correct” fallacy label, a nudge invites the user to reflect: Could something be wrong here? Why might this feel off? This preserves the productive discomfort that is central to metacognitive learning[^9], aligning with research that shows that prompting reflection improves the quality of argumentative writing more than providing corrective feedback alone[^10].

Socially, nudges avoid the defensive posture often triggered by direct correction. In domains where argument intersects with identity—such as politics, culture, or values—overt labeling of fallacies can be perceived as dismissive or adversarial. Behavioral research on reactance[^11] suggests that people are more likely to resist information when it threatens autonomy. Soft interventions such as prompts or open-ended cues tend to preserve engagement, especially in mixed-audience or ideologically diverse environments. A system that says, “You may want to rethink this” invites participation; one that says, “You’re wrong” invites rejection.

![The surprising power of soft touch](/fallacytag/assets/images/3.3%20-%20The%20surprising%20power%20fo%20a%20soft%20touch.svg).
>*Figure: The surprising power of a soft touch.*
>
>FallacyTag’s “nudge” design isn’t a fallback. It’s a convergence point: four fields of research point to the same principle—people think better when they’re invited to reflect, not told they’re wrong.

This approach also scales better across uncertain or ambiguous cases. In many instances, what appears to be a fallacy may hinge on context, unstated assumptions, or interpretive nuance. Flagging such moments as “potentially problematic” rather than conclusively fallacious reflects appropriate epistemic humility. It helps the system avoid overclaiming and keeps the user informed, encouraging co-interpretation rather than authority-based override.

Finally, this model has the potential to shift norms[^12]. A system that reliably surfaces “moments worth pausing over” could, at scale, foster new habits of attentiveness. Rather than modeling omniscient critique, it models curiosity. And rather than framing fallacy detection as adversarial or corrective, it reframes it as an act of intellectual care: paying attention to structure not to win, but to gain a deeper understanding. In this way, what began as a workaround for model fallibility becomes a design stance toward better reasoning—both human and machine.

Designing for fallacy detection under uncertainty might seem like a compromise. But as the shape of the solution emerges—from selective signaling to user-side engagement—it begins to look less like a concession and more like a blueprint for something better: a reasoning aid that doesn’t dictate truth, but invites rigor. One that foregrounds structure without overreach—a useful pattern not just for machines, but for people.

Next, we'll explore what it means to build from those boundaries.

---

[Previous](/fallacytag/pages/02-the-architecture-of-avoidance){: .btn } [Next](/fallacytag/pages/04-introducing-fallacytag/){: .btn }

---
[^1]: Antifreeze & Coolant is the worst shampoo — except for all the others in my garage. No, we shouldn't submit to Churchill's appeal to [relative privation](https://www.logicallyfallacious.com/logicalfallacies/Relative-Privation) and stop seeking better forms of government.

[^2]: The source material helped: a serious, methodical, good-faith analysis with a single jarring tonal shift. In benchmark terms, this was a clean input — not a chaotic social media thread. The conditions were ideal for the model’s strengths.

[^3]: [Du, K., Xing, F., Mao, R., & Cambria, E. (2024)](https://ieeecai.org/2024/wp-content/pdfs/540900a183/540900a183.pdf). The authors demonstrate that GPT-3.5 and PaLM-2 lack robust reasoning ability even in a structured domain like finance, particularly in tasks involving comparative and numerical reasoning. Performance improved significantly only when tasks were scaffolded with **attribute-specific** prompts—suggesting that without external structure, reasoning degrades even under domain constraints.

[^4]: [Lim, G., & Perrault, S. (2024)](https://arxiv.org/abs/2404.05213). While GPT-4 achieved high accuracy on a curated fallacy classification task, success required prompt tuning and failed to generalize to subtler or interpretive fallacies. The authors caution against over-interpreting such results as evidence of deep reasoning capacity, especially for real-world applications. 

[^5]: [Manickavasagam, A., & Bandara, D. (2025)](https://doi.org/10.1007/978-3-031-90341-0_4). Logical fallacy detection performance improves with zero-shot chain-of-thought prompting and task-specific fine-tuning; however, success is highly sensitive to the prompt format and context. Even with a tuned GPT-3.5 model, accuracy varied across fallacy types, with interpretive and intent-based categories remaining brittle. 

[^6]: [Alhindi, T., Chakrabarty, T., Musi, E., & Muresan, S. (2023)](https://arxiv.org/abs/2301.09992). Their method uses multitask prompts and dataset-aware formatting to improve generalization across structured fallacy corpora. However, success still depends on having clean data and ideal conditions—fallacies are labeled ahead of time, prompts are structured, and ambiguity is minimized.

[^7]: [Schneider, J., Haag, S., & Kruse, L. (2025)](https://doi.org/10.1007/978-3-031-83845-3_15). In a negotiation game with GPT-3.5, the authors demonstrate that users can “hack” the model through strategic misdirection, repetition, or invented flaws—highlighting not only reasoning vulnerabilities but also the inaccessibility of prompt engineering to most participants. The wide variance in outcomes exposes serious gaps in AI literacy and reliability.

[^8]: Bjork, R. A., & Bjork, E. L. (2011). Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning. In D. S. Dunn (Ed.), Psychology and the Real World: Essays Illustrating Fundamental Contributions to Society (pp. 56–64). Worth Publishers.

[^9]: [Schraw, G., & Dennison, R. S. (1994)](https://doi.org/10.1006/ceps.1994.1033). This paper introduces a widely used framework for assessing metacognitive regulation. The distinction between cognition and metacognition is helpful here: FallacyTag doesn’t merely flag content errors—it prompts awareness of reasoning itself, nudging users toward reflection about how they think, not just what they say.

[^10]: [Nussbaum, E. M., & Kardash, C. M. (2005)](https://doi.org/10.1037/0022-0663.97.2.157). In this study, students who were prompted to reflect or generate counterarguments produced more sophisticated arguments than those who received direct corrective feedback. It supports the idea that gentle prompts to reconsider structure may be more educationally valuable than simply identifying a fallacy label.

[^11]: Brehm, S. S., & Brehm, J. W. (1981). Psychological Reactance: A Theory of Freedom and Control. Academic Press.

[^12]: See [2. The Architecture of Avoidance](/fallacytag/pages/02-the-architecture-of-avoidance/#20-whats-avoided-at-scale), where we traced a positive feedback loop that erodes public reasoning by making structure harder to see and therefore less likely to be used. If FallacyTag can surface structure gently, even sporadically, it might dampen that loop. That’s not just a UI choice—it’s a norm intervention.
