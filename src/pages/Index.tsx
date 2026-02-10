import { motion } from "framer-motion";
import { useGameSocket } from "@/hooks/useGameSocket";
import { GameTimer } from "@/components/GameTimer";
import { BetPanel } from "@/components/BetPanel";
import { BetHistory } from "@/components/BetHistory";
import { ConnectionStatus } from "@/components/ConnectionStatus";

const Index = () => {
  const { phase, remaining, connected, bets, placeBet } = useGameSocket();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-dragon/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-tiger/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md flex flex-col gap-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex items-center justify-between mb-4">
            <div />
            <ConnectionStatus connected={connected} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-primary text-glow-gold tracking-wide">
            Dragon · Tiger
          </h1>
          <p className="text-muted-foreground text-sm mt-1 tracking-wide">
            Real-time multiplayer card game
          </p>
        </motion.div>

        {/* Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center"
        >
          <GameTimer remaining={remaining} phase={phase} />
        </motion.div>

        {/* Betting panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-6"
        >
          <BetPanel phase={phase} onPlaceBet={placeBet} />
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <BetHistory bets={bets} />
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
