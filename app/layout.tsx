import type { Metadata, Viewport } from "next";
import { Geist_Mono, Space_Grotesk, Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import SceneBackground from "@/components/scene/SceneBackground";
import { SITE } from "@/lib/site";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-fa",
  subsets: ["arabic", "latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${SITE.nameFa} | ${SITE.nameEn} — ${SITE.roleFa}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: title,
    template: `%s | ${SITE.nameEn}`,
  },
  description: SITE.description,
  applicationName: SITE.nameEn,
  authors: [{ name: SITE.nameFa, url: SITE.url }],
  creator: SITE.nameFa,
  publisher: SITE.nameFa,
  category: "technology",
  keywords: [
    "جواد اسماعیلی",
    "جواد اسماعیلى",
    "Javad Esmaeili",
    "javad esmaeili",
    "javad esamaeili",
    "Javad Esmaeili backend",
    "توسعه‌دهنده بک‌اند",
    "برنامه‌نویس بک‌اند",
    "برنامه‌نویس",
    "NestJS",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Backend Developer",
    "Software Engineer",
  ],
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
    type: "website",
    locale: "fa_IR",
    alternateLocale: ["en_US"],
    url: SITE.url,
    siteName: SITE.nameEn,
    title,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE.url}/#person`,
      name: SITE.nameFa,
      alternateName: ["Javad Esmaeili", "javad esmaeili", "Javad Esamaeili"],
      url: SITE.url,
      jobTitle: SITE.roleEn,
      description: SITE.description,
      email: `mailto:${SITE.email}`,
      knowsAbout: SITE.skills,
      knowsLanguage: ["fa", "en"],
      sameAs: [SITE.github],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: `${SITE.nameEn} — ${SITE.roleEn}`,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE.url}/#person` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${grotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-foreground">
        <SceneBackground />
        <div className="relative z-10 flex flex-1 flex-col">
          <Header />
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
