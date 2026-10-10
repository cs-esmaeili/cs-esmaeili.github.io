import { ArrowUpRight, ChevronDown, Mail, MapPin } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

const SKILLS = [
  "NestJS",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Prisma",
  "GraphQL",
];

const PROJECTS = [
  {
    name: "فروشگاه آنلاین",
    desc: "یک فروشگاه اینترنتی با پنل مدیریت و درگاه پرداخت.",
    url: "https://example.com",
    tags: ["Next.js", "NestJS", "PostgreSQL"],
  },
  {
    name: "پلتفرم رزرو",
    desc: "سیستم نوبت‌دهی و رزرو آنلاین برای کسب‌وکارها.",
    url: "https://example.com",
    tags: ["React", "NestJS", "Redis"],
  },
  {
    name: "داشبورد تحلیلی",
    desc: "داشبورد گزارش‌گیری با نمودارهای زنده و API اختصاصی.",
    url: "https://example.com",
    tags: ["TypeScript", "Docker"],
  },
  {
    name: "اپلیکیشن محتوا",
    desc: "پلتفرم انتشار محتوا با احراز هویت و اشتراک ویژه.",
    url: "https://example.com",
    tags: ["Next.js", "Prisma"],
  },
  {
    name: "سرویس ابری",
    desc: "یک API عمومی برای سرویس‌های ابری با محدودیت نرخ.",
    url: "https://example.com",
    tags: ["NestJS", "GraphQL"],
  },
  {
    name: "چت آنی",
    desc: "پیام‌رسان بلادرنگ با WebSocket و صف پیام.",
    url: "https://example.com",
    tags: ["Node.js", "Redis"],
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* هیرو */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* هاله‌ی ملایم برای خوانایی متن روی انیمیشن */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,23,42,0.92)_0%,rgba(15,23,42,0.55)_50%,rgba(15,23,42,0.2)_78%)]"
        />

        <div className="relative flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            آماده‌ی همکاری
          </div>

          <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-[1.12] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            توسعه‌دهنده‌ی{" "}
            <span className="bg-[linear-gradient(to_left,#22c55e,#86efac)] bg-clip-text text-transparent">
              بک‌اند
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-slate-300">
            با NestJS، TypeScript و دوستان، سیستم‌های مقیاس‌پذیر و قابل اتکا
            می‌سازم.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-background shadow-lg shadow-accent/20 transition-colors duration-200 hover:bg-green-400"
            >
              مشاهده‌ی نمونه‌کارها
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/40 px-7 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              تماس با من
            </a>
          </div>
        </div>

        {/* نشانگر اسکرول */}
        <a
          href="#about"
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs text-muted transition-colors duration-200 hover:text-accent"
        >
          <span>اسکرول برای ادامه</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </a>
      </section>

      {/* درباره من */}
      <section id="about" className="flex min-h-screen items-center px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            About
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-4xl">
            درباره‌ی من
          </h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
              <h3 className="font-semibold text-foreground">تمرکز من</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                طراحی و پیاده‌سازی APIها و سرویس‌های بک‌اند با معماری تمیز و
                مقیاس‌پذیر.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
              <h3 className="font-semibold text-foreground">تجربه</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                کار با پایگاه‌داده‌های رابطه‌ای، کش، صف پیام و زیرساخت‌های
                ابری.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
              <h3 className="font-semibold text-foreground">ارزش‌ها</h3>
              <p className="mt-3 text-sm leading-7 text-muted">
                کد تمیز، تست‌پذیری و عملکرد. چیزی که می‌سازم باید قابل اتکا
                باشد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* مهارت‌ها */}
      <section id="skills" className="flex min-h-screen items-center px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            Skills
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-4xl">
            مهارت‌ها
          </h2>

          <div className="mt-10 flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-border bg-surface/50 px-4 py-2 font-mono text-sm text-slate-200 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* نمونه‌کارها */}
      <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
            Projects
          </p>
          <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-4xl">
            سایت‌هایی که ساخته‌ام
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex cursor-pointer flex-col rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-xl transition-colors duration-200 hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {project.name}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted transition-colors duration-200 group-hover:text-accent" />
                </div>
                <p className="mt-3 text-sm leading-7 text-muted">
                  {project.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-2/60 px-3 py-1 font-mono text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* تماس */}
      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
          Contact
        </p>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-5xl">
          بیا با هم کار کنیم.
        </h2>
        <p className="mt-5 max-w-md text-muted">
          پروژه‌ای در ذهن داری؟ خوشحال می‌شوم بشنوم.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-green-400"
          >
            <Mail className="h-4 w-4" />
            hello@example.com
          </a>
        </div>

        <div className="mt-10 flex items-center gap-4 text-muted">
          <a
            href="https://github.com/cs-esmaeili"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-3 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <span className="inline-flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4" />
            ایران
          </span>
        </div>
      </section>
    </div>
  );
}
