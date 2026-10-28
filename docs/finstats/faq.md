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

## A command says FinStats does not run as root.
`docker exec finstats finstats backup` runs as root, past the step that drops to an ordinary user, and whatever
FinStats wrote would then belong to root, out of reach of the FinStats that is running. So it refuses, and names the
user to run it as. Pass that user, `PUID` (1000 unless you changed it):

```sh
docker exec -u 1000 finstats finstats backup
```

## Somebody cannot sign in.
FinStats checks a sign-in against Jellyfin, but first against what it last read of Jellyfin's users (every 15 minutes,
or at once with **Run** on *Sync users* under **Settings → Tasks**). A name Jellyfin does not have, has disabled or
removed, or that may not use FinStats (Settings → Access) is told "Wrong username or password" without Jellyfin being
asked, so nobody can lock a Jellyfin account through FinStats. That is also why somebody you have only just added to
Jellyfin can sign in after the next users read, not before.

Somebody whose Jellyfin account has *Allow remote connections to this server* switched off may sign in to FinStats only
from your home network, as they may use Jellyfin only from there.

## Can I put it behind a reverse proxy?
Yes. Forward to port 8080 and tell FinStats which address the proxy has, so that it believes the proxy's
`X-Forwarded-For` (who is really asking, for the sign-in limit and the audit log) and nobody else's:

```sh
-e FINSTATS_TRUST_PROXY=172.18.0.2        # the proxy's address; a range works too: 172.18.0.0/16
```

Several proxies, one after the other, are a list separated by commas or spaces. `FINSTATS_TRUST_PROXY=1` still works and
believes any peer on the same machine or a private network, one hop; the log says so at start-up. Left unset, nobody's
`X-Forwarded-For` is believed: every sign-in then seems to come from the proxy, and ten wrong passwords lock everyone
out for five minutes. FinStats says so once in its log when a proxy on your network sends the header and it is not
set. Session cookies are marked secure whenever the page signing in is on https.

**Give FinStats a hostname of its own, on https.** A browser sends a site's cookies to every port of the same host
over plain http, so with FinStats at `http://192.168.1.10:8080` any other web service on that machine, on any port,
receives the FinStats session of whoever visits it. On https FinStats' session is a `__Host-` cookie, which belongs
to that one hostname and which a site on a neighbouring name cannot replace. Serve it as `https://finstats.example.com`
and run nothing you do not trust on the same hostname.

Pages keep themselves current over a WebSocket (`/api/live`), so let the proxy pass upgrades on. Caddy and Traefik do
it by themselves; nginx needs three lines in the `location`:

```nginx
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
```

Without them FinStats still works: its pages ask every few seconds instead, as they did before 2.3.

## How do I start over?
Stop the container, delete the `data` folder, start it again. To clean up fully, also remove the
`finstats` API key in Jellyfin (Dashboard → API Keys).

## Is it safe to expose to the internet?
It is built for it (Jellyfin-backed sign-in, rate limiting, hashed sessions, a strict content
security policy), but like anything self-hosted, a reverse proxy with HTTPS, on a hostname of FinStats' own, is
strongly recommended. [Security details →](security.md)

