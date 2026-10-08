# Install

FinMotion is source you copy and own, like FinUI. One command copies it into `./finmotion` (its files and
`finmotion.css`, every stylesheet joined in order) with nothing but `curl` and `sh`. It writes only into an empty folder
(`--dir` names another) and fetches everything before it writes anything.

```sh
curl -fsSL https://finmotion.finstats.no/install.sh | sh
```

## Alongside FinUI

This is what FinMotion is for. Install FinUI with its own installer (its [create page](https://finui.finstats.no/create/)
gives you one with your look in it), then FinMotion beside it, from the same folder:

```sh
curl -fsSL https://finui.finstats.no/install.sh | sh        # FinUI into ./finui
curl -fsSL https://finmotion.finstats.no/install.sh | sh    # FinMotion into ./finmotion, beside it
```

Load FinMotion's stylesheet after all of FinUI's, and call `motion()` once:

```html
<!-- FinUI's stylesheets first: tokens.css, base.css and each component's, in finui/registry.json's order (or one finui.css) -->
<link rel="stylesheet" href="finui/tokens.css">
<link rel="stylesheet" href="finui/base.css">
<!-- … -->
<link rel="stylesheet" href="finmotion/finmotion.css">
<script type="module">
  import { motion } from './finmotion/core/finmotion.js';
  motion();
</script>
```

From then on every FinUI component on the page moves (the ones there now and the ones drawn later), and `motion()`
answers a function that stops it all. FinUI needs no change for it: each part finds its component by FinUI's own classes
and moves what FinUI draws. What a person does to a component moves at once; an entrance or a flourish waits for the `fm-`
class a page adds (`fm-roll` on a stat tile, `fm-arrive` on a table, `fm-film` on a progress bar, …). The
[site](https://finmotion.finstats.no/) has a page for each, with the class it needs.

## On its own

Without FinUI there is nothing for the parts to move, so leave `motion()` out, but the springs and the script are yours on
any page: `finmotion.css` gives every element the four springs as tokens, `core/finmotion.js` moves anything on them, and
the odometer is a component of FinMotion's own.

```sh
curl -fsSL https://finmotion.finstats.no/install.sh | sh
```

```html
<link rel="stylesheet" href="finmotion/finmotion.css">
<style>
  .menu { transition: translate var(--spring-snap), opacity var(--spring-settle); }
</style>
<script type="module">
  import { play, deal, flip } from './finmotion/core/finmotion.js';
  import { odometer } from './finmotion/components/odometer/odometer.js';

  play(document.querySelector('.card'), [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 'drift');
  deal(document.querySelectorAll('li'));                        // a list dealt in, one after another
  const plays = odometer({ value: '1,284', from: '0' });         // rolls up the first time it is seen
  document.querySelector('.count').append(plays);
  plays.set('1,421');                                            // and rolls again when it changes
</script>
```

On its own the pace is FinMotion's own, 1 (there is no FinUI Motion choice to follow), and reduced motion still stills
everything.

## By hand

Clone the repository and copy `core/`, `parts/`, `components/`, `registry.json` and `LICENSE` into your project. Load
`core/springs.css` and then each CSS file `registry.json` lists, in its order, or join them into one `finmotion.css`
(`node tools/build-site.mjs <folder>` writes one into `<folder>/finmotion/`). `site/`, `tools/` and `.github/` are the
site, and not part of FinMotion.
