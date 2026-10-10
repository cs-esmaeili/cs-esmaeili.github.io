import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// A route handler at `/og.png` (instead of the `opengraph-image` metadata
// route) so the static export writes a real `.png` file. GitHub Pages picks
// the MIME type from the extension, and an extensionless file is served as
// `application/octet-stream`, which breaks link previews on social platforms.
export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#22c55e",
            letterSpacing: 6,
          }}
        >
          BACKEND DEVELOPER
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            marginTop: 20,
          }}
        >
          {SITE.nameEn}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#94a3b8",
            marginTop: 24,
          }}
        >
          NestJS · TypeScript · PostgreSQL · Docker
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
