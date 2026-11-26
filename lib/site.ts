// مسیر پایه‌ی سایت. روی GitHub Pages برابر «/<نام-مخزن>» است و در build تزریق می‌شود.
// هنگام ارجاع به فایل‌های داخل public (مثل /icons/...) از asset() استفاده کن.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;

// تنظیمات مرکزی سایت — اینجا را ویرایش کن.
// برای محیط تولید، دامنه‌ی واقعی را در متغیر محیطی NEXT_PUBLIC_SITE_URL بگذار
// (یا همین مقدار پیش‌فرض را عوض کن).
// آدرس پایه باید بدون «/» انتهایی باشد تا ترکیب مسیرها در sitemap و JSON-LD
// هیچ‌وقت «//» تولید نکند.
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://cs-esmaeili.pages.dev"
).replace(/\/+$/, "");

export const SITE = {
  url: SITE_URL,
  nameFa: "جواد اسماعیلی",
  nameEn: "Javad Esmaeili",
  roleFa: "توسعه‌دهنده بک‌اند",
  roleEn: "Backend Developer",
  github: "https://github.com/cs-esmaeili",
  email: "cs.esmaeili@gmail.com",
  description:
    "جواد اسماعیلی (Javad Esmaeili)، توسعه‌دهنده نرم‌افزار و بک‌اند با تخصص در NestJS، TypeScript و طراحی سیستم‌های مقیاس‌پذیر. نمونه‌کارها، پروژه‌ها و تجربه‌های مهندسی نرم‌افزار.",
  skills: [
    "NestJS",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Prisma",
    "Drizzle",
    "Elasticsearch",
    "RabbitMQ",
    "Jenkins",
  ],
};
