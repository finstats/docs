# Privacy

finstats holds who watched what, when and from where. This is what it does with that, and what it never does.

- **Sign in with your Jellyfin account.** No new passwords, and finstats never stores yours.
- **Nothing is readable without an account** unless an administrator allows public profiles and a person
  publishes one, and then only what that person switched on, a day late, never a device, address or path.
- **You decide who sees what.** Let family and friends sign in if you like. By default they get
  their own statistics and recap and nothing else. From there you grant more, per person or for
  everyone: other people's activity, network details like IP addresses, the server pages, or
  managing finstats itself. No permission opens other people's recaps or watchlists.
- **Nothing about you leaves your network.** No telemetry, no accounts, no fonts or scripts loaded
  from the internet. Posters are fetched from your own Jellyfin. The one outside request finstats
  makes by default is a plain "what is my IP" lookup, asked **once**, so that people watching at home
  through your public address are not counted as remote, and after that never again unless you press the
  button. It carries no information about you or your server, and one switch in Settings turns it off.
  **Settings → System → Outbound connections** lists every destination finstats can reach and whether it is
  switched on, so the promise is one you can check rather than one you have to take. The Security map needs a geolocation database; downloading it is
  off until you ask for it, and addresses are always looked up on your own machine. Sonarr, Radarr, Seerr and torrent
  are reached at the addresses you enter, on your own network.
- **Notifications go where you send them, and nowhere else.** finstats can tell you when something happens
  (in a Discord or Slack channel, a Telegram chat, an e-mail, Pushover, Pushbullet, ntfy, Gotify, or a webhook of
  your own), and until you add a destination it sends nothing at all. Each destination is told only the kinds of event you tick for it, and IP addresses and coordinates stay
  out of the messages unless you switch them in for that one destination. Every destination is listed under
  **Outbound connections** with the rest.
- **Read-only.** finstats never changes anything on your Jellyfin server and never starts a library scan. The same goes for
  the services you connect (Sonarr, Radarr, Seerr): it reads, and that is all.

How finstats protects these things in practice is the [security model](security.md).
