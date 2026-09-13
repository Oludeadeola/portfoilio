"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { getEmail } from "@/lib/contact";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const email = getEmail();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-0"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={`flex items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 md:px-6 ${
            scrolled
              ? "border-line bg-surface/82 shadow-[0_14px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#" className="flex items-center gap-3" data-cursor-hover>
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-panel font-syne text-lg font-bold text-fg">
              A
            </span>
            <span className="hidden sm:block">
              <span className="block font-syne text-base font-bold tracking-tight text-fg">
                Adeola Olude
              </span>
              <span className="block font-dm text-[10px] uppercase tracking-[0.24em] text-fg5">
                Backend Engineer
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center gap-1 rounded-full border border-line bg-panel/70 px-2 py-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-cursor-hover
                  className="rounded-full px-4 py-2 font-dm text-sm text-fg3 transition-all duration-200 hover:bg-accent/10 hover:text-accent-fg"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="ml-2 flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-2 font-dm text-[10px] uppercase tracking-[0.22em] text-accent-fg xl:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Open to Opportunities
              </span>
              <ThemeToggle />
              <a
                href={`mailto:${email}`}
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-dm text-sm font-medium text-black transition-all duration-200 hover:bg-[#9333EA]"
              >
                Get in Touch
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-full border border-line bg-panel"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-fg"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-5 bg-fg"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-5 bg-fg"
              />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 overflow-hidden rounded-3xl border border-line bg-surface/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:hidden"
            >
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl border border-transparent px-4 py-3 font-dm text-fg2 transition-all hover:border-line hover:bg-panel"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-5 py-3 font-dm text-sm font-medium text-black"
                >
                  Get in Touch
                  <FiArrowUpRight size={16} />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
