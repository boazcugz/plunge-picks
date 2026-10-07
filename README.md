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
owner-confirmed tracking tag `plungepicks-20`. GA4 is disabled. Visitor
counts come from Cloudflare Web Analytics (cookieless, added 2026-10-07; the
beacon snippet sits before `</body>` on every page), so the site has no cookie
banner. New pages must include the same snippet.

## Search discovery

The focused entry pages are `/ice-bath-calculator` and `/cost-calculator`. Both
use `calculator.js`, expose worked examples in the HTML, and link to relevant
guides. Keep canonical links, internal URLs and `sitemap.xml` on the clean URLs
that Netlify serves; existing `.html` entry links remain supported.

`indexnow-key.txt` is the website verification file required by IndexNow and
is intentionally accessible on this site. It is not a Netlify or user-account
credential. After publishing meaningful page changes, submit the changed public
URLs once to `https://api.indexnow.org/indexnow` following the official protocol:
https://www.indexnow.org/documentation . Use host `plungewise.com` and keyLocation
`https://plungewise.com/indexnow-key.txt`. A 200/202 receipt is not proof of
indexing, ranking or traffic. This does not submit pages to Google.
