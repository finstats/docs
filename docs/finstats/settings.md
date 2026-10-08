# Settings

Everything works out of the box. If you want to tune it, **Settings** in the app has:

| | |
|---|---|
| **Access** | Who may sign in and what they may see, for everyone or per person: *sign in*, *see everyone's activity*, *see network details*, *see the server*, *manage FinStats*. Jellyfin administrators always have everything, and only they can change this. |
| **Jellyfin's address for people** | Where every title's *Open in Jellyfin* button points: your Jellyfin's address from outside, when that is not the one FinStats connects to (a container name, a LAN address). Empty: the address FinStats connects to. Jellyfin administrators only. |
| **API keys** | Your own keys for scripts and calendars, with a scope and an expiry; shown once, revoked with a click. Every signed-in user has this section; administrators see everyone's keys. |
| **Tasks** | Every job FinStats does by itself, when it last ran and how long it took, and (one click away) its schedule, the way Jellyfin schedules its own: daily, weekly, on an interval, at start-up, or after Jellyfin's library scan (the default for the library read), each with an optional time limit. |
| **Check every…** | How often FinStats asks what is playing: every second while someone is watching, and, only while the live connection is not carrying, every 5 seconds while nobody is. Jellyfin pushes a new play within about a second, so the second one is a fallback and nothing more. |
| **Treat a restart as the same play** | A stream that stops and resumes within 10 minutes counts as one viewing. |
| **Home network** | Which plays count as local. Private addresses always do; with *Recognise my own public address* on (the default), so does your household's public IP, looked up **once** and remembered. *Look up now* asks again on the day it changes; you can also add addresses by hand. |
| **Connections** | Sonarr, Radarr and Seerr, several of a kind if you have them. Each is tested before it is saved; API keys are never shown again and never part of a backup. Jellyfin administrators only. |
| **Security** | The city database that places addresses: download DB-IP's free one with a click and keep it fresh with a schedule under *Tasks*, or drop your own `.mmdb` into `data/geoip/`. Also how fast (900 km/h) and how far apart (500 km) two sightings must be to count as impossible travel. |
| **Count it as watching together within** | How close together different people must start the same title to count as a group. Default 60 seconds. |
| **Ignore plays shorter than** | Leave accidental clicks out of the statistics. |

## Environment variables

| Variable | Default | |
|---|---|---|
| `TZ` | UTC | Your timezone, for per-day and hour-of-day statistics. |
| `FINSTATS_BIND` | `0.0.0.0:8080` | Address to listen on. |
| `FINSTATS_DATA_DIR` | `/data` | Where the database and poster cache live. |
| `PUID`, `PGID` | `1000` | The user and group FinStats runs as inside the container, and that will own the `data` folder. Set them to the owner of your files if that is not 1000. (`--user` works too; the folder must then already be writable for that user.) |
| `FINSTATS_TRUST_PROXY` | off | Set to `1` behind a reverse proxy so sign-in rate limiting sees real client addresses: the last `X-Forwarded-For` entry, the one your proxy adds. |
| `JELLYFIN_URL` + `JELLYFIN_API_KEY` | – | Skip the setup wizard. Set both or neither. |
| `FINSTATS_PUBLIC_IP_URL` | – | Your own "what is my IP" service (any URL answering with the caller's address as plain text), used instead of the built-in ones. |
| `FINSTATS_GEOIP_DB` | – | A city database (`.mmdb`, MaxMind format) to place addresses with, instead of the newest file in `data/geoip/`. |
| `FINSTATS_ALLOW_LIBRARY_SHRINK` | off | Let a sync mark items, libraries or users removed even when the read comes back far emptier than what FinStats holds. Off by default: such a read is treated as a Jellyfin fault, the data is kept, and FinStats stops so you can look. Set to `1` after genuinely emptying a library. |
| `FINSTATS_SKIP_PREUPDATE_BACKUP` | off | Skip the automatic full-database backup FinStats takes when a newer version first opens your data. On by default; the copy lands in `data/pre-update-backups/` before any upgrade touches the database, so you can roll back if something breaks. Set to `1` only if disk space is tight. |
| `RUST_LOG` | `finstats=info` | Log detail, e.g. `finstats=debug`. |

