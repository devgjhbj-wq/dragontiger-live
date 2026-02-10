import { motion } from "framer-motion";
import type { GamePhase } from "@/hooks/useGameSocket";

interface RoundInfoProps {
  roundId: number | null;
  phase: GamePhase;
}

export function RoundInfo({ roundId, phase }: RoundInfoProps) {
  const isBetting = phase === "BETTING";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between bg-card/60 backdrop-blur-xl border border-border rounded-2xl px-6 py-4"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Round
        </span>
        <span className="text-2xl font-display font-bold text-foreground">
          #{roundId ?? "—"}
        </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Status
        </span>
        <motion.span
          key={phase}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-sm font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
            isBetting
              ? "bg-primary/20 text-primary"
              : "bg-accent/20 text-accent"
          }`}
        >
          {isBetting ? "🟢 Betting Open" : "🔴 Stopped"}
        </motion.span>
      </div>
    </motion.div>
  );
}
