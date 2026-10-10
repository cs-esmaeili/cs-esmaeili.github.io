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
