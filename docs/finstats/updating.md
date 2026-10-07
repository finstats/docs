# Updating and moving

## Updating

```sh
docker pull ghcr.io/finstats/finstats:latest
docker rm -f finstats
# …then the same `docker run` as in Get started. With Compose: docker compose pull && docker compose up -d
```

See [Get started](install.md) for that command. Your data lives in the `data` folder and upgrades itself on start-up; finstats also keeps its own weekly
backups there. After an update, the **Patch notes** tab shows a dot until you have read what changed. The same
notes are on the [releases page](https://github.com/finstats/finstats/releases) and in [CHANGELOG.md](https://github.com/finstats/finstats/blob/main/CHANGELOG.md).

Updates only go forward. The database remembers the newest version that has opened it, and an older finstats
refuses to start on it rather than risk your history; the message says how to get going again. To really go back to
an older version, start it on an empty data folder and restore one of the backups (`finstats restore <file>`).

## Moving finstats to another machine

Download a backup under **Settings → Backups**, set up the new finstats, and restore the file on its
**Settings → Backups** page (or `finstats restore <file>`). Restoring merges, so nothing is lost if the new
instance has already been collecting. The library is read from Jellyfin again by itself.

