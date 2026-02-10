import { motion } from "framer-motion";
import type { BetChoice } from "@/hooks/useGameSocket";

interface BetButtonProps {
  choice: BetChoice;
  disabled: boolean;
  selected: boolean;
  onClick: () => void;
}

const config: Record<BetChoice, { label: string; icon: string; classes: string; glowClass: string }> = {
  DRAGON: {
    label: "Dragon",
    icon: "🐉",
    classes: "bg-dragon/15 border-dragon/40 hover:border-dragon hover:bg-dragon/25",
    glowClass: "shadow-dragon",
  },
  TIGER: {
    label: "Tiger",
    icon: "🐅",
    classes: "bg-tiger/15 border-tiger/40 hover:border-tiger hover:bg-tiger/25",
    glowClass: "shadow-tiger",
  },
  TIE: {
    label: "Tie",
    icon: "🤝",
    classes: "bg-tie/15 border-tie/40 hover:border-tie hover:bg-tie/25",
    glowClass: "shadow-tie",
  },
};

export function BetButton({ choice, disabled, selected, onClick }: BetButtonProps) {
  const c = config[choice];

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        relative flex flex-col items-center justify-center gap-2
        w-full py-6 px-4 rounded-xl border-2 transition-all duration-300
        font-display font-semibold text-lg tracking-wide
        disabled:opacity-40 disabled:cursor-not-allowed
        ${c.classes}
        ${selected ? `${c.glowClass} border-opacity-100 ring-2 ring-offset-2 ring-offset-background` : ""}
        ${selected && choice === "DRAGON" ? "ring-dragon" : ""}
        ${selected && choice === "TIGER" ? "ring-tiger" : ""}
        ${selected && choice === "TIE" ? "ring-tie" : ""}
      `}
    >
      <span className="text-4xl">{c.icon}</span>
      <span>{c.label}</span>
      {selected && (
        <motion.div
          layoutId="selected-indicator"
          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <span className="text-xs text-primary-foreground">✓</span>
        </motion.div>
      )}
    </motion.button>
  );
}
