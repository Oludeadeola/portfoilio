"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import ScrollReveal from "./ScrollReveal";
import { getEmail, getPhoneDisplay, getPhoneHref } from "@/lib/contact";

const collaborationPoints = [
  "Backend-heavy full-stack engineer, currently interning at Accion Microfinance Bank",
  "Systems Engineering student at the University of Lagos, graduating January 2027",
  "Always happy to talk backend systems, security, and integrity-first engineering",
];

export default function Contact() {
  const email = getEmail();
  const phoneDisplay = getPhoneDisplay();
  const phoneHref = getPhoneHref();

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: phoneDisplay,
      href: `tel:${phoneHref}`,
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "adeola-olude",
      href: "https://www.linkedin.com/in/adeola-olude-11a366238/",
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "Oludeadeola",
      href: "https://github.com/Oludeadeola",
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: "Lagos, Nigeria",
      href: null,
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot — must stay empty
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Could not send message.");
      }

      setStatus("sent");
      setFormData({ name: "", email: "", subject: "", message: "", company: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="bg-surface px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="mb-16 flex items-center gap-4">
            <span className="font-dm text-xs uppercase tracking-widest text-accent-fg">
              04 / Contact
            </span>
            <div className="h-px max-w-xs flex-1 bg-line" />
          </div>
        </ScrollReveal>

        <div className="grid gap-16 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/70 px-4 py-2 font-dm text-[11px] uppercase tracking-[0.22em] text-fg4">
                Let&apos;s talk
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2 className="max-w-xl font-syne text-4xl font-extrabold leading-tight text-fg md:text-5xl">
                Want to talk backend systems, security, or
                <span className="text-accent-fg"> where something might break</span>?
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <p className="max-w-xl font-dm text-lg leading-relaxed text-fg3">
                I&apos;m a student and backend engineer based in Lagos, currently
                interning at Accion Microfinance Bank. Happy to talk about
                internships, backend roles, or just trade notes on system
                design and security.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="font-dm text-[11px] uppercase tracking-[0.22em] text-fg5">
                      Right now
                    </p>
                    <p className="mt-2 font-syne text-2xl font-bold text-fg">
                      Interning, and open to more
                    </p>
                  </div>
                  <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-2 font-dm text-[10px] uppercase tracking-[0.22em] text-accent-fg">
                    Lagos, Nigeria
                  </span>
                </div>

                <div className="space-y-4">
                  {collaborationPoints.map((point) => (
                    <div key={point} className="flex items-start gap-3">
                      <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-xs text-accent-fg">
                        +
                      </span>
                      <p className="font-dm text-sm leading-relaxed text-fg3">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((item, index) => (
                <ScrollReveal key={item.label} delay={0.2 + index * 0.05}>
                  <div className="group flex h-full items-start gap-4 rounded-[1.5rem] border border-line bg-panel/80 p-5 transition-all duration-200 hover:border-accent/35">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-accent-fg transition-colors group-hover:border-accent/40">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="mb-1 font-dm text-[11px] uppercase tracking-[0.2em] text-fg5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-dm text-sm text-fg2 transition-colors hover:text-accent-fg"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-dm text-sm text-fg2">{item.value}</p>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          <ScrollReveal delay={0.2} direction="left">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel to-surface p-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)]"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(168, 85, 247,0.08), transparent 55%)",
                }}
              />

              <div className="relative space-y-5">
                <div className="mb-2">
                  <p className="font-dm text-[11px] uppercase tracking-[0.22em] text-fg5">
                    Get in touch
                  </p>
                  <h3 className="mt-2 font-syne text-3xl font-bold text-fg">
                    Start the conversation
                  </h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block font-dm text-xs uppercase tracking-wider text-fg4">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-line bg-surface/85 px-4 py-3 font-dm text-sm text-fg placeholder:text-fg5 focus:border-accent/60 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block font-dm text-xs uppercase tracking-wider text-fg4">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full rounded-2xl border border-line bg-surface/85 px-4 py-3 font-dm text-sm text-fg placeholder:text-fg5 focus:border-accent/60 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-dm text-xs uppercase tracking-wider text-fg4">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="Internship, backend role, or just saying hi..."
                    className="w-full rounded-2xl border border-line bg-surface/85 px-4 py-3 font-dm text-sm text-fg placeholder:text-fg5 focus:border-accent/60 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-dm text-xs uppercase tracking-wider text-fg4">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me what you are building, your timeline, and the kind of help you need."
                    className="w-full resize-none rounded-2xl border border-line bg-surface/85 px-4 py-3 font-dm text-sm text-fg placeholder:text-fg5 focus:border-accent/60 focus:outline-none"
                  />
                </div>

                {/* Honeypot: hidden from humans, catches spam bots */}
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />

                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent py-3.5 font-dm font-medium text-black transition-colors duration-200 hover:bg-[#9333EA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="h-4 w-4 rounded-full border-2 border-black/30 border-t-black"
                      />
                      Sending...
                    </>
                  ) : status === "sent" ? (
                    <>Message sent. I will be in touch soon.</>
                  ) : (
                    <>
                      Send Message
                      <FiSend size={15} />
                    </>
                  )}
                </motion.button>

                {status === "error" && (
                  <p className="text-center font-dm text-sm text-red-500">
                    {errorMessage ||
                      "Something went wrong. Please try again or email directly."}
                  </p>
                )}
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
