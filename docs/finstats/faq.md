# Questions

## Does it slow Jellyfin down?
No. Jellyfin tells it when something starts, over one connection that stays open, so an evening
when nobody is watching costs no requests at all. While something is actually playing it asks one
small question a second, which is what keeps pauses and skips exact, and it reads your library only
after Jellyfin has finished its own scan.

## Where is my data, and how do I back it up?
FinStats backs itself up every week into `data/backups` and keeps the newest five; download them under
**Settings → Backups**, where you can also restore one into a new install. A backup has your whole history,
settings and permissions, but never your Jellyfin API key. The database itself is the single file `data/finstats.db`.

## It says "cannot write to its data directory".
The `data` folder belongs to a different user than the one FinStats runs as. This happens when you start the
container with `--user` (or `user:` in Compose) on a folder Docker created as root. Either drop that setting, so
FinStats can fix the folder itself, or run `sudo chown -R 1000:1000 ./data`.

## Can I put it behind a reverse proxy?
Yes. Forward to port 8080 and set `FINSTATS_TRUST_PROXY=1`. Sign-in cookies are marked secure
automatically when the proxy reports HTTPS.

## How do I start over?
Stop the container, delete the `data` folder, start it again. To clean up fully, also remove the
`finstats` API key in Jellyfin (Dashboard → API Keys).

## Is it safe to expose to the internet?
It is built for it (Jellyfin-backed sign-in, rate limiting, hashed sessions, a strict content
security policy), but like anything self-hosted, a reverse proxy with HTTPS is strongly
recommended. [Security details →](security.md)

