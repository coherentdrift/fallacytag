---
layout: default
title: "5. Mediums, Modalities and Fit  "
nav_order: 6
---

## 5. Mediums, Modalities and Fit
**Designing FallacyTag for Text, Audio, and Video**

{: .no_toc }

## Table of Contents
{: .no_toc .text-delta }

- TOC
{:toc}
---

FallacyTag is built around language. But language unfolds differently depending on where—and how—we encounter it. A Reddit debate, a scripted podcast, and a live Twitch stream all rely on words, but differ radically in pace, tone, and user intent. These differences aren’t cosmetic. They shape how reasoning is presented, perceived, and whether it can be usefully tagged.

Two dimensions matter. First, the **medium**—text, audio, video—shapes the technical surface where tagging can occur. Adapters are medium-specific: a browser DOM, a podcast transcript, a video caption stream. This is the entry point for implementation.

But equally important is the **modality**: the interaction pattern through which language unfolds. A Reddit thread, a podcast monologue, and a live Twitch stream are all built on language, but they differ in tone, timing, pace, and user expectation. These elements govern whether the reasoning structure is present, visible, and taggable. In short, **medium shapes delivery; modality shapes fit**.

![Taxonomy of reasoning contexts by medium and modality.](/fallacytag/assets/images/5%20-%20Mediums%20and%20Modalities.svg)
> *Figure: Taxonomy of reasoning contexts by medium and modality*

We walk through each medium—not because it’s the dominant factor, but because each hosts a characteristic range of modalities with recurring challenges and affordances. We close with a synthesis of how these patterns inform adapter design and feedback orchestration.

This discussion also fills a gap in prior work. While most fallacy detection research emphasizes classification accuracy and model performance, relatively little attention has been paid to how reasoning feedback should be delivered across modalities. To our knowledge, no existing system addresses this challenge directly. We aim to surface it here.

We walk through each medium—not because it’s the dominant factor, but because each hosts a characteristic range of modalities with recurring challenges and affordances. We close with a synthesis of how these patterns inform adapter design and feedback orchestration.

This discussion also fills a gap in prior work. While most fallacy detection research emphasizes classification accuracy and model performance, relatively little attention has been paid to how reasoning feedback should be delivered across modalities. To our knowledge, no existing system addresses this challenge directly. We aim to surface it here.

### 5.1 Text: Where Reasoning Is Most Visible

#### 5.1.1 Adapter Implications (Technical Layer)

Text is where FallacyTag is most natural to implement. The medium exposes a well-structured surface—DOMs, Markdown documents, transcripts—onto which tags can be injected with minimal friction. Parsing is straightforward. Delivery can be inline or layered, synchronous or deferred. In many cases, existing user-facing interfaces (e.g., browsers, e-readers, collaborative editors) can be augmented via extensions or overlays, without requiring platform integration. This makes text a clear first target for adapters.

#### 5.1.2 Observed Modalities (Interaction Layer)

But “text” encompasses a wide range of modalities, shaped by platform dynamics, pacing, and user goals. Examples include:

- **Deliberative** (Reddit structured debate threads, peer feedback on learning Platforms like Khan Academy or Coursera, where learners receive logic-aware reviews)
- **Persuasive** (Substack or Medium blog posts, which mix persuasion and commentary, often with explicit argument structure)
- **Informal** (comment threads, general web reading - from essays to corporate blogs)

Despite variability in tone, many of these environments expose reasoning in ways that make constructive surfacing possible.

#### 5.1.3 Fit and Design Implications

FallacyTag works best when reasoning is visible, valued, and revisable. This includes:

- **Longform argumentation** (e.g., newsletters, essays)
- **Structured feedback and review** (e.g., peer critique systems)
- **Reflective educational contexts** (e.g., student forums or tutoring platforms)

In these cases, tagging can appear inline with minimal disruption. Users can hover, tap, or click for explanations, and respond with lightweight feedback (“thanks,” “incorrect,” etc.) These modalities support both **reader-facing workflows** (surfacing reasoning in content consumption) and **author-facing workflows** (offering logic-aware cues during drafting or revision). This dual role—supporting both readers and writers—makes text-based environments an especially compelling fit for FallacyTag.

In some structured environments—particularly in education—FallacyTag may even support **manual tagging or confirmation** by educators, reviewers, or peer authors. These hybrid human+AI workflows are not the primary design path, but they open up new roles for reasoning-aware authoring support.

By contrast, modalities like adversarial comment threads or outrage-driven forums are low-fit environments. Even well-calibrated tags risk being ignored or reinterpreted as aggression, irony, or partisanship. In such spaces, tags should be **optional, passive, or private by default**, and feedback mechanisms should account for tone volatility.

### 5.2 Audio: Designed for Flow, Not Friction

#### 5.2.1 Adapter Implications (Technical Layer)

Audio presents a more constrained surface for tagging. There is no native text layer; tags must anchor to transcripts, timestamps, or linked metadata. Adapters must handle:

- **Transcript alignment**: ensuring tags map to precise audio segments
- **Trigger design**: determining how tags are accessed—e.g., via playback-linked cues, transcript overlays, or post-hoc bundles
- **Playback integration**: embedding tags without disrupting listening flow

Some platforms (e.g., Overcast, Spotify) support enriched metadata or interactive transcripts; others do not. Delivery remains contingent on third-party APIs or browser-based augmentation.

{: .highlight }
The core UX challenge is this: FallacyTag is designed as a *nudge*—a lightweight prompt to pause and think. But most audio platforms are built around *flow*. Listeners may be jogging, driving, or multitasking. Their goal is sustained engagement, not interruption. What is supposed to happen when a tag appears? Should the listener stop? Remember the moment? Open their phone? These conditions make not just technical delivery harder, but reflection itself less viable—especially in the moment.

#### 5.2.2 Observed Modalities (Interaction Layer)

- **Audio modalities** tend to fall into three categories:
- **Scripted monologues**: podcasts, essays read aloud, and commentary
- **Conversational formats**: interviews, live chats, or recorded panels
- **Ambient streams**: background listening where attention is partial

Spoken formats carry arguments wrapped in rhythm, tone, and persona—often more performance than premise-evidence-conclusion. Listeners “feel” the arc without always registering its logical scaffolding. Unlike text, you can’t scan back to study how pieces fit. Fallacies are harder to notice in speech because the format mutes structure.

Still, scripted podcasts—especially those with educational, analytic, or editorial aims—offer an opening. Transcripts exist. Reasoning is present. User interest is aligned.

#### 5.2.3 Fit and Design Implications

FallacyTag is most viable in scripted or semi-structured audio, where reasoning is clear and transcripts are available. In these contexts, tags can be surfaced via interactive transcripts, playback-linked cues (e.g., “🧠 at 18:32”), or bundled into post-listening summaries. Each route depends on platform capabilities, but all share the constraint of limited user attention.

Real-time interaction remains difficult. Audio is often consumed while multitasking, and feedback mechanisms like taps or swipes are rarely accessible in the moment. Even simple reactions (“helpful?”) may be ignored. In most cases, tagging must either be subtle and asynchronous or deferred entirely.

In audio, the tradeoff between flow and friction becomes especially sharp. Here, the design challenge is to support reflection without disrupting flow. FallacyTag must act more like a whisper than a poke—a reminder stored for later, not a demand made now. On some platforms, transcript overlays may be sufficient. 

Elsewhere—especially in live or mobile-first audio—FallacyTag may need to shift from live nudges to post-listening review tools—a better fit for learners, researchers, or other serious listeners. 

### 5.3 Video: The Tightrope Between Pacing and Pause

#### 5.3.1 Adapter Implications (Technical Layer)

Video combines the challenges of audio with the advantages of screen-based interaction. While users are watching—not reading—many platforms provide caption streams or machine-generated transcripts, giving FallacyTag a viable text layer for analysis. Adapters can anchor tags to timestamps or transcript segments and surface them via:

- **On-screen overlay**s (e.g., floated annotations synced to playback)
- **Transcript enhancements** (e.g., scroll-sync with tagged spans)
- **Post-video summaries** (e.g., logic digests with jump links)

Compared to audio-only formats, delivery is more tractable: the user is already in front of a screen, making taps, hovers, or pauses more reasonable. Still, the interaction surface is shared with dynamic visuals and often attention-grabbing content, making subtlety essential.

#### 5.3.2 Observed Modalities (Interaction Layer)

Video modalities vary widely in tone, purpose, and pacing. Strong candidates include:

- **Educational explainers** (e.g., Veritasium, Kurzgesagt), where structured reasoning is scripted and visualized
- **Instructional platforms** (e.g., Khan Academy, edX, Skillshare), where transcripts align tightly with lesson logic
- **Live or recorded meetings** (e.g., Zoom with auto-captions), where tagging might aid review or live moderation

Narrated product demos or pitches, mainly when persuasive framing drives the narrative

These modalities range from tightly produced to semi-improvised, but many share two useful traits: visible reasoning structure and a receptive audience mindset.

### 5.3.3 Fit and Design Implications

FallacyTag is best suited for scripted or semi-scripted videos, especially when transcripts or caption streams are aligned with the argument structure. Delivery options include:

- **Timed overlays**, which surface tags as the speaker reaches key lines
- **Enhanced transcript panes**, with reasoning highlights linked to playback
- **Post-video summaries**, offering logic maps or flagged claims with timestamps

Real-time feedback remains limited; users are watching, not interacting. But light-touch affordances—e.g., dismissible overlays or hover-to-expand prompts—can enable interaction without disrupting flow. Depending on platform constraints, tags may be precomputed and anchored or generated dynamically from caption streams. 

Like audio, video demands flow—but unlike audio, it competes for attention with movement, cuts, and visual effects. The challenge is not just technical, but also cognitive: to surface logic cues in ways that feel timely yet non-intrusive, precise but light—that is, aligned with moments of cognitive slack. Audio resists interruption. Text invites it. Video sits between them, demanding careful threading of signal and subtlety.

![Friction vs. flow](/fallacytag/assets/images/5%20-%20Friction%20vs%20flow.svg)
> *Figure: Flow vs. Friction Spectrum*

### 5.4 Trade-Offs Across the Flow–Friction Spectrum

Each of these modalities presents different trade-offs, but the goal remains the same: to surface flawed logic gently. Some environments make that easier than others. Here’s how they compare:

| Modality | Fit | User Effort | Rationale |
| --- | --- | --- | --- |
| **Text** | Best | Low | Users are already in a reading context; inline tags feel natural; arguments tend to be structured  |
| **Video** | Good | Medium | Screen-focused consumption makes pause-and-read viable; many videos are tightly scripted |
| **Audio** | Weak | High | Users are engaged in flow activities; real-time logic nudges may break attentional rhythm |

That’s why our initial focus is on browser-based reading, structured peer feedback, and lightly augmented video playback. These modalities offer the best trade-off between cognitive fit and delivery feasibility. Users are already primed to engage with reasoning, and the technical surfaces support timely, low-friction interventions.

In cases where multiple representations exist (e.g., video + transcript), FallacyTag aims to provide consistent tagging across views, preserving reasoning cues even as interaction modes shift. The delivery format may influence the style or granularity of the explanation, but the underlying structure remains stable.

These starting points also offer a scalable base for broader deployment. Browser overlays and transcript-based adapters require no deep platform integration and can reach users across many sites and tools. By starting where both infrastructure and attention are available, FallacyTag can refine its methods before tackling harder environments, such as real-time speech, mobile-first platforms, or visually dense media.

### 5.5 From Logic to Delivery: Adapting the Pipeline

FallacyTag uses the same core reasoning engine across all media, but the execution path varies by medium. Input format, UI surface, feedback channel, and timing model all shift depending on whether the content is read, heard, or watched. These differences aren’t just cosmetic—they affect what’s possible and what makes sense.

The table below breaks this down. Text-based deployments allow for inline tagging with low friction and rich user feedback. Audio, by contrast, requires transcript anchoring and post hoc interaction. Video sits in the middle: it benefits from visual anchors and screen presence, but still contends with timing sensitivity and competing visual demands.

| Aspect | Text-Based Reading | Audio-Only Listening | Audio-Visual (Video) |
| --- | --- | --- | --- |
| **Input Format** | Raw or DOM-parsed text (Reddit, Medium) | Auto-generated transcript (podcast, talk) | Captions/transcript (YouTube, Zoom) |
| **Preprocessing** | Inline span segmentation, quote filters | Timestamped text extraction, speaker cues | Caption alignment, sentence stitching |
| **UI Integration** | Inline overlays, hover or click to expand | Transcript summary, timestamped tag index | Scroll-sync overlays, caption-layer tags |
| **Timing Model** | Real-time or on-load tagging | Post hoc only (non-interruptive) | Inline or scroll-synced, possibly deferred |
| **Feedback** | Direct interaction (dismiss, expand) | Optional post-listening rating or flag | Tap/click during playback or review mode |
| **UX Constraints** | Must not disrupt reading flow | Tags must avoid intrusion during listening | Must avoid screen clutter, timing friction |

The architecture diagram sketches how these medium-specific layers fit into the system as a whole:

![How FallacyTag Adapts to Text, Audio, and Video Surfaces](/fallacytag/assets/images/5%20-%20How%20FallacyTag%20Adapts%20to%20Text,%20Audio,%20and%20Video%20Surfaces.svg)
> *Figure: How FallacyTag Adapts to Text, Audio, and Video Surfaces*
>
>While the core architecture treats all media—text, audio, and video—as inputs to a shared reasoning pipeline, the implementation diverges at the delivery layer. A Reddit comment and a YouTube transcript may flow through the same core inference engine, but the way tags are rendered, timed, and interacted with varies significantly. Browser-based overlays may appear inline during reading; podcast transcript tags might index timestamped summaries post hoc; video overlays might sync with caption lines during playback. These differences don’t change the core logic, but they do shape user experience, latency expectations, and interface behavior. Delivery orchestration is thus surface-specific, even when the underlying reasoning logic stays consistent.

The divergence isn’t just architectural—it’s experiential. Each modality shapes how the user perceives the tag, when they can respond, and what kind of feedback is even possible.

To visualize how this plays out in practice, the following figure walks through representative system flows for each medium. All begin with input parsing and reasoning detection. But from there, the user experience diverges:

- Text tags appear inline, with full interaction and feedback
- Audio tags link to moments in time, with optional voice/button triggers
- Video tags float visually, balancing timing, clarity, and minimal interruption

![Tagging pipeline per modality](/fallacytag/assets/images/5 - Tagging pipeline per modality.svg).
> *Figure: How the tagging pipeline plays out differently for text, audio, and video.*
>
>Though the reasoning logic is shared, the form of nudging is not.  This is the core tension FallacyTag is built to navigate: logic wants to be surfaced, but attention doesn’t want to be broken. The tradeoff—flow versus friction—varies by medium. What works for a blog post may misfire in a podcast. FallacyTag’s logic layer stays constant, but its delivery adapts—always tuned to where users are and how they engage.

---

FallacyTag’s delivery must adapt to each surface, but behind that flexibility lies a common core. Whether analyzing a Reddit post, a podcast transcript, or a captioned video, the same system interprets the text, identifies potential reasoning flaws, and returns structured tags. The variability lies in how those tags are surfaced and received. In the next section, we pull back the curtain on how this shared pipeline works, step by step.

---

[Previous](/fallacytag/pages/04-introducing-fallacytag){: .btn } [Next](/fallacytag/pages/06-how-it-works/){: .btn }

---
