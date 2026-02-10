import { motion } from "framer-motion";
import type { GamePhase } from "@/hooks/useGameSocket";

interface GameTimerProps {
  remaining: number;
  phase: GamePhase;
}

export function GameTimer({ remaining, phase }: GameTimerProps) {
  const isBetting = phase === "BETTING";
  const progress = isBetting ? remaining / 11 : 0;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="6"
          />
          <motion.circle
            cx="50" cy="50" r="42"
            fill="none"
            stroke={isBetting ? "hsl(var(--primary))" : "hsl(var(--accent))"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 42}
            animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - progress) }}
            transition={{ duration: 0.5, ease: "linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={remaining}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-3xl font-display font-bold ${isBetting ? "text-primary text-glow-gold" : "text-accent"}`}
          >
            {isBetting ? remaining : "—"}
          </motion.span>
        </div>
      </div>
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className={`text-sm font-semibold uppercase tracking-widest ${isBetting ? "text-primary" : "text-accent"}`}
      >
        {isBetting ? "Place Your Bets" : "No More Bets"}
      </motion.div>
    </div>
  );
}
