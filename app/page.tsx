import { ArrowUpRight, Mail, MapPin } from "lucide-react";

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
      <section className="flex min-h-screen items-center px-6">
        <div className="w-full max-w-2xl rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
            آماده‌ی همکاری
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-6xl">
            توسعه‌دهنده‌ی{" "}
            <span className="text-accent">بک‌اند</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-9 text-muted">
            با NestJS، TypeScript و دوستان، سیستم‌های مقیاس‌پذیر و قابل اتکا
            می‌سازم.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-green-400"
            >
              مشاهده‌ی نمونه‌کارها
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              تماس با من
            </a>
          </div>
        </div>
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
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border p-3 transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
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
