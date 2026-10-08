# FinUI

The components [finstats](https://github.com/finstats/finstats) is built from, sixty-eight of them: buttons, fields,
checkboxes, sliders, date pickers and code inputs; cards, tables that sort by meaning, tabs, steps and timelines; dialogs
that stack, drawers, popovers, menus and toasts; and charts (bars, lines, donuts, heatmaps) that read only tokens.
Vanilla ES modules and plain CSS, no build step and no dependencies, light and dark from one set of tokens.

**[See FinUI, and try its looks →](https://finui.finstats.no/)** · **[Make it yours in FinUI create →](https://finui.finstats.no/create/)** · **[Make it move with FinMotion →](https://finmotion.finstats.no/)**

## What it is

FinUI is a registry in the spirit of shadcn/ui: the components are source you copy and own, not a package you install.

- **No build step, no dependencies, no CDN.** Each component is an ES module built with `h()` (a small element builder in
  `core.js`) and a CSS file of its own.
- **Every colour is a token**, and every token is `light-dark(light, dark)` in `tokens.css`: one declaration, both themes.
  No other file names a colour.
- **One namespace.** Every class is `fui-` and its component's name: `fui-button`, `fui-button--primary`,
  `fui-card__title`. A component styles its own classes, and those of the components it is built with only as context.
- **Documented where it lives.** Each module exports `meta`: what it is for and not for, its props, variants and states,
  its accessibility, and the examples the gallery draws. There is no second copy of the docs.
- **Data-free.** A component never fetches, never reads an app's state and never knows a route: it is given what it
  shows. A poster is given an address, not an id.
- **The same contract everywhere**: operable from the keyboard with a visible focus ring, the right roles and ARIA,
  quiet under `prefers-reduced-motion`, readable in both themes and at 360 px, and data reaches the DOM only as text.

## Trying a component

The site opens on a page of an app built from FinUI, which any of FinUI create's whole looks restyles in place, beside the
one line that installs the look picked. Every component and block then has a page of its own laid out as a workbench: the
list of its kind, its example as large as the screen allows and its switches beside it, all on one screen. Switches turn
its features on and a choice picks between its variants; the example is drawn in the page's theme, or in both themes side
by side, or at 360 px, without losing what the switches made of it. The calendar, for one: a day, several days or a range,
marked days, limits, a week that starts on Sunday. Its buttons and keys work as they will in an app, because a
component that only looks right is no component.

## Where it is made

FinUI's components are developed inside finstats (`web/assets/finui`), where every one of them is used and tested, and
copied here as they change; the gallery and FinUI create live here only. Issues and changes are welcome in either place.

## Licence

FinUI is free software under the [GNU General Public License v3.0](https://github.com/finstats/finui/blob/main/LICENSE) only, like finstats. The bundled fonts are
under the SIL Open Font License 1.1; their licences are in `fonts/`.
