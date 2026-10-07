# Icons that move

Every icon comes twice: still, as `icon()` draws it, and moving, as `animatedIcon()` draws it. A moving icon is drawn
in stroke by stroke, does what it is about (refresh turns, download's arrow drops into its tray, a heart beats, a
slider's knobs slide, the trash lifts its lid) and is drawn out again, in a loop; or its act once each time it is
pointed at (`play: 'hover'`), or once. At rest it is the still icon, and it stays still with reduced motion and with a
preset's Motion: Off. What each icon does is one line of `components/animated-icon/motions.js`.

`animateWithin(root)` does it for a whole app: every icon inside a link, a button or a tab moves once on hover, the ones
there now and the ones drawn later, while an icon among words stays still. `setBusy(icon, true)` keeps a refresh turning
while its answer is on the way, and `setBusy(icon, false)` lets it finish the turn it is in.

```js
import { animateWithin, setBusy } from './finui/components/animated-icon/animated-icon.js';
animateWithin(document.body);
```

Every icon is a file of its own too, for where there is no FinUI: `icons/<name>.svg` as it stands still, and
`icons/animated/<name>.svg` moving, its motion and only the rules that motion needs inside it, still with reduced motion.
Both draw in `currentColor`: the text's colour inline, black in an `<img>`. The site serves them; `npm run icons` writes
them into `icons/` here (`node tools/build-icons.mjs <folder>` anywhere else), and the gallery saves any one of them.

```html
<img src="icons/animated/headsetOff.svg" width="24" height="24" alt="Deafened">
```
