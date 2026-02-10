import { useState, useEffect, useRef } from "react";

const WS_URL = "wss://multiplayerbackend-jk7x.onrender.com";
const API_URL = "https://multiplayerbackend-jk7x.onrender.com";

export type GamePhase = "BETTING" | "STOP";

export function useGameSocket() {
  const [phase, setPhase] = useState<GamePhase>("STOP");
  const [remaining, setRemaining] = useState<number | null>(null);
  const [roundId, setRoundId] = useState<number | null>(null);
  const [connected, setConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Fetch initial round state on mount
  useEffect(() => {
    fetch(`${API_URL}/api/round`)
      .then((res) => res.json())
      .then((data) => {
        if (data.phase) setPhase(data.phase);
        if (data.remaining !== undefined) setRemaining(data.remaining);
        if (data.roundId !== undefined) setRoundId(data.roundId);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setConnected(true);
      ws.onclose = () => {
        setConnected(false);
        setTimeout(connect, 3000);
      };
      ws.onerror = () => ws.close();

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.phase !== undefined) setPhase(data.phase);
          if (data.remaining !== undefined) setRemaining(data.remaining);
          if (data.roundId !== undefined) setRoundId(data.roundId);
        } catch {
          // ignore non-JSON messages
        }
      };
    }

    connect();
    return () => {
      wsRef.current?.close();
    };
  }, []);

  return { phase, remaining, roundId, connected };
}
