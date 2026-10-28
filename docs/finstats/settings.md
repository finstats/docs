# Settings

Everything works out of the box. If you want to tune it, **Settings** in the app has:

| | |
|---|---|
| **Language** | Settings → Appearance → Language, for this browser: British or American English, Norwegian Bokmål or Nynorsk, or Synnmørsk, the maintainer's own dialect from Søre Sunnmøre (all checked by the maintainer), or Danish, German, Spanish, Finnish, French, Hindi, Icelandic, Italian, Japanese, Korean, Dutch, Polish, Portuguese (Brazil), Russian, Swedish, Turkish, Ukrainian, or Chinese (Simplified or Traditional), which nobody here can check and may hold mistakes. Until you choose, FinStats follows the browser's own language, and anything it does not speak is American English; a text a language lacks is shown in English. Numbers, dates and units are written the language's way. |
| **Date and time format** | Settings → Appearance, for this browser: a date written 31.01.2026, 31/01/2026, 31-01-2026, 01/31/2026, 2026-01-31, 2026.01.31 or 2026/01/31, and a time in 24 or 12 hours, with or without a leading zero. Until you choose, both are written the language's way. |
| **The welcome** | The first time you sign in, on whichever browser, and at the end of setup, FinStats asks for this browser's language, date and time format, light or dark colours (or the device's), and layout, with a picture of each layout. *Skip* keeps British English, 31/01/2026, 13:05, the device's colours and the FinStats layout. It is asked once a person; what it asks is each browser's own, and can be changed later in Settings → Appearance, or asked again by typing `finstatsWelcome()` in the browser's console. |
| **Access** | Who may sign in and what they may see, for everyone or per person: *sign in*, *see everyone's activity*, *see network details*, *see the server*, *see what is downloading*, *be sent notifications*, *manage FinStats*. Jellyfin administrators always have everything, and only they can change this, from a signed-in browser (never with an API key). Which libraries and titles somebody sees is not set here: it is what Jellyfin lets them see (below). |
| **Libraries and titles** | Follow Jellyfin. Each person sees the libraries Jellyfin opens to them, and inside those only the titles Jellyfin lists for them under their parental rating limit, blocked or allowed tags and unrated items. Change it in Jellyfin's user settings; FinStats picks it up at the next users read (every 15 minutes) or sign-in. |
| **Jellyfin's address for people** | Where every title's *Open in Jellyfin* button points: your Jellyfin's address from outside, when that is not the one FinStats connects to (a container name, a LAN address). Empty: only administrators are offered the button, at the address FinStats connects to, since that address is usually one inside the house. Jellyfin administrators only. |
| **API keys** | Your own keys for scripts and calendars, with a scope and an expiry; shown once, revoked with a click. Every signed-in user has this section; administrators see everyone's keys. |
| **Tasks** | Every job FinStats does by itself, when it last ran and how long it took, and (one click away) its schedule, the way Jellyfin schedules its own: daily, weekly, on an interval, at start-up, or after Jellyfin's library scan (the default for the library read), each with an optional time limit. When the users, the activity log and the backups are read or written is a Jellyfin administrator's to change. Somebody who may *manage FinStats* starts each job by hand at most once a minute. |
| **Check every…** | How often FinStats asks what is playing: every second while someone is watching, and, only while the live connection is not carrying, every 5 seconds while nobody is. Jellyfin pushes a new play within about a second, so the second one is a fallback and nothing more. |
| **Treat a restart as the same play** | A stream that stops and resumes within 10 minutes counts as one viewing. At most an hour, and only a Jellyfin administrator may change it: a wider window merges plays for good. |
| **Backups** | How often FinStats writes a backup and how many it keeps. Jellyfin administrators only; somebody who may *manage FinStats* may run a backup by hand, and theirs are kept apart, so they never push an administrator's out. |
| **Home network** | Which plays count as local. Private addresses always do; with *Recognise my own public address* on (the default), so does your household's public IP, looked up **once** and remembered. *Look up now* asks again on the day it changes; you can also add addresses by hand. The addresses are shown only with *see network details*, and changed only with *see everyone's activity* as well, since they decide what the security alerts find. |
| **Connections** | Sonarr, Radarr and Seerr, several of a kind if you have them. Each is tested before it is saved; API keys are never shown again and never part of a backup. Jellyfin administrators only. |
| **Security** | The city database that places addresses: download DB-IP's free one with a click and keep it fresh with a schedule under *Tasks*, or drop your own `.mmdb` into `data/geoip/`. Also how fast (900 km/h) and how far apart (500 km) two sightings must be to count as impossible travel. Both need what reading the Security page needs. |
| **Count it as watching together within** | How close together different people must start the same title to count as a group. Default 60 seconds. |
| **Ignore plays shorter than** | Leave accidental clicks out of the statistics. |

## Environment variables

| Variable | Default | |
|---|---|---|
| `TZ` | UTC | Your timezone, for per-day and hour-of-day statistics. |
| `FINSTATS_BIND` | `0.0.0.0:8080` | Address to listen on. |
| `FINSTATS_DATA_DIR` | `/data` | Where the database and poster cache live. |
| `PUID`, `PGID` | `1000` | The user and group FinStats runs as inside the container, and that will own the `data` folder. Set them to the owner of your files if that is not 1000. (`--user` works too; the folder must then already be writable for that user.) |
| `FINSTATS_TRUST_PROXY` | off | Behind a reverse proxy: the proxy's address or range (`172.18.0.2`, `172.18.0.0/16`; several separated by commas or spaces). Only from those peers are `X-Forwarded-For`, `X-Forwarded-Host` and `X-Forwarded-Proto` believed, and the client's address is the entry before your proxies', so the sign-in limit and the audit log see who really asked. `1` believes any peer on this machine or a private network, one hop. Off: nobody's headers are believed. An entry that is not an address or a range stops FinStats at start-up. |
| `JELLYFIN_URL` + `JELLYFIN_API_KEY` | – | Skip the setup wizard. Set both or neither. |
| `FINSTATS_PUBLIC_IP_URL` | – | Your own "what is my IP" service (any URL answering with the caller's address as plain text), used instead of the built-in ones. |
| `FINSTATS_GEOIP_DB` | – | A city database (`.mmdb`, MaxMind format) to place addresses with, instead of the newest file in `data/geoip/`. |
| `FINSTATS_ALLOW_LIBRARY_SHRINK` | off | Let a sync mark items, libraries or users removed, or clear a person's played and favourite flags, even when the read comes back far emptier than what FinStats holds. Off by default: such a read is treated as a Jellyfin fault, the data is kept, and FinStats stops so you can look. Set to `1` after genuinely emptying a library. |
| `FINSTATS_SKIP_PREUPDATE_BACKUP` | off | Skip the automatic full-database backup FinStats takes when a newer version first opens your data. On by default; the copy lands in `data/pre-update-backups/` before any upgrade touches the database, so you can roll back if something breaks. Set to `1` only if disk space is tight. |
| `RUST_LOG` | `finstats=info` | Log detail, e.g. `finstats=debug`. |

