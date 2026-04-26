import { useCallback, useEffect, useRef, useState } from "react";

const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function usePlaygroundSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionError, setSessionError] = useState<string | null>(null);
  const heartbeatRef = useRef<number | null>(null);

  const createSession = useCallback(async (accessToken: string) => {
    if (!accessToken) {
      setSessionId(null);
      setSessionError("Missing playground access token.");
      return;
    }

    try {
      setSessionError(null);
      const res = await fetch("/api/playground/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-playground-access-token": accessToken,
        },
        body: JSON.stringify({}),
      });

      const data: unknown = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = isRecord(data) && typeof data.error === "string" ? data.error : null;
        throw new Error(msg || "Failed to create session");
      }

      if (!isRecord(data) || (typeof data.sessionId !== "string" && typeof data.sessionId !== "number")) {
        throw new Error("Failed to create session");
      }
      setSessionId(String(data.sessionId));
    } catch (err) {
      setSessionError(err instanceof Error ? err.message : "Failed to create session");
      setSessionId(null);
    }
  }, []);

  const resetSession = useCallback(() => {
    setSessionId(null);
    setSessionError(null);
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    heartbeatRef.current = window.setInterval(async () => {
      try {
        await fetch("/api/playground/session/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });
      } catch {
        // heartbeat failures are non-critical
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      if (heartbeatRef.current) window.clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    };
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;

    return () => {
      fetch("/api/playground/session", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    };
  }, [sessionId]);

  return { sessionId, sessionError, createSession, resetSession };
}
