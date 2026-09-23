# PlungeWise

Source for [plungewise.com](https://plungewise.com), hosted by the existing
**plunge-picks** project in Netlify.

This is a static HTML, CSS, and JavaScript site. The files at the repository root
are the deployable source; there is no compilation step or dependency install.

## Main files

| File | Purpose |
| --- | --- |
| `index.html` | Homepage and calculator interface |
| `style.css` | Homepage styling and responsive layout |
| `app.js` | Interactive controls and product recommendations |
| `calculator.js` | Calculator formulas |
| `products.js` | Product data and outbound links |
| `assets/` | Artwork, photos, and brand icons |
| `analytics-config.js` | Analytics configuration |
| `_headers`, `_redirects` | Netlify response headers and redirects |
| `netlify.toml` | Static publishing configuration |

The other HTML files are the guides, comparison pages, and policy pages.

## Preview locally

From the repository directory, run:

```sh
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

## Publishing

The intended production flow is:

1. Edit the source files and check the site locally.
2. Commit and push the changes to `main` in `boazcugz/plunge-picks`.
3. The connected Netlify project publishes the repository root to
   [plungewise.com](https://plungewise.com).

In Netlify, the production branch must be `main`, automatic builds must be
enabled, and the connected repository must be `boazcugz/plunge-picks`.
`netlify.toml` sets the publish directory to `.` and leaves the build command
empty. Check the Netlify deploy log for the matching Git commit before treating
a change as live.

To recover an earlier version, use a Git revert and push it, or restore a prior
Netlify deployment. Do not overwrite the Git history.

## ChatGPT Sites working copy

The September 23, 2026 synchronization copies the published static files from
the `plungewise-cool-math` Sites project's `dist/` folder into this repository's
root, including the calculator shopping buttons and ice-cube favicon.

Netlify deploys from this GitHub repository. Future changes made only in the
separate Sites project must also be copied and committed here; those two
repositories do not synchronize automatically. Keep `README.md`,
`netlify.toml`, and `.gitignore` when synchronizing the static files.

Do not commit passwords, API keys, or account credentials. Amazon links use the
owner-confirmed tracking tag `plungepicks-20`. Analytics is currently disabled;
the site has no cookie banner.
