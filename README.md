# FallacyTag

FallacyTag is a lightweight reasoning-feedback layer for flawed logic in the wild.  
It explores how flawed arguments might be surfaced and annotated—much like typos—to improve public reasoning without undermining dialogue.

## 📄 Read the Paper (Work in Progress)

Sections are being released incrementally at:  
👉 **[https://coherentdrift.github.io/fallacytag/](https://coherentdrift.github.io/fallacytag/)**

## 🎬 Live Demo

You can explore a live interactive demo here:

👉 [FallacyTag Demo](https://coherentdrift.github.io/fallacytag/demo/)

This highlights informal fallacies in a sample article, with support for theming, linking, and embedding. It was generated by prompting an LLM with a structured, pedagogical prompt (also viewable in the demo).

<details>
<summary>🔗 URL Parameters</summary>

<br/>

You can control demo behavior using optional parameters:

| Parameter   | Example                             | Description                                                                 |
|-------------|-------------------------------------|-----------------------------------------------------------------------------|
| `highlight` | `?highlight=f2`                     | Scrolls to and highlights the fallacy with `data-id="f2"`                   |
| `theme`     | `?theme=academic`                   | Sets visual style. Options: `default`, `academic`, `colorful`              |
| Combined    | `?highlight=f2&theme=academic`      | Combines targeting with theming                                             |

Each fallacy tag in the HTML must have a unique `data-id` attribute (e.g., `f1`, `f2`, etc.).

</details>

<details>
<summary>🧩 Embedding the Demo (Substack, Medium, etc.)</summary>

<br/>

To embed the demo into any iframe-compatible platform:

```html
<iframe
  src="https://coherentdrift.github.io/fallacytag/demo/?embed=true"
  width="100%"
  height="600"
  style="border: none;"
  loading="lazy"
></iframe>
```

You can include parameters like `highlight` and `theme`:

```html
<iframe
  src="https://coherentdrift.github.io/fallacytag/demo/?highlight=f2&theme=academic&embed=true"
  width="100%"
  height="600"
  style="border: none;"
></iframe>
```

- `?embed=true` can be used to suppress explanatory context.
- Adjust `height` based on your layout.

</details>



## 📁 Repository Structure

<pre lang="markdown"><code>
fallacytag/
├── _pages/            # Markdown source pages for the paper
├── assets/images/     # Diagrams, figures, and site images
├── demo/              # Small online demo
├── _includes/         # Shared components (e.g., navigation links)
├── .github/workflows/ # GitHub Actions CI/CD config
├── _config.yml        # Site configuration (Just the Docs theme)
└── index.md           # Landing page for GitHub Pages
</code></pre>

## 🛠 Local Development

To preview the site locally using [Jekyll](https://jekyllrb.com/):

1. Install Ruby (e.g. via Homebrew or rbenv)
2. Install bundler and dependencies:

   ```bash
   gem install bundler
   bundle install
   ```

3. Serve the site:

   ```bash
   bundle exec jekyll serve
   ```

4. Visit <http://localhost:4000/fallacytag/> in your browser.

## ✍️ Contributing

At this stage, the repository is not yet open for contributions, but feedback is welcome.
If you’re interested in participating in future development or research around FallacyTag, feel free to open an issue or get in touch.

## 📬 Subscribe for Updates

Follow the project on Substack for release notes and reflections:
👉 <https://coherentdrift.substack.com>

## 📝 License

MIT License. See [LICENSE](https://opensource.org/licenses/MIT) for details.
