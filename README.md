# FallacyTag

FallacyTag is a lightweight reasoning-feedback layer for flawed logic in the wild.  
It explores how flawed arguments might be surfaced and annotated—much like typos—to improve public reasoning without undermining dialogue.

## 📄 Read the Paper (Work in Progress)

Sections are being released incrementally at:  
👉 **[https://coherentdrift.github.io/fallacytag/](https://coherentdrift.github.io/fallacytag/)**

## 📁 Repository Structure

<pre lang="markdown"><code>
fallacytag/
├── _pages/            # Markdown source pages for the paper
├── assets/images/     # Diagrams, figures, and site images
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
3.	Serve the site:
   ```bash
   bundle exec jekyll serve
   ```
4.	Visit http://localhost:4000/fallacytag/ in your browser.

## ✍️ Contributing

At this stage, the repository is not yet open for contributions, but feedback is welcome.
If you’re interested in participating in future development or research around FallacyTag, feel free to open an issue or get in touch.

## 📬 Subscribe for Updates

Follow the project on Substack for release notes and reflections:
👉 https://coherentdrift.substack.com

## 📝 License

MIT License. See [LICENSE](https://opensource.org/licenses/MIT) for details.
