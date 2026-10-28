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

1. Enter the setup code. Until it is set up, FinStats writes a one-time code to its log each time it starts, at the
   end of the line that says where it is listening (`Setup code: ABCD-EFGH`); `docker logs finstats` shows it. The code
   proves that whoever finishes setup can read the container's log, and not merely reach the port.
2. Enter your Jellyfin address and test the connection.
3. Sign in with a Jellyfin administrator account.

That's it. FinStats starts watching immediately and fills in your library in the background. The `data` folder is
created for you; FinStats makes it its own, closed to every other user of the machine, and then runs as an ordinary,
unprivileged user (1000:1000, or whatever you set with `PUID` and `PGID`). Set `TZ` to your own timezone so "today" and
"evening" mean what you expect.

!!! tip "Inside a container, `localhost` is the container itself"
    Use your server's address (for example `http://192.168.1.10:8096`) or the Jellyfin container's name.

## Next

- Coming from Jellystat, Streamystats or Tautulli? [Bring your history](imports/index.md).
- Everything works out of the box; [Settings](settings.md) says what you can tune.
- Behind a reverse proxy, set `FINSTATS_TRUST_PROXY` to the proxy's address, and give FinStats a hostname of its own
  on https ([questions](faq.md#can-i-put-it-behind-a-reverse-proxy)).
