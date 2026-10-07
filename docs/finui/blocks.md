# Blocks

The gallery's **blocks** are compositions of the components, a card's worth of an app each: eleven of them, one of each
kind, each an entry of its own in its list. Each is one block with switches, not a row of fixed variants:

- **Calendar**: one day, several or a range, and beside it what comes out, times, the week's plans, the pick in words.
- **Chart**: bars, a line, an area, a donut, rings, a radar, a heatmap, a bar list or storage, with a legend, numbers over it, a sentence, an export.
- **Form**: a server address, a user name, names, an e-mail, a password, a two-step code, a service, people to invite, a file, notifications, a new key, and the button they call for.
- **List**: one set of rows, numbered or not, with pictures, a line under, values, progress, states, unread marks, roles, a timeline or filters.
- **State**: loading, empty, an error, done or a question, as it is, as a banner or in a dialog, with a way on and a way to dismiss it.
- **Look**: a preset part by part: colours, type, buttons, badges, focus and icons, keys, facts.
- **Page**: a table, settings or not found, with the app's menu, a page header and numbers over it.
- **Watching**: now playing, a title's page, its seasons and episodes, and what plays next.
- **Dashboard**: numbers with sparklines over a week of watch time, a year of plays, the top titles, when people watch, activity and downloads.
- **Account**: a setup wizard, settings with a slider, a stepper and choices, a notifications centre, a profile and a two-step code.
- **Library**: filters, a grid of titles, search results, a person's page and an import.

They are the cards FinUI create draws a preset on, each in several of its ways (`blocks/blocks.js`, laid out by
`blocks/blocks.css`). Each block's page shows it and its code in the same place, the code with only what is switched on:
a module that imports FinUI from `./finui/` (where the installer puts it) and exports one function that builds the block,
the CSS of the classes it draws, and its HTML. `blocks/source.js` works the code out of `blocks.js` and `blocks.css`, and
the QA stage pastes it into a page with nothing but FinUI and runs it.
