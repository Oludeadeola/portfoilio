"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  format?: (n: number) => string;
  className?: string;
}

export default function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  format,
  className,
}: CountUpProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const motionVal = useMotionValue(0);
  const [display, setDisplay] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(to);
      return;
    }
    const controls = animate(motionVal, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsub = motionVal.on("change", (v) => setDisplay(Math.round(v)));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, duration, motionVal, reduced]);

  const formatted = format ? format(display) : display.toLocaleString();

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
