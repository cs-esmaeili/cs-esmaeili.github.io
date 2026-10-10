import type { Metadata } from "next";
import { Geist_Mono, Silkscreen, Vazirmatn } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SceneBackground from "@/components/scene/SceneBackground";
import "./globals.css";

const vazir = Vazirmatn({
  variable: "--font-fa",
  subsets: ["arabic", "latin"],
});

const pixel = Silkscreen({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "700"],
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
      className={`${vazir.variable} ${pixel.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
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
