"use client";

import { motion, useReducedMotion } from "framer-motion";

// Decorative, animated page backdrop + the one-time load fade.
// Split out of the page so the page itself can stay a server component.
export default function PageBackground() {
  const reduced = useReducedMotion();

  return (
    <>
      <motion.div
        aria-hidden
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-0 z-[70] bg-surface"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.12),transparent_62%)]"
        animate={reduced ? undefined : { opacity: [0.45, 0.7, 0.45], scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed -left-32 top-1/4 z-0 h-[28rem] w-[28rem] rounded-full border border-accent/10"
        animate={reduced ? undefined : { y: [0, -30, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        aria-hidden
        className="pointer-events-none fixed -right-40 bottom-10 z-0 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.10),transparent_65%)] blur-3xl"
        animate={reduced ? undefined : { scale: [1, 1.08, 1], x: [0, -18, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
