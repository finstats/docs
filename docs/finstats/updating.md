# Updating and moving

## Updating

```sh
docker pull ghcr.io/finstats/finstats:latest
docker rm -f finstats
# …then the same `docker run` as in Get started. With Compose: docker compose pull && docker compose up -d
```

See [Get started](install.md) for that command. Your data lives in the `data` folder and upgrades itself on start-up; FinStats also keeps its own weekly
backups there. After an update, the **Patch notes** tab shows a dot until you have read what changed. The same
notes are on the [releases page](https://github.com/finstats/finstats/releases) and in [CHANGELOG.md](https://github.com/finstats/finstats/blob/main/CHANGELOG.md).

Updates only go forward. The database remembers the newest version that has opened it, and an older FinStats
refuses to start on it rather than risk your history; the message says how to get going again. To really go back to
an older version, start it on an empty data folder and restore one of the backups (`finstats restore <file>
--with-settings`, below).

Before a newer version changes anything in your database, it copies the whole of it to `data/pre-update-backups/`
(the newest three are kept). If an update goes wrong, stop FinStats, put that copy in place of `data/finstats.db` and
start the version you came from. An update that fails and is restarted over and over keeps the copy from before it.

## Moving FinStats to another machine

Download a backup under **Settings → Backups**, set up the new FinStats, and restore the file on its
**Settings → Backups** page. Restoring merges, so nothing is lost if the new
instance has already been collecting. The library is read from Jellyfin again by itself. With *Also restore settings and
permissions* ticked, the settings and permissions come back too, and they never open the new FinStats wider than it already is: who
may sign in, everyone's permissions and public profiles become what both allow, and nobody gains a permission they do
not have on both.

From the command line, copy the file into the data folder (it belongs to `PUID`, 1000 unless you changed it, and is
closed to everyone else, so copy it as that user or with `sudo` and give it to them) and run the restore as that user,
since FinStats will not run as root over its own data:

```sh
sudo install -o 1000 -g 1000 -m 600 finstats-backup-20260101-120000.jsonl.gz data/
docker exec -u 1000 finstats finstats restore /data/finstats-backup-20260101-120000.jsonl.gz
```

That brings back the history only, as the page does with that box unticked; add `--with-settings` for the settings and
permissions too. `docker exec -u 1000 finstats finstats backup` writes a backup into `data/backups` the same way.

