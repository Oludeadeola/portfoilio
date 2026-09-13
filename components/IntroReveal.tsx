"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Wraps the page content in the initial mount reveal. Children are server-
// rendered and passed through, so all content still ships in the initial HTML.
export default function IntroReveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.div>
  );
}
