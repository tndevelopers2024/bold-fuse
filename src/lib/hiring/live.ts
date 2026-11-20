import "server-only";
import { hiringDb } from "./db";

type Listener = (event: "change" | "unavailable") => void;
type Topic = "jobs" | "applications" | "publicJobs";
type Feed = { listeners: Set<Listener>; close: () => Promise<void> };

// Multiplex each collection watch across the browsers connected to this worker.
const feeds = new Map<Topic, Feed>();
async function subscribe(topic: Topic, listener: Listener) {
  const db = await hiringDb();
  let feed = feeds.get(topic);
  if (!feed) {
    const collection = topic === "applications" ? db.applications : db.jobs;
    const pipeline =
      topic === "publicJobs"
        ? [
            {
              $match: {
                $or: [
                  { operationType: { $in: ["insert", "replace", "delete"] } },
                  ...["title", "location", "description", "open"].map(
                    (key) => ({
                      [`updateDescription.updatedFields.${key}`]: {
                        $exists: true,
                      },
                    }),
                  ),
                ],
              },
            },
          ]
        : [];
    const watch = collection.watch(pipeline);
    const listeners = new Set<Listener>();
    const created = { listeners, close: () => watch.close() };
    feeds.set(topic, created);
    feed = created;
    watch.on("change", () => {
      for (const notify of listeners) notify("change");
    });
    function ended() {
      if (feeds.get(topic) !== created) return;
      feeds.delete(topic);
      for (const notify of Array.from(listeners)) notify("unavailable");
      void watch.close().catch(() => {});
    }
    watch.on("error", ended);
    watch.on("close", ended);
  }
  feed.listeners.add(listener);
  return () => {
    feed.listeners.delete(listener);
    if (!feed.listeners.size && feeds.get(topic) === feed) {
      feeds.delete(topic);
      void feed.close().catch(() => {});
    }
  };
}

export async function liveResponse(request: Request, admin: boolean) {
  const encoder = new TextEncoder();
  const cleanups: (() => void)[] = [];
  let ended = false;
  function stop() {
    if (ended) return;
    ended = true;
    for (const cleanup of cleanups.splice(0)) cleanup();
  }
  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (text: string) => controller.enqueue(encoder.encode(text));
      function finish() {
        if (ended) return;
        stop();
        controller.close();
      }
      request.signal.addEventListener("abort", finish, { once: true });
      cleanups.push(() => request.signal.removeEventListener("abort", finish));
      if (request.signal.aborted) return finish();
      try {
        for (const topic of admin
          ? (["jobs", "applications"] as const)
          : (["publicJobs"] as const)) {
          const unsubscribe = await subscribe(topic, (event) => {
            if (ended) return;
            if (event === "unavailable") return finish();
            send("event: changed\ndata: 1\n\n");
          });
          if (ended) return unsubscribe();
          cleanups.push(unsubscribe);
        }
        send("retry: 3000\nevent: ready\ndata: 1\n\n");
        const heartbeat = setInterval(() => send(": heartbeat\n\n"), 15000);
        const lifetime = setTimeout(finish, 50000);
        cleanups.push(
          () => clearInterval(heartbeat),
          () => clearTimeout(lifetime),
        );
      } catch {
        finish();
      }
    },
    cancel: stop,
  });
  return new Response(body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "private, no-store, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
