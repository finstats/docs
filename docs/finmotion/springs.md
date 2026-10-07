# Four springs

Everything moves on one of four springs, each a feeling:

| spring | for |
|---|---|
| **settle** | the default: arrives quickly and rests without a wobble you could name |
| **snap** | what the hand does: toggles, presses, a knob meeting its end |
| **drift** | what lands: a card dealt, a stamp, a bookmark falling into place |
| **glide** | the large and the slow: sheets, pages, a morph across the screen |

Each is physics (a stiffness and a damping, `core/springs.js`) simulated once and compiled to what CSS understands: a
`linear()` curve and the time it takes to rest. `core/springs.css` keeps them as tokens (a test holds the two together), so a
transition, a keyframe and a script move alike:

```css
.thing { transition: transform var(--spring-snap); }
```
```js
import { play } from './finmotion/core/finmotion.js';
play(el, [{ opacity: 0 }, { opacity: 1 }], 'drift');
```
