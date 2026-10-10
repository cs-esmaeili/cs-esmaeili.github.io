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
      {/* هیرو — پشتش شبکه‌ی سه‌بعدی استک‌ها */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
          سلام، من یک توسعه‌دهنده‌ی بک‌اند هستم.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
          با NestJS، TypeScript و دوستان، یک شبکه از تکنولوژی‌ها می‌سازم. اسکرول
          کن تا شبکه بچرخد و باز شود.
        </p>
        <p className="mt-12 animate-bounce text-sm text-zinc-500">
          ↓ برای ادامه اسکرول کن
        </p>
      </section>

      {/* درباره من */}
      <section id="about" className="flex min-h-screen items-center px-6">
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-white">درباره من</h2>
          <p className="mt-4 leading-8 text-zinc-300">
            اینجا یک متن ساده‌ی معرفی است. سیستم‌های بک‌اند مقیاس‌پذیر با NestJS
            می‌سازم و روی معماری، پایگاه‌داده و کارایی تمرکز دارم.
          </p>
        </div>
      </section>

      {/* مهارت‌ها */}
      <section id="skills" className="flex min-h-screen items-center px-6">
        <div className="mx-auto w-full max-w-2xl rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold text-white">مهارت‌ها</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {SKILLS.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-zinc-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* تماس */}
      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <h2 className="text-3xl font-semibold text-white sm:text-5xl">
          بیا با هم کار کنیم.
        </h2>
        <a
          href="mailto:hello@example.com"
          className="mt-8 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
        >
          تماس با من
        </a>
      </section>
    </div>
  );
}
