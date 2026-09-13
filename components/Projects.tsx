"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useState } from "react";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";

type Project = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  stats: { value: string; label: string }[];
  category: string;
  stage: string;
  tone: string;
  liveUrl: string | null;
  repoUrl: string | null;
  image: string;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Accion Innovation Hub",
    description:
      "A live internal platform at Accion Microfinance Bank, replacing a manual, email-driven idea review process with a structured digital pipeline: multi-stage submission, a six-criteria scoring engine, and a four-stage review pipeline with timestamped decisions. Seven roles enforce segregation of duties, re-validated against the database on every request rather than trusted from the token. I remediated every finding from an independent penetration test and caught a scoring-integrity flaw during internal review that would have let a partial score set register as a maximum rating.",
    tags: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "RBAC"],
    stats: [
      { value: "1,000+", label: "Staff Served" },
      { value: "95%", label: "Notification Cut" },
      { value: "7", label: "Roles Secured" },
    ],
    category: "Fintech / Internal Platform",
    stage: "Live Production",
    tone: "Backend owner, regulated bank",
    liveUrl: null,
    repoUrl: null,
    image: "",
  },
  {
    number: "02",
    title: "Medicare",
    description:
      "A Django REST API behind a doctor-booking product: appointment scheduling, real-time availability tracking, and a searchable practitioner directory. Patients and doctors run through separate authentication flows with enforced data isolation between user types, and the appointment lifecycle is protected by database-level constraints that make double-booking a doctor's schedule structurally impossible, not just logically avoided.",
    tags: ["Django REST Framework", "PostgreSQL", "RBAC"],
    stats: [
      { value: "DB-level", label: "Booking Constraints" },
      { value: "2", label: "Isolated Auth Flows" },
      { value: "Team", label: "Backend Role" },
    ],
    category: "Healthcare",
    stage: "Collaborative Build",
    tone: "Backend engineer, team project",
    liveUrl: null,
    repoUrl: null,
    image: "",
  },
  {
    number: "03",
    title: "Dolearn",
    description:
      "Dolearn matches students with tutors. I set the product vision and technical direction, own architecture decisions and sprint delivery, and coordinate the backend, frontend and design work across the team: the leadership counterpart to the individual-contributor depth on the other projects here.",
    tags: ["Product Vision", "Architecture", "EdTech"],
    stats: [
      { value: "Lead", label: "Role" },
      { value: "Live", label: "Status" },
      { value: "EdTech", label: "Category" },
    ],
    category: "EdTech",
    stage: "Live Product",
    tone: "Team lead & vision owner",
    liveUrl: "https://dolearnn.com",
    repoUrl: null,
    image: "/dolearnn.png",
  },
  {
    number: "04",
    title: "WasteFlow",
    description:
      "A negotiation-based marketplace connecting waste generators, middlemen and recyclers: list a quantity of waste, field offers, negotiate a price, close the deal. Built at a hackathon with a small team: a React/TypeScript frontend on Vercel talking to a Django backend on Render, Postgres via Supabase, and JWT auth with a refresh-token flow. I worked on the backend.",
    tags: ["Django", "React", "TypeScript", "PostgreSQL", "Supabase"],
    stats: [
      { value: "Hackathon", label: "Origin" },
      { value: "Backend", label: "My Role" },
      { value: "Live", label: "Status" },
    ],
    category: "Marketplace",
    stage: "Hackathon Build",
    tone: "Backend engineer, team",
    liveUrl: "https://wasteflow-two.vercel.app",
    repoUrl: "https://github.com/TEAM-WASTE-FLOW/frontendnew",
    image: "/waste.png",
  },
  {
    number: "05",
    title: "Devupshot",
    description:
      "A learning management system: course creation, instructor dashboards, and platform-level configuration that let admins and instructors manage courses, track learning activity, and run structured online education from a single dashboard-driven system. Built with a small team; I worked on the Node.js backend and helped shape the product vision, from the course lifecycle to the role structure across the platform.",
    tags: ["Node.js", "React", "LMS"],
    stats: [
      { value: "LMS", label: "Platform" },
      { value: "Backend", label: "My Role" },
      { value: "Live", label: "Status" },
    ],
    category: "EdTech",
    stage: "Live Product",
    tone: "Backend engineer & vision lead",
    liveUrl: "https://educrat-rho.vercel.app",
    repoUrl: null,
    image: "/devupshot.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden bg-surface px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-10 h-80 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_68%)] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-6 flex items-center gap-4">
            <span className="font-dm text-xs uppercase tracking-widest text-accent-fg">
              03 / Projects
            </span>
            <div className="h-px max-w-xs flex-1 bg-line" />
          </div>
        </ScrollReveal>

        <div className="mb-16 grid gap-8 lg:grid-cols-[0.9fr,1.1fr] lg:items-end">
          <div>
            <ScrollReveal>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 font-dm text-[11px] uppercase tracking-[0.22em] text-fg4">
                Systems, not just screens
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <h2 className="font-syne text-4xl font-extrabold leading-tight text-fg md:text-5xl">
                Selected work that holds up
                <span className="text-accent-fg"> under load, and under scrutiny</span>
              </h2>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.12}>
            <div className="rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-6">
              <p className="font-dm text-sm leading-relaxed text-fg3">
                Accion is production work at a regulated bank, which is why it
                carries no public link, and why the writing below carries more
                of the technical weight instead. Everything else here is real,
                shipped, and linked where a link exists.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <ScrollReveal key={project.title} delay={idx * 0.08}>
              <ProjectCard project={project} index={idx} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-14 text-center">
            <a
              href="https://github.com/Oludeadeola"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-5 py-3 font-dm text-sm text-fg3 transition-all duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-accent-fg"
            >
              More on GitHub
              <FiExternalLink className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247,0.14), transparent 72%)`;

  // Live link outranks repo link in prominence; a project with neither
  // (Accion, by design — internal to a regulated bank) gets no link row
  // at all rather than a disabled placeholder or an apologetic label.
  const linkUrl = project.liveUrl ?? project.repoUrl;
  const linkLabel = project.liveUrl
    ? `Visit ${project.title}`
    : project.repoUrl
    ? "View repository"
    : null;
  const linkRowLabel = project.liveUrl ? "Live Site" : project.repoUrl ? "Source" : null;

  // Prefer a curated local screenshot (in /public); fall back to a live
  // thum.io capture when there's a live URL but no local image.
  const preview = project.image
    ? project.image
    : project.liveUrl
    ? `https://image.thum.io/get/width/1200/crop/675/noanimate/${project.liveUrl}`
    : null;
  const displayUrl = linkUrl
    ? linkUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : project.category;
  const showImage = Boolean(preview) && !imgError;
  const imageOnLeft = index % 2 === 1;

  return (
    <motion.article
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      className={`group relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-8 shadow-[0_24px_70px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_32px_90px_rgba(0,0,0,0.08)] md:p-10 ${
        index % 2 === 1 ? "lg:ml-12" : "lg:mr-12"
      }`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: spotlight, opacity: hovered ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        animate={hovered ? { opacity: 1, scale: 1 } : { opacity: 0.6, scale: 0.92 }}
        transition={{ duration: 0.35 }}
        className="absolute -right-16 -top-16 h-52 w-52 rounded-full border border-accent/15"
      />
      <motion.div
        aria-hidden
        animate={hovered ? { opacity: 1, x: 0 } : { opacity: 0.55, x: -14 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-x-10 top-24 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
      />

      <div className="relative z-10 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        {/* Text column */}
        <div className={imageOnLeft ? "lg:order-2" : "lg:order-1"}>
          <div className="mb-5 flex items-center gap-4">
            <span className="font-syne text-4xl font-extrabold leading-none text-line-strong transition-colors duration-300 group-hover:text-accent/40 md:text-5xl">
              {project.number}
            </span>
            <div>
              <p className="font-dm text-[11px] uppercase tracking-[0.22em] text-fg5">
                {project.stage}
              </p>
              <p className="mt-0.5 font-dm text-sm text-fg3">{project.tone}</p>
            </div>
          </div>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h3 className="font-syne text-3xl font-bold text-fg transition-colors duration-300 group-hover:text-accent-fg md:text-4xl">
              {project.title}
            </h3>
            <span className="rounded-full border border-line px-3 py-1 font-dm text-xs text-fg4">
              {project.category}
            </span>
          </div>

          <p className="mb-8 font-dm text-base leading-relaxed text-fg3 md:text-lg">
            {project.description}
          </p>

          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {project.stats.map((stat, statIndex) => (
              <motion.div
                key={stat.label}
                animate={hovered ? { y: -2 } : { y: 0 }}
                transition={{ duration: 0.24, delay: statIndex * 0.04 }}
                className="rounded-[1.35rem] border border-line/80 bg-surface/70 p-4"
              >
                <p className="font-syne text-2xl font-bold text-fg">{stat.value}</p>
                <p className="mt-1 font-dm text-xs uppercase tracking-[0.2em] text-fg5">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-dm text-xs text-accent-fg"
              >
                {tag}
              </span>
            ))}
          </div>

          {linkUrl && linkLabel && (
            <div className="flex flex-wrap items-center gap-3 border-t border-line/70 pt-6">
              <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-fg5">
                {linkRowLabel}
              </span>
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={linkLabel}
                className="group/link inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-dm text-xs uppercase tracking-[0.18em] text-accent-fg transition-all duration-200 hover:border-accent hover:bg-accent hover:text-black"
              >
                {linkLabel}
                <FiExternalLink
                  className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  size={14}
                />
              </a>
            </div>
          )}
        </div>

        {/* Preview column */}
        <PreviewFrame
          as={linkUrl ? "a" : "div"}
          href={linkUrl ?? undefined}
          ariaLabel={linkLabel ?? project.title}
          className={imageOnLeft ? "lg:order-1" : "lg:order-2"}
        >
          <div className="flex items-center gap-2 border-b border-line/70 bg-panel/80 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 truncate font-dm text-[10px] tracking-wide text-fg5">
              {displayUrl}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-panel">
            {showImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview as string}
                  alt={`Screenshot of the ${project.title} website`}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface/90 opacity-0 shadow-sm transition-opacity duration-300 group-hover:opacity-100">
                  <FiArrowRight className="text-accent-fg" size={16} />
                </span>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-syne text-6xl font-extrabold text-line-strong">
                  {project.number}
                </span>
                <span className="font-dm text-[11px] uppercase tracking-[0.22em] text-fg5">
                  {project.category}
                </span>
              </div>
            )}
          </div>
        </PreviewFrame>
      </div>
    </motion.article>
  );
}

function PreviewFrame({
  as,
  href,
  ariaLabel,
  className,
  children,
}: {
  as: "a" | "div";
  href?: string;
  ariaLabel: string;
  className?: string;
  children: React.ReactNode;
}) {
  const shared =
    "relative block overflow-hidden rounded-[1.5rem] border border-line shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-300 group-hover:border-accent/40";

  if (as === "a") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={`${shared} ${className ?? ""}`}
      >
        {children}
      </a>
    );
  }

  return <div className={`${shared} ${className ?? ""}`}>{children}</div>;
}
