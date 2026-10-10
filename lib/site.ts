// تنظیمات مرکزی سایت — اینجا را ویرایش کن.
// برای محیط تولید، دامنه‌ی واقعی را در متغیر محیطی NEXT_PUBLIC_SITE_URL بگذار
// (یا همین مقدار پیش‌فرض را عوض کن).
export const SITE = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://javad-esmaeili.vercel.app",
  nameFa: "جواد اسماعیلی",
  nameEn: "Javad Esmaeili",
  roleFa: "توسعه‌دهنده بک‌اند",
  roleEn: "Backend Developer",
  github: "https://github.com/cs-esmaeili",
  email: "hello@example.com",
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
