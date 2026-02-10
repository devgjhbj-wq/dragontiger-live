import { useState, useEffect, useRef, useCallback } from "react";

const WS_URL = "wss://multiplayerbackend-jk7x.onrender.com";
const API_URL = "https://multiplayerbackend-jk7x.onrender.com";

export type GamePhase = "BETTING" | "STOP";
export type BetChoice = "DRAGON" | "TIGER" | "TIE";

interface Bet {
  playerId: string;
  choice: BetChoice;
  amount: number;
  phase: string;
}

export function useGameSocket() {
  const [phase, setPhase] = useState<GamePhase>("STOP");
  const [remaining, setRemaining] = useState(0);
  const [connected, setConnected] = useState(false);
  const [bets, setBets] = useState<Bet[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

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
          if (data.phase !== undefined) {
            setPhase(data.phase);
          }
          if (data.remaining !== undefined) {
            setRemaining(data.remaining);
          }
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

  const placeBet = useCallback(
    async (playerId: string, choice: BetChoice, amount: number) => {
      const res = await fetch(`${API_URL}/api/bet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerId, choice, amount }),
      });
      const data = await res.json();
      if (data.success) {
        setBets((prev) => [...prev, data.bet]);
      }
      return data;
    },
    []
  );

  return { phase, remaining, connected, bets, placeBet };
}
