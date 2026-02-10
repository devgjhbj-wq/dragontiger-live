import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BetButton } from "./BetButton";
import type { GamePhase, BetChoice } from "@/hooks/useGameSocket";
import { toast } from "sonner";

const AMOUNTS = [50, 100, 250, 500, 1000];

interface BetPanelProps {
  phase: GamePhase;
  onPlaceBet: (playerId: string, choice: BetChoice, amount: number) => Promise<any>;
}

export function BetPanel({ phase, onPlaceBet }: BetPanelProps) {
  const [selected, setSelected] = useState<BetChoice | null>(null);
  const [amount, setAmount] = useState(100);
  const [loading, setLoading] = useState(false);
  const isBetting = phase === "BETTING";

  const handleBet = async () => {
    if (!selected) return;
    setLoading(true);
    try {
      const playerId = `player_${Math.random().toString(36).slice(2, 8)}`;
      const res = await onPlaceBet(playerId, selected, amount);
      if (res.success) {
        toast.success(`Bet placed: ${amount} on ${selected}`);
        setSelected(null);
      } else {
        toast.error(res.error || "Bet failed");
      }
    } catch {
      toast.error("Connection error");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Bet choices */}
      <div className="grid grid-cols-3 gap-3">
        {(["DRAGON", "TIGER", "TIE"] as BetChoice[]).map((choice) => (
          <BetButton
            key={choice}
            choice={choice}
            disabled={!isBetting || loading}
            selected={selected === choice}
            onClick={() => setSelected(choice)}
          />
        ))}
      </div>

      {/* Amount selector */}
      <div className="flex flex-col gap-3">
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Bet Amount
        </span>
        <div className="flex gap-2 flex-wrap">
          {AMOUNTS.map((a) => (
            <button
              key={a}
              onClick={() => setAmount(a)}
              disabled={!isBetting}
              className={`
                px-4 py-2 rounded-lg text-sm font-semibold border transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                ${amount === a
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary/50"
                }
              `}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Place bet */}
      <AnimatePresence>
        {selected && isBetting && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={handleBet}
            disabled={loading}
            className="w-full py-4 rounded-xl font-display font-bold text-lg tracking-wider
              bg-primary text-primary-foreground
              hover:brightness-110 transition-all
              disabled:opacity-50"
          >
            {loading ? "Placing..." : `Bet ${amount} on ${selected}`}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
