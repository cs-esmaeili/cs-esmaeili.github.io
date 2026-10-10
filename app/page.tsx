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

// سایت‌هایی که ساخته‌ام — برای تغییر، همین آرایه را ویرایش کن.
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
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <span className="font-pixel text-xs text-accent">
          [ BACKEND DEVELOPER ]
        </span>
        <h1 className="mt-6 max-w-3xl text-3xl font-bold leading-snug text-foreground sm:text-5xl">
          سلام، من یک توسعه‌دهنده‌ی بک‌اند هستم.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-9 text-muted">
          با NestJS، TypeScript و دوستان، یک شبکه از تکنولوژی‌ها می‌سازم. اسکرول
          کن تا شبکه بچرخد و باز شود.
        </p>
        <p className="font-pixel mt-12 text-[11px] text-accent/70">
          SCROLL ↓
        </p>
      </section>

      <div className="pixel-divider mx-auto max-w-6xl" />

      {/* درباره من */}
      <section id="about" className="flex min-h-screen items-center px-6">
        <div className="mx-auto w-full max-w-2xl border-2 border-border bg-background/60 p-8 backdrop-blur-md">
          <span className="font-pixel text-[11px] text-accent">ABOUT</span>
          <h2 className="mt-3 text-2xl font-bold text-foreground">درباره من</h2>
          <p className="mt-4 leading-9 text-muted">
            اینجا یک متن ساده‌ی معرفی است. سیستم‌های بک‌اند مقیاس‌پذیر با NestJS
            می‌سازم و روی معماری، پایگاه‌داده و کارایی تمرکز دارم.
          </p>
        </div>
      </section>

      <div className="pixel-divider mx-auto max-w-6xl" />

      {/* مهارت‌ها */}
      <section id="skills" className="flex min-h-screen items-center px-6">
        <div className="mx-auto w-full max-w-2xl border-2 border-border bg-background/60 p-8 backdrop-blur-md">
          <span className="font-pixel text-[11px] text-accent">SKILLS</span>
          <h2 className="mt-3 text-2xl font-bold text-foreground">مهارت‌ها</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="font-pixel border-2 border-border bg-background/70 px-3 py-2 text-[11px] text-foreground"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="pixel-divider mx-auto max-w-6xl" />

      {/* کارها / سایت‌هایی که ساخته‌ام */}
      <section id="projects" className="flex min-h-screen flex-col justify-center px-6 py-24">
        <div className="mx-auto w-full max-w-6xl">
          <span className="font-pixel text-[11px] text-accent">PROJECTS</span>
          <h2 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
            سایت‌هایی که ساخته‌ام
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border-2 border-border bg-background/60 p-6 backdrop-blur-md transition-colors hover:border-accent"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-foreground">
                    {project.name}
                  </h3>
                  <span className="font-pixel text-[11px] text-muted transition-colors group-hover:text-accent">
                    ↗
                  </span>
                </div>
                <p className="mt-3 text-sm leading-8 text-muted">
                  {project.desc}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-pixel border border-border px-2 py-1 text-[10px] text-muted"
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

      <div className="pixel-divider mx-auto max-w-6xl" />

      {/* تماس */}
      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <span className="font-pixel text-[11px] text-accent">CONTACT</span>
        <h2 className="mt-3 text-3xl font-bold text-foreground sm:text-5xl">
          بیا با هم کار کنیم.
        </h2>
        <a
          href="mailto:hello@example.com"
          className="font-pixel mt-8 inline-block border-2 border-accent bg-accent px-6 py-3 text-[12px] text-background shadow-[4px_4px_0_0_#1e3a2b] transition-transform hover:-translate-y-0.5"
        >
          CONTACT ME
        </a>
      </section>
    </div>
  );
}
