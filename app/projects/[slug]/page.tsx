import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  CircleAlert,
  ExternalLink,
  Layers,
  Lock,
  Sparkles,
  Wrench,
} from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { PROJECTS, getProject } from "@/lib/projects";
import { asset, SITE } from "@/lib/site";

export const dynamicParams = false;

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return { title: "پروژه یافت نشد" };
  }

  return {
    title: project.name,
    description: project.desc,
    alternates: {
      canonical: `/projects/${project.slug}/`,
    },
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.nameEn}`,
      description: project.desc,
      url: `/projects/${project.slug}/`,
      ...(project.image
        ? {
            images: [
              {
                url: asset(project.image),
                width: 1200,
                height: 750,
                alt: `${project.name} — ${project.nameEn}`,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const nextProject = PROJECTS[(index + 1) % PROJECTS.length];

  const facts = [
    { icon: Sparkles, label: "نقش من", value: project.role },
    { icon: CalendarDays, label: "دوره", value: project.period },
    { icon: Building2, label: "محیط", value: project.company },
    { icon: Layers, label: "وضعیت", value: project.status },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    alternateName: project.nameEn,
    description: project.desc,
    ...(project.image
      ? { image: `${SITE.url}${asset(project.image)}` }
      : {}),
    keywords: project.tags.join(", "),
    creator: {
      "@type": "Person",
      name: SITE.nameFa,
      url: SITE.url,
    },
  };

  return (
    <main className="px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* سربرگ پروژه */}
        <div className="rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-1.5 text-muted transition-colors duration-200 hover:text-accent"
            >
              <ArrowRight className="h-3.5 w-3.5" />
              نمونه‌کارها
            </Link>
            <span className="text-slate-600">/</span>
            <span className="font-mono text-slate-300">{project.nameEn}</span>
          </div>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold text-foreground sm:text-5xl">
                  {project.name}
                </h1>
                {project.internal ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] text-muted">
                    <Lock className="h-3 w-3" />
                    پروژه داخلی
                  </span>
                ) : null}
              </div>

              <p className="mt-2 font-display text-sm uppercase tracking-[0.22em] text-muted">
                {project.nameEn}
              </p>

              <p className="mt-6 max-w-2xl text-base leading-9 text-slate-300">
                {project.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2/60 px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-green-400"
                >
                  مشاهده‌ی سایت
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}

              {project.repo ? (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                >
                  <GithubIcon className="h-4 w-4" />
                  سورس‌کد
                </a>
              ) : null}

              <Link
                href="/projects/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-surface/40 px-6 py-3 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
              >
                همه‌ی نمونه‌کارها
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-3 border-t border-border pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-2xl border border-border bg-background/40 p-4"
              >
                <div className="flex items-center gap-2 text-xs text-muted">
                  <fact.icon className="h-4 w-4 text-accent" />
                  {fact.label}
                </div>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-200">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* گالری */}
        {project.gallery?.length ? (
          <section className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                  Gallery
                </p>
                <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                  گالری تصاویر
                </h2>
              </div>
              <p className="max-w-md text-xs leading-6 text-muted">
                برای جابه‌جایی تصاویر، بکشید یا از کلیدهای جهت‌دار استفاده کنید.
              </p>
            </div>

            <div className="mt-6">
              <ProjectGallery items={project.gallery} />
            </div>
          </section>
        ) : null}

        {/* توضیحات و اطلاعات */}
        <div className="grid gap-8 lg:grid-cols-[1.65fr_1fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-10">
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Overview
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                درباره‌ی پروژه
              </h2>
              <div className="mt-6 space-y-5 text-base leading-9 text-muted">
                {project.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-10">
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Highlights
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                کارهایی که انجام دادم
              </h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-2xl border border-border bg-background/40 p-4"
                  >
                    <span className="mt-0.5 shrink-0 rounded-full bg-accent/10 p-1 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm leading-7 text-slate-300">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Project facts
              </p>
              <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-muted">نقش</dt>
                  <dd className="text-left leading-6 text-slate-200">
                    {project.role}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-muted">دوره</dt>
                  <dd className="text-left leading-6 text-slate-200">
                    {project.period}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                  <dt className="text-muted">محیط</dt>
                  <dd className="text-left leading-6 text-slate-200">
                    {project.company}
                  </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-muted">وضعیت</dt>
                  <dd className="text-left leading-6 text-slate-200">
                    {project.status}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-3xl border border-border bg-surface/40 p-6 backdrop-blur-xl">
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Stack
              </p>
              <h2 className="mt-2 text-lg font-semibold text-foreground">
                تکنولوژی‌ها
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-2/60 px-3 py-1 font-mono text-xs text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.url || project.repo ? (
              <div className="rounded-3xl border border-accent/25 bg-accent/5 p-6 backdrop-blur-xl">
                <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                  Links
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      <span className="inline-flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-accent" />
                        سایت پروژه
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}

                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      <span className="inline-flex items-center gap-2">
                        <GithubIcon className="h-4 w-4 text-accent" />
                        مخزن سورس‌کد
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        {/* چالش‌ها */}
        <section className="rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Challenges
              </p>
              <h2 className="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
                چالش‌ها و راه‌حل‌ها
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted">
              مسائلی که در مسیر ساخت این پروژه واقعاً وقت گرفتند و تصمیم‌هایی که
              برای حلشان گرفته شد.
            </p>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {project.challenges.map((challenge, challengeIndex) => (
              <article
                key={challenge.title}
                className="flex flex-col rounded-2xl border border-border bg-background/40 p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs text-accent">
                    {String(challengeIndex + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-accent/10 p-2 text-accent">
                    <Wrench className="h-4 w-4" />
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {challenge.title}
                </h3>

                <div className="mt-4 space-y-3 text-sm leading-7">
                  <div className="rounded-xl border border-red-400/15 bg-red-400/5 p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-red-300">
                      <CircleAlert className="h-4 w-4" />
                      چالش
                    </p>
                    <p className="mt-2 text-muted">{challenge.problem}</p>
                  </div>

                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-4">
                    <p className="flex items-center gap-2 text-xs font-semibold text-accent">
                      <Check className="h-4 w-4" />
                      راه‌حل
                    </p>
                    <p className="mt-2 text-slate-300">{challenge.solution}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* پروژه‌ی بعدی */}
        <Link
          href={`/projects/${nextProject.slug}/`}
          className="group flex flex-col gap-6 rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl transition-colors duration-200 hover:border-accent/40 sm:flex-row sm:items-center sm:justify-between sm:p-10"
        >
          <div>
            <p className="font-display text-xs font-medium uppercase tracking-widest text-accent">
              Next project
            </p>
            <p className="mt-2 text-2xl font-bold text-foreground">
              {nextProject.name}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-muted">
              {nextProject.desc}
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 group-hover:border-accent/50 group-hover:text-accent sm:self-auto">
            پروژه‌ی بعدی
            <ArrowLeft className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
