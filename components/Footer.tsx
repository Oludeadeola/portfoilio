"use client";

import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { getEmail } from "@/lib/contact";

export default function Footer() {
  const year = new Date().getFullYear();
  const email = getEmail();

  return (
    <footer className="border-t border-line bg-surface px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <a href="#" className="inline-flex items-center gap-3" data-cursor-hover>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface font-syne text-lg font-bold text-fg">
                A
              </span>
              <span>
                <span className="block font-syne text-xl font-bold tracking-tight text-fg">
                  Adeola Olude
                </span>
                <span className="block font-dm text-[10px] uppercase tracking-[0.24em] text-fg5">
                  Backend Engineer
                </span>
              </span>
            </a>

            <p className="mt-5 font-dm text-sm leading-relaxed text-fg3">
              Systems Engineering student at the University of Lagos,
              graduating January 2027. Backend owner on a live platform at a
              regulated bank. Open to backend and full-stack roles.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <div className="flex items-center gap-3">
              {[
                {
                  href: "https://github.com/Oludeadeola",
                  label: "GitHub",
                  icon: FiGithub,
                },
                {
                  href: "https://www.linkedin.com/in/adeola-olude-11a366238/",
                  label: "LinkedIn",
                  icon: FiLinkedin,
                },
                {
                  href: `mailto:${email}`,
                  label: "Email",
                  icon: FiMail,
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-fg4 transition-all duration-200 hover:border-accent/40 hover:text-accent-fg"
                  aria-label={item.label}
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>

            <p className="font-dm text-xs text-fg5 md:text-right">
              Copyright {year} Adeola Olude. Built in Lagos, Nigeria.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
