# FinMotion

How [FinUI](../finui/index.md) moves. FinUI is the components: still, plain, complete on their own;
FinMotion is an extra you put on top: one stylesheet and one call, and every FinUI component on the page moves. Vanilla ES
modules and plain CSS, no build step and no dependencies, like FinUI.

**[See every part move, and try FinUI's Motion choice on it →](https://finmotion.finstats.no/)**

Start with [Install](install.md); the movement itself is [four springs](springs.md).

## It follows FinUI, and the person

- **FinUI's Motion choice is the pace.** A FinUI preset says Quick, Slow or Off through `--ease`; `motion()` reads it, and
  every spring's time is multiplied by it (`--fm-pace`): quicker, slower, or still.
- **Reduced motion stills everything**, above whatever a page or a script set.
- Nothing moves by itself: a part moves when something happens to its component.

## Contract

- Every colour is one of FinUI's tokens; FinMotion names none of its own.
- It styles FinUI's classes (`fui-`) and its own (`fm-`), nothing else.
- It imports nothing from outside itself, not even FinUI: it moves what is on the page.
- FinMotion's checks and tests are kept privately, not in this repository.

GPL-3.0-only, as FinUI and FinStats.
