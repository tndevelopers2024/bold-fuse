"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ConnectionState } from "@/lib/hiring/types";

export function useLiveHiringSync(admin = false) {
  const router = useRouter();
  const [state, setState] = useState<ConnectionState>("connecting");
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const reconnectRef = useRef<(() => void) | null>(null);

  const manualRefresh = useCallback(() => {
    router.refresh();
    if (typeof navigator === "undefined" || navigator.onLine) {
      reconnectRef.current?.();
    }
  }, [router]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    let stream: EventSource | undefined;

    function refresh() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setLastSyncedAt(Date.now());
        router.refresh();
      }, 150);
    }

    function connect() {
      stream?.close();
      stream = undefined;
      if (document.hidden) return;
      if (!navigator.onLine) {
        setState("offline");
        return;
      }
      setState((prev) => (prev === "connected" ? "connected" : "connecting"));
      stream = new EventSource(admin ? "/admin/updates/" : "/careers/updates/");
      stream.addEventListener("ready", () => {
        setState("connected");
        refresh();
      });
      stream.addEventListener("changed", () => {
        setState("connected");
        refresh();
      });
      stream.onerror = () => {
        setState(navigator.onLine ? "reconnecting" : "offline");
      };
    }

    reconnectRef.current = connect;

    function handleOnline() {
      setState("connecting");
      connect();
      refresh();
    }

    function handleOffline() {
      stream?.close();
      stream = undefined;
      setState("offline");
    }

    connect();
    document.addEventListener("visibilitychange", connect);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Reconcile after network gaps and on hosts that buffer streaming responses.
    const reconcile = setInterval(() => {
      if (!document.hidden && navigator.onLine) refresh();
    }, 30000);

    return () => {
      reconnectRef.current = null;
      stream?.close();
      clearInterval(reconcile);
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", connect);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [admin, router]);

  return { state, lastSyncedAt, manualRefresh };
}

export function LiveUpdates({ admin = false }: { admin?: boolean }) {
  const { state } = useLiveHiringSync(admin);
  if (!admin) return null;
  const label =
    state === "connected"
      ? "Live updates"
      : state === "offline"
        ? "Offline"
        : state === "reconnecting"
          ? "Reconnecting…"
          : "Connecting…";
  return <span className="text-sm font-medium text-white/85">{label}</span>;
}
