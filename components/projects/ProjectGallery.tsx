"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import type { ProjectGalleryItem } from "@/lib/projects";
import { asset } from "@/lib/site";

import "swiper/css";
import "swiper/css/a11y";

type ProjectGalleryProps = {
  items: ProjectGalleryItem[];
};

export default function ProjectGallery({ items }: ProjectGalleryProps) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [state, setState] = useState({
    active: 0,
    count: items.length,
    isBeginning: true,
    isEnd: items.length <= 1,
    progress: 0,
  });

  const sync = (swiper: SwiperClass) => {
    // با slidesPerView اعشاری، activeIndex در آخرین اسلاید ممکن است از
    // slides.length - 1 عقب‌تر بماند؛ در حالت پایان، نوار را کامل می‌کنیم.
    const active = swiper.isEnd
      ? Math.max(swiper.slides.length - 1, 0)
      : swiper.activeIndex;
    const progress = (active + 1) / Math.max(swiper.slides.length, 1);

    setState({
      active,
      count: swiper.slides.length,
      isBeginning: swiper.isBeginning,
      isEnd: swiper.isEnd,
      progress,
    });
  };

  return (
    <div>
      <Swiper
        modules={[A11y, Keyboard]}
        spaceBetween={16}
        slidesPerView={1.04}
        breakpoints={{
          640: { slidesPerView: 1.15 },
          1024: { slidesPerView: 1.55 },
        }}
        keyboard={{ enabled: true }}
        a11y={{
          enabled: true,
          prevSlideMessage: "اسلاید قبلی",
          nextSlideMessage: "اسلاید بعدی",
          paginationBulletMessage: "رفتن به اسلاید {{index}}",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          sync(swiper);
        }}
        onSlideChange={sync}
        onReachBeginning={sync}
        onReachEnd={sync}
        onProgress={sync}
        onResize={sync}
        className="!pb-1"
      >
        {items.map((item, index) => (
          <SwiperSlide key={`${item.src}-${index}`} className="!h-auto">
            <figure className="h-full overflow-hidden rounded-2xl border border-border bg-background">
              <div className="relative aspect-[16/10]">
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, 100vw"
                  unoptimized
                  className={item.fit === "contain" ? "object-contain" : "object-cover"}
                />
              </div>
              <figcaption className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-xs text-muted">
                <span>{item.caption}</span>
                <span className="shrink-0 font-mono text-slate-500">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </span>
              </figcaption>
            </figure>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={state.isBeginning}
            aria-label="اسلاید قبلی"
            className="rounded-full border border-border p-2 text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:text-muted"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={state.isEnd}
            aria-label="اسلاید بعدی"
            className="rounded-full border border-border p-2 text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:text-muted"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <div className="flex flex-1 items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2/60">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{
                width: `${Math.max(state.progress, 0.02) * 100}%`,
              }}
            />
          </div>
          <span className="shrink-0 font-mono text-xs text-muted">
            {String(Math.min(state.active + 1, state.count)).padStart(2, "0")}{" "}
            / {String(state.count).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
