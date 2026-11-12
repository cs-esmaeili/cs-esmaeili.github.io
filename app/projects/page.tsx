import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, ArrowLeft, Lock } from "lucide-react";
import { PROJECTS } from "@/lib/projects";
import { asset } from "@/lib/site";

export const metadata: Metadata = {
  title: "نمونه‌کارها",
  description:
    "پروژه‌هایی که جواد اسماعیلی ساخته است؛ از سامانه‌های ERP و MIS و فروشگاه‌های اینترنتی تا پلتفرم‌های داده‌ی لحظه‌ای و پیام‌رسان بلادرنگ.",
  alternates: {
    canonical: "/projects/",
  },
};

export default function ProjectsPage() {
  return (
    <main className="px-6 pb-24 pt-28">
      <div className="mx-auto w-full max-w-6xl">
        {/* سربرگ صفحه */}
        <div className="rounded-3xl border border-border bg-surface/40 p-8 backdrop-blur-xl sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-sm font-medium uppercase tracking-widest text-accent">
                Projects
              </p>
              <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-5xl">
                نمونه‌کارها
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-9 text-muted">
                گزیده‌ای از پروژه‌هایی که در{" "}
                <strong className="font-semibold text-foreground">بهیدو</strong>{" "}
                و به‌صورت شخصی روی آن‌ها کار کرده‌ام؛ از سامانه‌های داخلی و
                فروشگاه‌های اینترنتی تا پلتفرم‌های داده‌ی لحظه‌ای. برای پروژه‌های
                داخلی شرکت، تصویر معرفی طراحی شده است.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-surface/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-200 hover:border-accent/50 hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" />
              بازگشت به خانه
            </Link>
          </div>
        </div>

        {/* شبکه‌ی پروژه‌ها */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {PROJECTS.map((project) => {
            const href = project.url ?? null;

            return (
              <article
                key={project.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 backdrop-blur-xl transition-colors duration-200 hover:border-accent/40"
              >
                {project.image ? (
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="relative block aspect-[16/10] overflow-hidden border-b border-border bg-background"
                  >
                    <Image
                      src={asset(project.image)}
                      alt={`${project.nameEn} — ${project.name}`}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      unoptimized
                      className={
                        project.imageFit === "contain"
                          ? "object-contain"
                          : "object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      }
                    />
                    {project.internal && (
                      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] text-muted backdrop-blur">
                        <Lock className="h-3 w-3" />
                        پروژه داخلی
                      </span>
                    )}
                  </Link>
                ) : null}

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        <Link
                          href={`/projects/${project.slug}/`}
                          className="transition-colors duration-200 hover:text-accent"
                        >
                          {project.name}
                        </Link>
                      </h2>
                      <p className="mt-1 font-mono text-xs text-muted">
                        {project.nameEn} · {project.period}
                      </p>
                    </div>

                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`مشاهده‌ی ${project.name}`}
                        className="rounded-full border border-border p-2 text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {project.desc}
                  </p>

                  <p className="mt-4 text-xs text-slate-500">{project.role}</p>

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

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
                    <Link
                      href={`/projects/${project.slug}/`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent transition-colors duration-200 hover:text-green-400"
                    >
                      جزئیات پروژه
                      <ArrowLeft className="h-3.5 w-3.5" />
                    </Link>
                    <span className="text-xs text-slate-500">{project.status}</span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* فراخوان پایانی */}
        <div className="mt-8 flex flex-col items-center gap-5 rounded-3xl border border-accent/25 bg-accent/5 p-10 text-center backdrop-blur-xl">
          <p className="max-w-lg text-base leading-9 text-slate-200">
            پروژه‌ی بعدی می‌تواند مال شما باشد. اگر به یک{" "}
            <span className="font-semibold text-accent">توسعه‌دهنده بک‌اند</span>{" "}
            نیاز دارید، بیایید درباره‌اش صحبت کنیم.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 hover:bg-green-400"
          >
            تماس با من
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
