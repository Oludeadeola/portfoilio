"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiDownload,
  FiGithub,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";
import CountUp from "./CountUp";
import { getEmail } from "@/lib/contact";

const titles = [
  "Backend-Heavy Engineer",
  "Full-Stack Engineer",
  "Systems Engineering Student",
];

const marqueeStack = [
  "Java",
  "Spring Boot",
  "PostgreSQL",
  "Python",
  "Django",
  "TypeScript",
  "React",
  "FastAPI",
  "MySQL",
  "MongoDB",
];

const orbitBadges = [
  { label: "Segregation of duties", x: "8%", y: "24%", delay: 1.1 },
  { label: "Pentest remediation", x: "74%", y: "20%", delay: 1.35 },
  { label: "DB-level integrity", x: "70%", y: "72%", delay: 1.55 },
];

function useLagosTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Lagos",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const intervalId = setInterval(tick, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return time;
}

function useHasHover() {
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setHasHover(media.matches);
    sync();
    media.addEventListener("change", sync);

    return () => media.removeEventListener("change", sync);
  }, []);

  return hasHover;
}

function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const reduced = useReducedMotion();
  const hasHover = useHasHover();
  const enabled = hasHover && !reduced;

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((event.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: enabled ? sx : 0, y: enabled ? sy : 0 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Tilt({
  children,
  max = 10,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotX = useTransform(py, [-0.5, 0.5], [max, -max]);
  const rotY = useTransform(px, [-0.5, 0.5], [-max, max]);
  const smoothRotX = useSpring(rotX, { stiffness: 220, damping: 22 });
  const smoothRotY = useSpring(rotY, { stiffness: 220, damping: 22 });
  const reduced = useReducedMotion();
  const hasHover = useHasHover();
  const enabled = hasHover && !reduced;

  const onMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        enabled
          ? { rotateX: smoothRotX, rotateY: smoothRotY, transformStyle: "preserve-3d" }
          : undefined
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

function RevealLetters({
  text,
  className,
  baseDelay = 0,
  per = 0.04,
  style,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  per?: number;
  style?: React.CSSProperties;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`}>
      {text.split("").map((character, index) => (
        <motion.span
          key={`${character}-${index}`}
          initial={{ y: "110%", opacity: 0, rotate: 4 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{
            delay: baseDelay + index * per,
            duration: 0.72,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ display: "inline-block", ...style }}
        >
          {character === " " ? "\u00A0" : character}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const lagosTime = useLagosTime();
  const email = getEmail();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  // Pause the marquee's infinite loop once it scrolls out of view to avoid
  // running an animation frame loop the user can't see.
  const marqueeInView = useInView(marqueeRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.45, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -72]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full overflow-hidden bg-surface"
    >
      <div
        className="absolute inset-0 pointer-events-none bg-grid"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 32%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 32%, transparent 82%)",
        }}
      />

      <div
        aria-hidden
        className="absolute inset-x-[-20%] top-[-14rem] h-[28rem] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.18),transparent_58%)] blur-3xl"
      />
      <div
        aria-hidden
        className="absolute left-[-12rem] top-1/4 h-80 w-80 rounded-full border border-accent/10"
      />
      <div
        aria-hidden
        className="absolute right-[-10rem] bottom-20 h-72 w-72 rounded-full border border-accent/10"
      />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -left-24 top-10 h-[34rem] w-[34rem] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, var(--bloom) 0%, transparent 72%)",
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 right-0 h-[38rem] w-[38rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, var(--bloom-soft) 0%, transparent 72%)",
          }}
        />
      </div>

      <CornerBracket className="left-6 top-24" position="tl" delay={0.2} />
      <CornerBracket className="right-6 top-24" position="tr" delay={0.3} />
      <CornerBracket className="bottom-24 left-6" position="bl" delay={0.4} />
      <CornerBracket className="bottom-24 right-6" position="br" delay={0.5} />

      {orbitBadges.map((badge) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: badge.delay, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute z-[2] hidden rounded-full border border-accent/20 bg-surface/60 px-4 py-2 font-dm text-[10px] uppercase tracking-[0.28em] text-fg4 backdrop-blur-md lg:block"
          style={{ left: badge.x, top: badge.y }}
        >
          <motion.span
            animate={reduced ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: badge.delay }}
            className="flex items-center gap-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {badge.label}
          </motion.span>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-6 lg:flex"
      >
        <span className="font-dm text-[10px] uppercase tracking-[0.3em] text-fg5 [writing-mode:vertical-rl] rotate-180">
          Index 01 / Introduction
        </span>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="h-24 w-px bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute left-0 right-0 top-20 z-20 md:top-24"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 font-dm text-[10px] uppercase tracking-[0.25em] text-fg4 md:text-xs">
          <span className="flex items-center gap-3">
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-px w-6 bg-line-strong"
            />
            Portfolio / 2026
          </span>
          <span className="hidden items-center gap-2 sm:flex">
            Lagos LT
            <span className="tabular-nums tracking-wider text-accent-fg normal-case">
              {lagosTime || "--:--:--"}
            </span>
          </span>
        </div>
      </motion.div>

      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
        }}
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-12 gap-6 px-6 pb-32 pt-36 md:pt-44 lg:gap-10 xl:gap-14"
      >
        <div className="col-span-12 flex flex-col justify-center lg:col-span-7 xl:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-1.5 font-dm text-[11px] uppercase tracking-wider text-accent-fg backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Software Engineer Intern / Accion Microfinance Bank
            </span>
          </motion.div>

          <div className="mb-6 max-w-full sm:max-w-[min(100%,44rem)] xl:max-w-[52rem]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 1.2 }}
              className="absolute left-6 top-[26rem] hidden h-24 w-24 rounded-full bg-accent/10 blur-3xl lg:block"
            />
            <h1 className="font-syne text-3xl font-extrabold leading-[1] tracking-tight sm:text-[12.5vw] sm:leading-[0.92] sm:tracking-tight md:text-[10vw] lg:text-[6.9vw] xl:text-[7.3vw]">
              <RevealLetters text="Adeola" className="block text-fg" baseDelay={0.45} per={0.045} />
              <span className="-mt-1 block leading-[0.92] whitespace-nowrap">
                <RevealLetters
                  text="Olude"
                  baseDelay={0.7}
                  per={0.045}
                  style={{
                    color: "transparent",
                    WebkitTextStroke: "1.5px rgb(var(--accent-fg))",
                    textShadow: "0 0 60px rgba(168,85,247,0.18)",
                  }}
                />
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.15, duration: 0.5, ease: "backOut" }}
                  className="inline-block text-accent-fg"
                >
                  .
                </motion.span>
              </span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="text-sm text-accent-fg/70 font-dm">{">"}</span>
            <span className="font-syne text-xl font-semibold tabular-nums text-fg2 md:text-2xl">
              {titles[0]}
            </span>
            <span className="inline-block h-6 w-0.5 bg-accent animate-[blink_1s_step-end_infinite]" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mb-10 max-w-xl font-dm text-base leading-relaxed text-fg3 md:text-lg"
          >
            I build <span className="font-medium text-fg">systems that cannot be gamed:</span>{" "}
            segregation of duties, penetration-test remediation, database-level
            integrity constraints. Currently the backend owner on a live platform
            serving 1,000+ staff at a regulated Nigerian bank, engineered out of
            Lagos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.3 }}
            className="mb-12 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.4}>
              <a
                href="#projects"
                data-cursor-hover
                className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 font-dm font-medium text-black shadow-[0_0_0_0_rgba(168,85,247,0.4)] transition-all duration-200 hover:bg-[#9333EA] hover:shadow-[0_0_30px_0_rgba(168,85,247,0.45)]"
              >
                View Projects
                <FiArrowDown className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.4}>
              <a
                href="#contact"
                data-cursor-hover
                className="group flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-dm font-medium text-fg transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-accent-fg"
              >
                Get In Touch
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </Magnetic>
            {/* <Magnetic strength={0.4}>
              <a
                href="/Adeola-Olude-CV.pdf"
                download
                data-cursor-hover
                className="group flex items-center gap-2 rounded-full border border-line px-7 py-3.5 font-dm font-medium text-fg3 transition-all duration-200 hover:border-accent hover:bg-accent/5 hover:text-accent-fg"
              >
                Download CV
                <FiDownload className="transition-transform group-hover:translate-y-0.5" />
              </a>
            </Magnetic> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.45 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <Magnetic strength={0.5}>
                <a
                  href="https://github.com/Oludeadeola"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg4 transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent-fg"
                  aria-label="GitHub"
                >
                  <FiGithub size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a
                  href="https://www.linkedin.com/in/adeola-olude-11a366238/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg4 transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent-fg"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin size={16} />
                </a>
              </Magnetic>
              <Magnetic strength={0.5}>
                <a
                  href={`mailto:${email}`}
                  data-cursor-hover
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg4 transition-colors hover:border-accent/50 hover:bg-accent/5 hover:text-accent-fg"
                  aria-label="Email"
                >
                  <FiMail size={16} />
                </a>
              </Magnetic>
            </div>

            <div className="hidden h-px w-12 bg-line sm:block" />

            <div className="flex items-center gap-5 font-dm text-xs">
              <Stat>
                <span className="font-syne text-base font-bold text-fg">
                  <CountUp to={5} duration={1.4} />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-fg4">Projects</span>
              </Stat>
              <span className="h-4 w-px bg-line" />
              <Stat>
                <span className="font-syne text-base font-bold text-fg">
                  <CountUp to={1000} suffix="+" duration={1.6} />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-fg4">
                  Users Reached
                </span>
              </Stat>
              <span className="h-4 w-px bg-line" />
              <Stat>
                <span className="font-syne text-base font-bold text-fg">
                  <CountUp to={7} duration={1.2} />
                </span>
                <span className="text-[10px] uppercase tracking-wider text-fg4">Roles Secured</span>
              </Stat>
            </div>
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-5 hidden flex-col justify-end pb-4 pt-28 lg:flex xl:col-span-4 xl:pt-36"
          style={{ perspective: 1200 }}
        >
          <Tilt max={10}>
            <a
              href="http://dolearnn.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group relative block overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-panel to-surface p-5 transition-all duration-300 hover:border-accent/40"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(168, 85, 247,0.12), transparent 60%)",
                }}
              />
              <motion.div
                aria-hidden
                className="absolute inset-x-6 top-20 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                animate={reduced ? undefined : { x: ["-15%", "15%", "-15%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative mb-5 flex items-center justify-between">
                <span className="font-dm text-[10px] uppercase tracking-[0.25em] text-fg4">
                  Currently Building
                </span>
                <FiArrowUpRight className="text-fg4 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-fg" />
              </div>

              <div className="relative space-y-5" style={{ transform: "translateZ(42px)" }}>
                <div>
                  <h3 className="mb-1 font-syne text-2xl font-bold text-fg transition-colors group-hover:text-accent-fg">
                    Dolearn
                  </h3>
                  <p className="font-dm text-sm leading-relaxed text-fg4">
                    Dolearn matches students with tutors. I set the product vision and technical direction, and coordinate sprint delivery across the team.                  </p>
                </div>

                <div className="rounded-2xl border border-line/80 bg-surface/70 p-4">
                  <div className="mb-3 flex items-center justify-between font-dm text-[10px] uppercase tracking-[0.24em] text-fg5">
                    <span>Launch Readiness</span>
                    <span>Live</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line/60">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.15, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    ["Status", "Live"],
                    ["Type", "EdTech"],
                    ["Role", "Lead"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 + index * 0.08, duration: 0.45 }}
                      className="rounded-2xl border border-line/80 bg-surface/60 p-3"
                    >
                      <p className="font-dm text-[10px] uppercase tracking-[0.2em] text-fg5">
                        {label}
                      </p>
                      <p className="mt-2 font-syne text-lg font-bold text-fg">{value}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {["Product Vision", "Team Lead", "EdTech"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-line px-2 py-1 font-dm text-[10px] uppercase tracking-wider text-fg3"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          </Tilt>

          <div className="mt-4 flex items-center justify-between font-dm text-[10px] uppercase tracking-[0.25em] text-fg5">
            <span>Featured / 01</span>
            <span className="flex items-center gap-1.5">
              <motion.span
                animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-1 w-1 rounded-full bg-accent"
              />
              Live
            </span>
          </div>
        </motion.aside>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-line bg-surface/70 backdrop-blur-sm">
        <div ref={marqueeRef} className="relative flex overflow-hidden py-4">
          {[0, 1].map((row) => (
            <motion.div
              key={row}
              className="flex shrink-0 items-center gap-12 pr-12 font-syne text-sm font-semibold uppercase tracking-wider text-fg4"
              animate={reduced || !marqueeInView ? undefined : { x: ["0%", "-100%"] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[...marqueeStack, ...marqueeStack].map((item, index) => (
                <span key={`${row}-${item}-${index}`} className="flex items-center gap-12">
                  {item}
                  <span className="text-accent-fg/60">+</span>
                </span>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1.6 }}
          style={{ opacity: heroOpacity }}
          className="absolute bottom-20 right-8 z-20 hidden flex-col items-center gap-2 md:flex"
        >
          <span className="font-dm text-[10px] uppercase tracking-[0.3em] text-fg5">
            Scroll
          </span>
          <motion.div
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-10 w-px bg-gradient-to-b from-accent to-transparent"
          />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function Stat({ children }: { children: ReactNode }) {
  return <span className="flex items-baseline gap-1.5">{children}</span>;
}

function CornerBracket({
  className,
  position,
  delay = 0,
}: {
  className?: string;
  position: "tl" | "tr" | "bl" | "br";
  delay?: number;
}) {
  const isTop = position.startsWith("t");
  const isLeft = position.endsWith("l");

  return (
    <motion.span
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`absolute hidden h-4 w-4 md:block ${className ?? ""}`}
    >
      <motion.span
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originX: isLeft ? 0 : 1 }}
        className={`absolute left-0 right-0 h-px bg-accent/40 ${isTop ? "top-0" : "bottom-0"
          }`}
      />
      <motion.span
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: delay + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ originY: isTop ? 0 : 1 }}
        className={`absolute bottom-0 top-0 w-px bg-accent/40 ${isLeft ? "left-0" : "right-0"
          }`}
      />
    </motion.span>
  );
}
