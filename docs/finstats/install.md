# Get started

You need Docker and a Jellyfin server (10.9 or newer).

```sh
docker run -d --name finstats --restart unless-stopped \
  -p 8080:8080 \
  -e TZ=Europe/London \
  -v "$PWD/data:/data" \
  ghcr.io/finstats/finstats:latest
```

??? example "Prefer Docker Compose?"

    ```yaml
    services:
      finstats:
        image: ghcr.io/finstats/finstats:latest
        container_name: finstats
        restart: unless-stopped
        ports:
          - "8080:8080"
        environment:
          TZ: Europe/London   # your timezone
        volumes:
          - ./data:/data
    ```

The image is published for 64-bit Intel/AMD and ARM machines (a Raspberry Pi 4 or 5 works) at
[`ghcr.io/finstats/finstats`](https://github.com/finstats/finstats/pkgs/container/finstats). `:latest` is the newest
release; pin a version such as `:2.0.0`, or `:2` for every 2.x update, if you prefer to choose when to upgrade. `:edge`
follows development and may be rough.

Then open **http://your-server:8080** and:

1. Enter your Jellyfin address and test the connection.
2. Sign in with a Jellyfin administrator account.

That's it. FinStats starts watching immediately and fills in your library in the background. The `data` folder is
created for you; FinStats makes it its own and then runs as an ordinary, unprivileged user (1000:1000, or whatever you
set with `PUID` and `PGID`). Set `TZ` to your own timezone so "today" and "evening" mean what you expect.

!!! tip "Inside a container, `localhost` is the container itself"
    Use your server's address (for example `http://192.168.1.10:8096`) or the Jellyfin container's name.

## Next

- Coming from Jellystat, Streamystats or Tautulli? [Bring your history](imports/index.md).
- Everything works out of the box; [Settings](settings.md) says what you can tune.
- Behind a reverse proxy, set `FINSTATS_TRUST_PROXY=1` ([questions](faq.md#can-i-put-it-behind-a-reverse-proxy)).
