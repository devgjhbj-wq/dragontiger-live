import { motion } from "framer-motion";

export function ConnectionStatus({ connected }: { connected: boolean }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <motion.div
        animate={{
          backgroundColor: connected ? "hsl(var(--tie))" : "hsl(var(--accent))",
          boxShadow: connected
            ? "0 0 8px hsl(var(--tie) / 0.6)"
            : "0 0 8px hsl(var(--accent) / 0.6)",
        }}
        className="w-2 h-2 rounded-full"
      />
      {connected ? "Live" : "Reconnecting…"}
    </div>
  );
}
