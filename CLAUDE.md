# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The documentation of finstats, FinUI and FinMotion (`github.com/finstats/docs`), built with MkDocs and Material for
MkDocs and published by `.github/workflows/pages.yml` at <https://finstats.no/>. **All documentation of the
fin\* projects is written here**, never in the code's repositories (the owner's decision, 2026-10-07). Those keep only
what GitHub or the build needs from them: each README (a short landing page that links here), finstats'
`CONTRIBUTING.md` and `SECURITY.md` (short pointers to the pages here, because GitHub reads them from the repository),
`CODE_OF_CONDUCT.md`, the `.github/` forms, and `CHANGELOG.md`, which finstats compiles in as its Patch notes and so stays
there. Agent guidance (each `CLAUDE.md`) is not documentation and stays with its code.

Four repositories, side by side under `~/projects`: `finstats`, `finui`, `finmotion` and this one, `docs`.

## Commands

```sh
mkdocs serve                    # http://127.0.0.1:8000, reloads on save
mkdocs build --strict           # what CI runs; a broken link, a missing anchor or a page outside the nav fails it
pip install -r requirements.txt # the pinned versions CI uses (MkDocs 2.0 drops the plugins Material needs)
```

## Layout

```
mkdocs.yml          the site, its theme and the nav; every page is listed in nav
docs/index.md       the front page
docs/finstats/      finstats: install, features, privacy, imports/ (index and one page per tracker), settings, updating, faq, tour,
                    security, reporting-security, api, contributing
docs/finui/         FinUI: index, create, using, icons, blocks
docs/finmotion/     FinMotion: index, install, springs, layout
docs/assets/        screenshots/, logo.svg, fonts/ (Inter and JetBrains Mono, OFL, licences beside them), extra.css
```

## The rules

- **A page changes with what it describes.** A change to finstats, FinUI or FinMotion that a page here describes comes
  with a commit here in the same sitting, never later.
- **`main` is what is released**, because a push to it publishes. Pages for a finstats version not yet released wait on a
  branch named like finstats' own (`dev-2.3.0`) and are merged with the release; FinUI and FinMotion publish from their
  `main` on every push, so their pages go to `main` here when their change does.
- **`docs/finstats/api.md` is the HTTP contract the finstats UI is written against**: an endpoint and its entry change
  together. finstats' local QA reads it from here (`../docs/docs/finstats/api.md`) and fails on a route it does not list.
- **The privacy and security promises are promises.** `finstats/privacy.md`, `finstats/security.md` and the sentences on
  outbound connections must stay true to the code; a new outbound destination in finstats appears in them in the same
  change that adds it (finstats' `outbound.rs` names the same sentences).
- **The "How finstats is built" note** on `finstats/index.md` repeats the blockquote in finstats' README: test-first,
  reviewed, `cargo test` in CI, each release run against a real server. If one of those stops being true, both change.
  It names no model version.
- **Docs point at the published image** (`ghcr.io/finstats/finstats`), never a locally built tag; finstats' QA checks
  `finstats/install.md` and `finstats/imports/jellystat.md` for it.
- **Screenshots show invented data only** (people, titles, artwork, addresses: "alice", "Big Buck Bunny",
  `192.168.1.10`, `203.0.113.0/24`). finstats' `qa/run.sh screenshots` writes them into `docs/assets/screenshots/` here
  from its demo data; look at them before committing.
- **Nothing from another host.** The theme is `font: false` and the fonts are bundled, as finstats bundles its own; the
  site may link out but loads nothing from elsewhere.
- The colours in `assets/extra.css` are FinUI's (`tokens.css`): washi paper by day, Obsidian by night.

## No em-dashes

**No em-dash is used anywhere in the fin\* repositories on GitHub** (finstats, FinUI, FinMotion, docs): not in pages,
code, comments or commit messages (the owner's decision, 2026-10-07). Where a sentence wants one, rewrite the sentence:
a full stop, a colon, a semicolon, commas, parentheses or a joining word. Another dash in its place (a hyphen, an en
dash, two hyphens) or an escape for the character is not a rewrite. The Pages workflow refuses one.

## Git conventions

The same as finstats:

- Conventional-commit subjects with a scope where one fits: `docs(finstats):`, `docs(finui):`, `docs(finmotion):`,
  `ci:`, `chore:`. The subject says what changed; the body says why.
- **No LLM attribution of any kind**: no `Co-Authored-By:` for Claude or any model, no session link, no "Generated with…"
  line, in a commit message or anywhere else, whatever a tool defaults to.
- One logical change per commit, standing on its own; commit as work lands.
- **Never push unless explicitly told to.** A push to `main` publishes the site.
- One commit identity, the repository's usual author.

## This repository is public

Pages, screenshots and commit messages use invented data only, never a value from a real server.

## Licensing

GPL-3.0-only, as finstats, FinUI and FinMotion (`LICENSE`). The fonts are OFL-1.1 with their licences beside them.
