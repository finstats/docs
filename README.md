# finstats docs

The documentation for [finstats](https://github.com/finstats/finstats), [FinUI](https://github.com/finstats/finui) and
[FinMotion](https://github.com/finstats/finmotion), published at **[docs.finstats.no](https://docs.finstats.no/)**.

Every page is Markdown under `docs/`, built with [MkDocs](https://www.mkdocs.org) and
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/). The Pages workflow builds the site on every pull
request and publishes it on every push to `main`.

## Writing a page

```sh
pip install -r requirements.txt
mkdocs serve                  # http://127.0.0.1:8000, reloads as you save
mkdocs build --strict         # what CI runs: a broken link, a missing anchor or a page left out of the nav fails it
```

- A new page goes into `nav` in `mkdocs.yml`.
- Pictures go under `docs/assets/`. Screenshots show invented data only (people, titles, addresses), never a real
  server's.
- A page that describes behaviour changes in the same sitting as that behaviour: link the pull request here to the one
  in the code's repository.

## Layout

```
docs/index.md       the front page
docs/finstats/      finstats: getting started, settings, imports, security, the HTTP API, contributing
docs/finui/         FinUI
docs/finmotion/     FinMotion
docs/assets/        screenshots, the logo, the bundled fonts and the site's CSS
```

## Licence

GPL-3.0-only, as finstats, FinUI and FinMotion (`LICENSE`). The bundled fonts are under the SIL Open Font License 1.1;
their licences are beside them in `docs/assets/fonts/`.
