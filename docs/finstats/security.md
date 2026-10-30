# Security model

**Signing in.** FinStats has no accounts of its own. A sign-in is checked against your Jellyfin
server every time, and the Jellyfin session that check creates is ended immediately. Passwords are
never stored or logged. FinStats then issues its own session: a random 256-bit token, stored only
as a hash, sent as an `HttpOnly; SameSite=Lax` cookie. When the page signing in is on https the cookie is also `Secure`
and is named `__Host-finstats_session`: such a cookie belongs to that one hostname, and a site on a neighbouring name
cannot set one in its place. A session begun on https is never accepted under the plain name, and signing out ends every
session the browser sent. Once the public address in Settings is https (or a proxy `FINSTATS_TRUST_PROXY` names says
`X-Forwarded-Proto: https`), the plain name is not accepted at all and every new session is an https one, however the
sign-in arrived; set the public address, since many proxies send no `X-Forwarded-Proto` unless told to. On plain http a browser sends the cookie to every port of the same host, so another web
service on the machine FinStats runs on would receive it: give FinStats a hostname of its own on https.

A session follows the person as Jellyfin has them now, not as they were when they signed in: once
FinStats has read Jellyfin's users (every 15 minutes, or at once from Settings), an administrator
Jellyfin demoted is no longer one here, and somebody it disabled or deleted is signed out. A users read that does not
say whether somebody is enabled keeps them out. One person keeps at most 30 sessions; the oldest is signed out at the
next sign-in.

Only a name that may use FinStats is put to Jellyfin. Once the users have been read, a name that is unknown, disabled,
removed or not allowed to sign in here is answered as a wrong password without Jellyfin being asked, no sooner than
Jellyfin would have answered: such names cannot lock a Jellyfin account through FinStats, and Jellyfin's log never shows
FinStats trying them. Somebody Jellyfin keeps to the home network (*Allow remote connections to this server* off) signs
in to FinStats only from the home network too, because Jellyfin itself sees only FinStats' address, and their session
and keys work only from there as well. Home is a private network or the household's looked-up public address; an
address typed in as home counts for plays, not for letting such a person in, and behind a proxy that
`FINSTATS_TRUST_PROXY` does not name they cannot be judged at all and are kept out. Attempts are rate
limited to 10 per 5 minutes per address (an IPv6 /64 counts as one address) and 50 per IPv6 /48, and after 60 failures
in a minute on the whole server nothing more is put to Jellyfin until the minute is out. Only attempts put to Jellyfin
count there, those still waiting on its answer included; a name FinStats turns down itself costs Jellyfin nothing and
does not count. A sign-in that works does not
forgive the guesses before it. Behind a reverse proxy, the address is the one the proxy saw, and only from the proxies
`FINSTATS_TRUST_PROXY` names. The only other cookie FinStats sets is `finstats_lang`, the language the page reads in (`nb-NO` and the like),
so that a picture the browser fetches by itself, such as a Recap card, is drawn in it; it says nothing about who you are.

**API keys.** Anyone signed in may make keys for themselves under Settings → API keys, for a script,
a dashboard or a phone's calendar. A key is a second credential for the same person and nothing
more: it is resolved at the one place a session is, reads that person's name, administrator flag and
permissions live on every request, and so can never open more than its maker could at that moment:
lose the right to sign in and every key you hold stops with it. Keys are shown once and stored
hashed; they can be given an expiry, are revoked with one click (an administrator can revoke
anyone's), and a request made with a key can neither make nor revoke keys, so a leaked key has no
successors. Nor can a key do anything that would outlast it: grant permissions, change who may sign in or what is
public, publish a profile, restore a backup, add, change or test a Sonarr, Radarr or Seerr connection, or make or change a
notification destination. Those need a signed-in browser. A key travels in the `Authorization` header, with one
exception, next.

**Public profiles (the one read without an account).** Everything else FinStats answers needs a
session or a key. The exception is `/u/<link>` and the API behind it, and it is closed until a Jellyfin
administrator switches public profiles on (Settings → Public profile) and a person then publishes theirs.
A published page is built by its own code, which starts from nothing and adds only the sections its owner
switched on (never from the signed-in statistics with parts taken away), and it can never carry a device,
a client or app, a play method, an IP address, a place, a file path, another person, the Jellyfin login
name or when somebody was last seen. Every figure on it counts only plays that ended before the last local midnight at
least a day ago, so the page changes once a day and watching it tells a stranger nothing about who is at home now, nor
when an evening's play ended. Posters are served only for the titles the page shows, and only for titles in the
library. Its cards are drawn in American English whoever asks, so that nobody can make the owner's cards be drawn
again and again by asking in another language. The link is 22 random characters; resetting it, unpublishing, an administrator
taking it down, the owner losing the right to sign in and the server switch each close it, and all of them
answer the same "not found" as a link that never existed. Publishing needs a session (a key cannot make
anything public), and every publish, change, reset and take-down is in the audit log. Pages ask search
engines not to index them; a chat app that already fetched a card may keep it for up to an hour.

**Who sees what.** Jellyfin administrators see everything. Other users can only sign in when you
allow it, for everyone or person by person, and then start with their own statistics only: no
other people's activity, no IP addresses, no device ids, no file paths, no server log, no settings.
An administrator can grant more under Settings → Access:

| Permission | Opens up |
|---|---|
| Sign in | Using FinStats at all, when sign-in is not open to everyone. |
| See everyone's activity | Other people's statistics and history, the Users page, every live stream, the recap's rank among everybody, the minute of the server's busiest moments. |
| See network details | IP addresses, device ids, local versus remote. |
| See the server | The Server page, the server log, failed sign-ins, file paths, Library health and Capacity. Somebody else's lines in the log and failed sign-ins also take *see everyone's activity*, and an address *see network details*. |
| See what is downloading | The download queue with speeds, torrent names and which client, and which connected service failed and how (never its address). Who asked for each download also takes *see everyone's activity*. Without it, people still see how far their own request has got. |
| Be sent notifications | Destinations of their own, sent only what they may already see (more under Notifications, below). |
| Manage FinStats | Settings, tasks, deleting plays: their own, and anybody's with *see everyone's activity* too. Importing history and placing titles under Unlinked media also take *see everyone's activity*, since they write and show other people's plays. |

**What a person sees of the library follows Jellyfin.** Each person sees the libraries Jellyfin opens to them, and inside
those only the titles Jellyfin lists for them under their parental rating limit, blocked or allowed tags and unrated items:
library pages, titles, search, cast and crew, pictures, Recently added, the watchlist, Coming up and the calendar feed. A
title somebody may not see answers as one that does not exist. FinStats does not judge ratings or tags itself: for
somebody Jellyfin restricts that way it asks Jellyfin which titles it lists for them (ids only, after a library read and
only when their limits changed), and keeps the list. Jellyfin administrators see everything, and somebody whose limits
FinStats has not yet read sees no library at all. The history is not narrowed: one's own plays stay one's own, and
*see everyone's activity* still shows everybody's. Library health and Capacity are about files, and stay whole for *see
the server*.

Grants for everyone and grants for one person add up; there are no "deny" rules to reason about.
All of it is enforced by the server on every request, not by hiding things in the interface, and
is read fresh each time, so taking a permission away works immediately, including locking
someone out. Only a Jellyfin administrator can change permissions: someone who may *manage*
FinStats still cannot open sign-in to everyone, change the defaults or grant anything, so nobody
can promote themselves. Nor can they change what would let them hide something from an administrator: how many
backups are kept and how often, the window in which a restart counts as the same play, or when the users, the activity
log and the backups are read; changing the home addresses or the travel rules takes what reading the alerts takes. They
start a job by hand at most once a minute. The year recap is personal: you get your own. A Jellyfin administrator can open another
person's, and the whole server's year, which ranks and names nobody; no permission grants either to anyone
else. The year's cards (2.0) are drawn from a copy of the year that has no field for another person, a rank
or an app, so a card that leaves FinStats (downloaded, or shown on a published profile) can never name the
people somebody watched with; in the app a card does not even carry its owner's login name.

**Talking to Jellyfin.** During setup FinStats creates its own API key, named `finstats`, which
you can revoke at any time under Dashboard → API Keys. It only reads: it never modifies your
server and never starts a library scan. Besides the library, the users, the sessions and the activity log, it asks one
thing about particular people: for somebody whose Jellyfin account limits what they see by parental rating, tags or
unrated items, it reads `/Items?UserId=…` to learn which titles Jellyfin lists for them (ids only), after a library read
and only when those limits have changed. The key is stored in `data/finstats.db`, so protect the
data folder like you would protect Jellyfin's own.

**Setup window.** Until setup is completed, FinStats writes a one-time code to its log each time it starts, and the
wizard asks for it before it tests an address or sets anything up. Whoever reaches the port first therefore cannot point
FinStats at a Jellyfin of their own, nor use the connection test to look around your network; finishing still requires a
Jellyfin administrator's credentials. Both steps count against the sign-in limit.

**The web interface** loads nothing from third parties: fonts and scripts are bundled, posters are
proxied from your own Jellyfin (only for titles FinStats has), and a strict Content-Security-Policy is sent with every
response, with `Cross-Origin-Opener-Policy: same-origin` (a page that opened FinStats cannot reach into its tab later)
and a `Permissions-Policy`. API answers carry `Cross-Origin-Resource-Policy: same-origin` and are not cached
unless they say otherwise. After signing in, FinStats follows a link only to its own pages.
Requests that change anything are refused when their `Origin` does not match; where FinStats knows the scheme it is
reached by (its public address, or a trusted proxy's `X-Forwarded-Proto`), the scheme must match too. A connection must
send its request's head within 15 seconds, and after 15 seconds its body must keep up at least 1 KB a second; an
answer the client does not read for 30 seconds is given up. At most 512 connections are served at once, and at most 64
from one address (a trusted proxy's apart). A request without an
`Origin` carries either a cookie a browser attaches only to a navigation, or an API key no browser
adds on its own.

**The calendar feed** (`/api/calendar.ics`) is the one address FinStats accepts a credential in:
a subscribed calendar can send no header. So the feed reads `?key=`, never the cookie (a link can
not open it in a browser that happens to be signed in), and only a key with the `calendar` scope is taken from the
address; it opens the feed and refuses everything else. Any other key goes in the header. The feed itself names nobody: the question
it asks the database carries no user name or count. Treat the address like the key it holds; revoke
the key and the address is dead.

**The container** runs FinStats as an unprivileged user (1000:1000, or `PUID`:`PGID`). It starts as root for one
step only: making the data directory belong to that user, because Docker creates a missing bind-mount folder as root.
That step changes the folder itself and FinStats' own entries in it, follows no link and leaves alone anything else you
keep there. It then drops privileges with `su-exec` and cannot get them back; FinStats itself never runs as root, and
refuses to when the data folder belongs to another user (`docker exec -u 1000 finstats finstats …` runs a command as
that user). Start the container with `--user` and even that step is skipped. The data folder is closed to every other
user of the machine (mode 0700) and everything FinStats writes in it is readable by its own user alone (0600).

**Backups** (`data/backups`, and whatever you download from **Settings → Backups**) hold the full viewing history
with IP addresses, the permissions, the settings and the audit log. They never contain the Jellyfin address or API
key, nor any sign-in session or API key, so a leaked backup exposes history but grants no access. Only Jellyfin administrators can list,
download, delete or restore them, a restore only from a signed-in browser, and a backup's file name is checked against
the exact pattern FinStats generates before it touches the disk. A restore merges the history and leaves the settings
alone unless asked to bring them back too; then it validates them the same way the settings page does, and never opens
FinStats wider than it is: who may sign in, everyone's permissions and public profiles become what both this install
and the backup allow, nobody's grants are widened, and the public addresses stay this install's. A restored play counts
as imported, whatever the file says it is.

**The audit log** (Server → Audit, Jellyfin administrators only) is FinStats' record of itself: every sign-in, and the
failed attempts from each address once in each window of the sign-in limit, with the address they came from, every setting or permission changed and what it changed to, every
key made, first used or revoked, every connection or destination added, changed or removed (its kind and name,
never its address or secret), every backup made, downloaded, deleted or restored, every import and its result,
every play deleted and every alert resolved, with who did it, from where, through which key if any, and whether it
worked. Reads leave no trace. A row is kept a year, is written even when the action failed, and its absence can
never stop an action. It is part of backups.

**No telemetry, and two outside requests: one you can switch off, one that is off until you switch it on.** FinStats talks to your Jellyfin server and, by
default, to a public "what is my IP" service (`checkip.amazonaws.com`, falling back to Cloudflare's `cdn-cgi/trace`, by name and by `1.1.1.1`,
then `api.ipify.org` and `icanhazip.com`; several because ad-blocking DNS often blocks such services) **once**, the first time it needs to
know, and after that only when you press *Look up now*. It needs the answer to tell plays from your own household's public address apart
from remote ones. The request is a bare `GET` with `User-Agent: finstats` and `Accept: text/plain`: no version, no
identifiers, nothing about your server or users. What the service necessarily learns is that *something* at your
address asked. Turn off **Settings → Home network → Recognise my own public address** and FinStats makes no
connections other than to Jellyfin; `FINSTATS_PUBLIC_IP_URL` points the lookup at a service of your own instead.

The second is the geolocation database behind the **Security** page. Looking an address up never leaves the machine: FinStats
reads a city database file (`.mmdb`) in its data folder. Getting that file is the only part that can touch the network, and it
is off by default. With a trigger on the **Geolocation database** task (Settings → Tasks), or the *Download* button, FinStats
fetches DB-IP's free "IP to City Lite" file from `download.db-ip.com`, on each trigger only when a newer month is out: a plain `GET` of a public file with
`User-Agent: finstats`, carrying no address of yours, no version and no identifiers. What DB-IP necessarily learns is that
something at your address downloaded its public file. Leave it off and put a file into `<data>/geoip/` yourself (DB-IP's, MaxMind's
GeoLite2-City, or any other in that format; `FINSTATS_GEOIP_DB` names one elsewhere) and FinStats asks nobody. (Before 2.0.4 this
was the switch *Keep the database up to date*; an install that had it on keeps a daily trigger.) The map is drawn
from outlines bundled with FinStats; no map tiles or map service are involved, so no coordinate ever leaves the browser.

**Notifications: the one thing FinStats sends rather than reads.** Under **Settings → Notifications** you can give FinStats somewhere to
say what it finds: a Discord or Slack channel, a Telegram chat, a mailbox, Pushover, Pushbullet, an ntfy topic, a Gotify server, or a
webhook of your own. Until you add a destination, nothing is sent anywhere: no destination, no request. A destination is told only the kinds of event ticked for it, and nothing that happened before it
existed, so adding one cannot replay a year of history at you.

- **Addresses and places stay out of the message** unless you switch *Include IP addresses and places* on for that destination. Without it,
  an impossible-travel message says "Oslo, Norway and London, United Kingdom" and never the addresses behind them. This is worth a thought
  for a destination somebody else runs: a Discord webhook means Discord holds whatever the message says.
- **A destination's address is a password.** A Discord webhook URL carries its own token, so FinStats stores the address the way it stores an
  API key: never shown again, never written to a log, never part of a backup, and never sent back to the browser; the page shows the host.
- **Who may add one.** Only a Jellyfin administrator can add a destination for the server. Anybody else needs the *Be sent notifications*
  permission, their destination may only point at a public address (not something inside your network, nor your household's own public
  address), and it is sent only what that person can already see in FinStats: their own requests and alerts, somebody else's plays only if
  they may see everyone's activity, addresses only if they may see network details, a new title only if Jellyfin lets them see it, a failed
  job or connection only if they may see the server and manage FinStats. Taking the permission away stops what their destinations are sent,
  at once. A destination is made or changed only from a signed-in browser, never with an API key. An administrator may switch somebody
  else's destination off or remove it, but not move it elsewhere, read its topic or switch its certificate checks off.
- **Discord and Slack need `https`**, because their webhook address is the token. What a message says is sent to them as plain text,
  so a device or title name can neither format the message nor ping anybody.
- **No redirect is followed**, for the same reason as everywhere else: a token must not travel to wherever a redirect points. The three
  services whose address is their own (Telegram, Pushover, Pushbullet) are reached at that address and no other, so a token issued by one
  of them can never be posted to a look-alike host.
- **Mail is encrypted or it does not go.** `smtps://` is encrypted from the first byte; `smtp://` starts plain and must upgrade with
  STARTTLS before anything is said. There is no third setting, and no path by which your mail password is sent in the clear.

**Settings → System → Outbound connections** lists both of the outside requests above, your Jellyfin, every Sonarr, Radarr or Seerr you have connected,
and every notification destination: what each is for, whether it is switched on, and when it last answered or last took a message. It is built
from what FinStats already keeps, so the list itself learns nothing; it exists so that the paragraphs above are something you can check rather
than something you have to believe.

**What the Security page is, and is not.** A place is the centre of a city or of an ISP's region, never a household, and it can be
hundreds of kilometres off; a VPN or a phone on mobile data looks like a trip. Alerts (*impossible travel*, *new country*) are a
reason to look, not proof. The page needs both *see network details* and *see everyone's activity*; resolving alerts needs *manage*.
Failed sign-ins on an account are one warning in each quarter of an hour, and become an alert at twenty; a name counts
against an account only when it was typed whole. Names that are no account are one notice a quarter of an hour that
names nobody, so a flood of them can neither bury the alerts nor hide a real sign-in.

**The services you connect.** Under **Settings → Connections** a Jellyfin administrator can point FinStats at Sonarr, Radarr and Seerr. These are
requests to addresses *you* enter, normally on your own network; FinStats contacts nothing on its own account, and the two outside requests above
stay the only ones it makes by itself. (Notification destinations are addresses you enter too; see below.) Your download client is not connected to FinStats at all: Sonarr and Radarr already talk to it, and FinStats reads their
queues instead.
- **Read-only.** FinStats sends `GET` to these services and nothing else: there is no code in it that could approve a request, start a search,
  or add, pause or remove a download.
- **As rarely as is useful, and as small as they allow.** Seerr is asked every five minutes, but a pass with nothing to read is a single
  row: FinStats asks for the newest-changed request, recognises it, and stops. Sonarr's and Radarr's queues are read every five seconds
  only while a page is showing them, every minute while something is in them, and every five minutes while there is not. Every read also
  asks for a compressed answer (`Accept-Encoding: gzip, br`), which these services and Jellyfin all give.
- **Keys and passwords** are stored in FinStats' database next to the Jellyfin key, are never sent back to the browser (the settings page only
  learns that one is stored), never written to a log and never part of a backup. A stored one is sent only to the server it was saved for:
  pointing a connection or a destination at another server, or testing it there, needs the secret typed again. They travel in headers or request bodies, never in an
  address (FinStats' own calendar feed is the one address that carries a key, above, and that key opens nothing else).
- **No redirect is followed.** A key would travel along a redirect to wherever it points, so FinStats reports a redirect as an error and asks for
  the final address instead.
- **Certificates are verified.** A service with a self-signed certificate needs "Accept a self-signed certificate" switched on for that one
  connection; FinStats then does not verify who answers there. Plain `http://` on your own network needs no switch.
