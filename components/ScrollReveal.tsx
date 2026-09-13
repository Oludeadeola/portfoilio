"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const reduced = useReducedMotion();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -8% 0px",
  });

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initial = reduced
    ? { opacity: 0 }
    : { opacity: 0, scale: 0.96, filter: "blur(10px)", ...directionMap[direction] };

  const visible = reduced
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? visible : initial}
      transition={{
        duration: reduced ? 0.35 : 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
