import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk, Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SceneBackground from "@/components/scene/SceneBackground";
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

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio",
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
          <Footer />
        </div>
      </body>
    </html>
  );
}
