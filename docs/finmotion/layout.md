# Where things are

```
core/       the springs (springs.js, springs.css), moving from script (motion.js) and motion() (finmotion.js)
parts/      one folder per FinUI component FinMotion moves; index.js lists them
components/ FinMotion's own (the odometer)
site/       the site, which is not part of FinMotion: it is built, never copied into a page
tools/      build-site.mjs, which builds it, and install.sh, the installer it serves
```

## The site

[The site](https://finmotion.finstats.no/) is made of FinUI, as FinUI's own is, and wears FinMotion as any page
does: a page for each part, with the component to press, sort, drag or scroll; the four springs, run and drawn; FinUI's
Motion choice to change the pace; and a switch that takes FinMotion off, so FinUI is seen as it ships. The pages workflow
builds it on every push to `main` with a FinUI checkout beside FinMotion; to see it here, with FinUI in `../finui`:

```sh
node tools/build-site.mjs /tmp/finmotion-site && python3 -m http.server -d /tmp/finmotion-site 8767
```
