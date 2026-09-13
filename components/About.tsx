"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FiLock, FiActivity, FiShield } from "react-icons/fi";
import CountUp from "./CountUp";
import ScrollReveal from "./ScrollReveal";

type Stat = {
  to: number;
  prefix?: string;
  suffix?: string;
  label: string;
};

// Every number here is one already stated (and evidenced) elsewhere on
// the page - reused for visual impact, never invented for this grid.
const stats: Stat[] = [
  { to: 1000, suffix: "+", label: "Staff served (Accion)" },
  { to: 95, suffix: "%", label: "Notification volume cut" },
  { to: 7, label: "Roles enforcing segregation of duties" },
  { to: 3, label: "Pentest findings remediated" },
];

const strengths = [
  {
    icon: FiShield,
    title: "Security-first engineering",
    text: "OAuth SSO, JWT, RBAC re-validated per request, rate limiting, and penetration-test remediation verified against the assessor's own reproduction steps.",
  },
  {
    icon: FiActivity,
    title: "Systems that audit themselves",
    text: "Timestamped stage transitions, durable outbox delivery, and state machines that make it possible to report on what happened and when, after the fact.",
  },
  {
    icon: FiLock,
    title: "Ships and owns it",
    text: "Backend owner on a live platform at a regulated bank serving 1,000+ staff. Not a prototype: production, with production consequences.",
  },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="bg-surface px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 flex items-center gap-4">
            <span className="font-dm text-xs uppercase tracking-widest text-accent-fg">
              01 / About
            </span>
            <div className="h-px max-w-xs flex-1 bg-line" />
          </div>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1.05fr,0.95fr]">
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 font-dm text-[11px] uppercase tracking-[0.22em] text-fg4">
                Lagos, Nigeria / Systems Engineering, UNILAG
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="max-w-4xl font-syne text-4xl font-extrabold leading-[1.02] text-fg md:text-6xl">
                I&apos;m a backend engineer who builds systems that hold up
                <span className="text-accent-fg"> under scrutiny, and under attempts to game them</span>.
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="grid gap-6 rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-8 shadow-[0_24px_70px_rgba(0,0,0,0.04)] md:grid-cols-[1.2fr,0.8fr]">
                <div className="space-y-5">
                  <p className="font-dm text-lg leading-relaxed text-fg3">
                    I&apos;m a Systems Engineering student at the <span className="text-fg">University of Lagos</span>, graduating in January 2027. I&apos;m drawn to the backend end of financial infrastructure: the parts that have to hold under load and can&apos;t quietly fail. My strongest tools are <span className="text-accent-fg">Java</span>, <span className="text-accent-fg">Spring Boot</span>, and <span className="text-accent-fg">PostgreSQL</span>, but the bigger value I bring is treating integrity as a first-class requirement, not an afterthought.
                  </p>
                  <p className="font-dm text-lg leading-relaxed text-fg3">
                    My work spans fintech, healthcare scheduling, EdTech, and marketplaces. In secondary school I was best student in Mathematics, Further Mathematics and Physics across my graduating cohort, probably where the instinct for exact answers started. Right now I&apos;m the backend owner on a live platform at a regulated bank, which is a faster way to learn what &quot;production&quot; actually means than any classroom.
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-line bg-surface/85 p-6">
                  <p className="font-dm text-[11px] uppercase tracking-[0.24em] text-fg5">
                    Value I bring
                  </p>
                  <div className="mt-5 space-y-4">
                    {["Segregation of duties", "Pentest remediation", "Database-level integrity", "Durable, async systems"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent-fg">
                          +
                        </span>
                        <span className="font-dm text-sm text-fg2">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 md:grid-cols-3">
              {strengths.map((item, index) => (
                <ScrollReveal key={item.title} delay={0.15 + index * 0.06}>
                  <div className="group h-full rounded-[1.5rem] border border-line bg-panel/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/35">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface text-accent-fg transition-colors group-hover:border-accent/40">
                      <item.icon size={18} />
                    </div>
                    <h3 className="mb-3 font-syne text-xl font-bold text-fg">
                      {item.title}
                    </h3>
                    <p className="font-dm text-sm leading-relaxed text-fg3">
                      {item.text}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <div ref={ref} className="grid grid-cols-2 gap-4 self-start">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08 + 0.2 }}
                className={`group relative overflow-hidden rounded-[1.75rem] border border-line bg-gradient-to-br from-panel to-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] ${
                  index % 2 === 1 ? "md:translate-y-10" : ""
                }`}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at top left, rgba(168, 85, 247,0.08), transparent 68%)",
                  }}
                />
                <div className="relative">
                  <p className="mb-2 font-dm text-[11px] uppercase tracking-[0.24em] text-fg5">
                    Evidence
                  </p>
                  <p className="mb-3 whitespace-nowrap font-syne text-2xl  font-extrabold tracking-tight text-accent-fg md:text-5xl md:tracking-normal">
                    <CountUp
                      to={stat.to}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={1.8}
                    />
                  </p>
                  <p className="font-dm text-sm text-fg4">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
