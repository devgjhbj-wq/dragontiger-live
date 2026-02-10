import { motion } from "framer-motion";

interface Bet {
  playerId: string;
  choice: string;
  amount: number;
  phase: string;
}

const choiceIcon: Record<string, string> = {
  DRAGON: "🐉",
  TIGER: "🐅",
  TIE: "🤝",
};

export function BetHistory({ bets }: { bets: Bet[] }) {
  if (bets.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
        Recent Bets
      </span>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
        {[...bets].reverse().slice(0, 10).map((bet, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between bg-secondary/50 rounded-lg px-3 py-2 text-sm"
          >
            <span className="flex items-center gap-2">
              <span>{choiceIcon[bet.choice] || "?"}</span>
              <span className="text-muted-foreground font-mono text-xs">{bet.playerId.slice(0, 10)}</span>
            </span>
            <span className="font-semibold text-primary">{bet.amount}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
