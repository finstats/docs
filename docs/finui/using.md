# Using it

Copy the folder, or let the installer above copy it.
Load the stylesheets in `registry.json`'s order (`tokens.css`, `base.css`, then each component's CSS),
either as separate `<link>`s or as one file joined in that order (finstats serves them joined, as `/assets/finui.css`).
Then import what you need:

```js
import { h, icon } from './finui/core.js';
import { button } from './finui/components/button/button.js';
import { card } from './finui/components/card/card.js';

document.body.append(card({ title: 'Recently added', body: button({ variant: 'primary' }, icon('plus', 14), 'Add') }));
```

The theme follows the device (`color-scheme: light dark`); `data-theme="light"` or `"dark"` on `<html>` chooses one.
Fonts are Inter and JetBrains Mono, in `fonts/` beside `base.css`.

`registry.json` lists every component with its files, the tokens its CSS reads and the components it is built with.
FinUI's rule checker and tests are kept privately, not in this repository, and run before every change is published.

## With FinMotion

FinUI is still on purpose: every component is plain and complete without movement, and installed as above it stays that
way. [FinMotion](https://finstats.github.io/finmotion/) is how it moves, a project of its own put on top: toggles thrown,
tabs whose line inches across, charts that draw themselves, notices held like a hand of cards, on four springs, at the
pace FinUI's Motion choice sets, and still under reduced motion. FinUI needs no change for it: FinMotion finds each
component by FinUI's own classes and moves what FinUI draws.

Install it beside FinUI, from the same folder:

```sh
curl -fsSL https://finstats.github.io/finui/install.sh | sh        # FinUI into ./finui (add your preset's code)
curl -fsSL https://finstats.github.io/finmotion/install.sh | sh    # FinMotion into ./finmotion, beside it
```

Then load FinMotion's stylesheet after all of FinUI's, and call `motion()` once:

```html
<link rel="stylesheet" href="finmotion/finmotion.css">   <!-- after FinUI's stylesheets -->
<script type="module">
  import { motion } from './finmotion/core/finmotion.js';
  motion();
</script>
```

Every FinUI component on the page moves from then on, the ones drawn later too. Leave FinMotion out and FinUI is as it
ships: still, plain and whole. FinMotion can also be used on its own, without FinUI, since its springs and its script move
anything; [its install page](../finmotion/install.md#on-its-own) says how.
