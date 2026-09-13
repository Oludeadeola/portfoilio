import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

const siteTitle = "Adeola Olude | Backend-Heavy Full-Stack Engineer";
const siteDescription =
  "Backend-heavy full-stack engineer building systems that cannot be gamed: segregation of duties, penetration-test remediation, and database-level integrity constraints.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Adeola Olude",
  },
  description: siteDescription,
  applicationName: "Adeola Olude Portfolio",
  keywords: [
    "Adeola Olude",
    "Backend Engineer",
    "Full-Stack Engineer",
    "Software Engineer",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "PostgreSQL",
    "Lagos Backend Engineer",
    "Nigeria Software Engineer",
    "Portfolio Website",
  ],
  authors: [{ name: "Adeola Olude" }],
  creator: "Adeola Olude",
  publisher: "Adeola Olude",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "Adeola Olude Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adeola Olude, backend-heavy full-stack engineer portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.png"],
  },
};

// No-flash theme bootstrap — runs before paint to apply persisted theme.
// Default is light; only adds the `dark` class when the user has opted in.
const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch(e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Adeola Olude",
    jobTitle: "Backend-Heavy Full-Stack Engineer",
    description: siteDescription,
    url: siteUrl,
    // Email/phone deliberately omitted here -
    // JSON-LD is meant to be crawler-readable by design, which cuts
    // against keeping contact details out of plain-text scraping reach.
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lagos",
      addressCountry: "NG",
    },
    sameAs: [
      "https://github.com/Oludeadeola",
      "https://www.linkedin.com/in/adeola-olude-11a366238/",
      "https://dolearnn.com/",
    ],
    knowsAbout: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Backend Engineering",
      "System Security",
      "Database Design",
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Adeola Olude Portfolio",
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
