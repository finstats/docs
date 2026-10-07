# Make it yours

[FinUI create](https://finstats.github.io/finui/create/) shows a wall of FinUI (dashboards, forms, tables, settings,
dialogs, charts) and lets you change it as you watch, in light, dark or both. Start from one of eleven styles (whole looks,
from Washi, finstats' own, to Noir, Gazette or Arcade), then change any of twenty-two choices: base colour, accent, chart
colours, contrast; radius, density, borders, cards, buttons, fields, tables; highlight, motion, icon stroke and ends, menu,
page, focus ring; the text, heading and mono fonts and how headings are set. Lock what you like and shuffle the rest. What
you made is a short code, and one command takes it home:

```sh
curl -fsSL https://finstats.github.io/finui/install.sh | sh -s -- 0101         # FinUI into ./finui, your tokens after tokens.css' own
curl -fsSL https://finstats.github.io/finui/install.sh | sh -s -- 0101 --css   # or one finui.css, with its fonts beside it
```

Nothing but `curl` and `sh`: no package manager, no Node. The installer writes only into an empty folder (`--dir` names
another), and fetches everything before it writes anything. Without a shell, the page downloads the stylesheet itself.
The site, installer included, is built by the pages workflow (`tools/build-site.mjs`) on every push to `main`: FinUI's files, `finui.css`, and one small file of tokens per choice (`p/<axis>/<option>.css`),
which the installer fetches in axis order, so a later choice sets a token last, as the page does. A preset is nothing but tokens: a `:root` block
after `tokens.css`, which you can also copy from the page and paste into a FinUI you already have. The choices live in
`create/presets.json` and are worked into tokens by `create/preset.js`, the one module both the page and the site's
builder use; a style is a name and its picks there. Tests hold what every choice must: every palette's neighbours stay
apart by day and by night, every base's text reads on its grounds, every accent reads as a link and on its buttons, every
button and menu style keeps its words readable, and every token a choice sets is one something reads.
