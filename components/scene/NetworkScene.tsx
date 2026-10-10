"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { asset } from "@/lib/site";

type NodeDef = {
  name: string;
  color: string;
  icon: string;
  position: [number, number, number];
};

// استک — برای تغییر، همین آرایه را ویرایش کن.
// موقعیت‌ها نسبت به قبل جمع‌وجورتر شده‌اند.
const NODES: NodeDef[] = [
  { name: "Node.js", color: "#5FA04E", icon: asset("/icons/nodedotjs.svg"), position: [0, 0, 0] },
  { name: "NestJS", color: "#E0234E", icon: asset("/icons/nestjs.svg"), position: [2.15, 0.85, 0.35] },
  { name: "TypeScript", color: "#3178C6", icon: asset("/icons/typescript.svg"), position: [-2.15, 0.75, 0.25] },
  { name: "React", color: "#61DAFB", icon: asset("/icons/react.svg"), position: [1.7, -1.35, -0.5] },
  { name: "Next.js", color: "#FFFFFF", icon: asset("/icons/nextdotjs.svg"), position: [-1.7, -1.25, -0.6] },
  { name: "PostgreSQL", color: "#4169E1", icon: asset("/icons/postgresql.svg"), position: [0.1, 2.2, -0.9] },
  { name: "Redis", color: "#FF4438", icon: asset("/icons/redis.svg"), position: [-0.25, -2.35, 0.6] },
  { name: "Docker", color: "#2496ED", icon: asset("/icons/docker.svg"), position: [2.7, -0.4, -1.35] },
  { name: "Prisma", color: "#5A67D8", icon: asset("/icons/prisma.svg"), position: [-2.7, -0.5, -1.5] },
];

// یال‌ها (ارتباط بین گره‌ها) بر اساس ایندکس در NODES.
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
  [1, 3], [2, 4], [1, 5], [3, 6], [2, 7], [8, 6], [5, 8], [1, 2],
];

// پالس‌ها: ارقام باینری که روی یال‌ها حرکت می‌کنند.
const PULSES: { edge: number; speed: number; offset: number }[] = [
  { edge: 0, speed: 0.22, offset: 0.0 },
  { edge: 2, speed: 0.18, offset: 0.4 },
  { edge: 3, speed: 0.27, offset: 0.15 },
  { edge: 5, speed: 0.2, offset: 0.7 },
  { edge: 9, speed: 0.32, offset: 0.25 },
  { edge: 10, speed: 0.25, offset: 0.6 },
];

const toVec = (p: [number, number, number]) => new THREE.Vector3(p[0], p[1], p[2]);

/**
 * چیدمان واکنش‌گرا:
 * - دسکتاپ (عرض ≥ ارتفاع): نودها افقی پخش می‌شوند تا عرضِ صفحه پر شود.
 * - موبایل (صفحه‌ی باریک): نودها در طول صفحه (محور Y) پخش می‌شوند و عرض جمع می‌شود.
 */
function computeLayout(viewWidth: number, viewHeight: number) {
  const halfW = viewWidth / 2;
  const halfH = viewHeight / 2;
  const MARGIN = 1; // حاشیه از لبه‌ها
  const SAFE = 1.12; // حاشیه‌ی امن برای بزرگ‌نمایی پرسپکتیو نودهای نزدیک
  const aspect = viewWidth / Math.max(viewHeight, 1);

  const baseMaxBx = Math.max(...NODES.map((n) => Math.abs(n.position[0])));
  const baseMaxBz = Math.max(...NODES.map((n) => Math.abs(n.position[2])));
  const baseMaxBy = Math.max(...NODES.map((n) => Math.abs(n.position[1])));

  if (aspect < 1) {
    // موبایل: پخش در طول صفحه
    const STRETCH_Y = 2.0;
    const SQUEEZE = 0.45;

    const nodes = NODES.map((n) => ({
      ...n,
      position: [
        n.position[0] * SQUEEZE,
        n.position[1] * STRETCH_Y,
        n.position[2] * SQUEEZE,
      ] as [number, number, number],
    }));

    const maxBy = Math.max(...nodes.map((n) => Math.abs(n.position[1])));
    const reachX = Math.max(
      ...nodes.map((n) => Math.hypot(n.position[0], n.position[2])),
    );

    const scale = Math.min(
      (halfH - MARGIN) / (maxBy * SAFE),
      (halfW - MARGIN) / (reachX * SAFE),
    );
    return { nodes, scale: Math.max(scale, 0.05) };
  }

  // دسکتاپ: کشش افقی برای پر کردن عرض
  const targetRatio = (halfW - MARGIN) / Math.max(halfH - MARGIN, 0.5);
  let stretchX =
    Math.sqrt(
      Math.max(Math.pow(targetRatio * baseMaxBy, 2) - baseMaxBz * baseMaxBz, 0),
    ) / baseMaxBx;
  stretchX = THREE.MathUtils.clamp(stretchX, 0.8, 2.6);

  const nodes = NODES.map((n) => ({
    ...n,
    position: [n.position[0] * stretchX, n.position[1], n.position[2]] as [
      number,
      number,
      number,
    ],
  }));

  const maxBy = baseMaxBy;
  const reachX = Math.max(
    ...nodes.map((n) => Math.hypot(n.position[0], n.position[2])),
  );

  const scale = Math.min(
    (halfH - MARGIN) / (maxBy * SAFE),
    (halfW - MARGIN) / (reachX * SAFE),
  );

  return { nodes, scale: Math.max(scale, 0.05) };
}

// یک تکسچر کم‌رزولوشن از «0» یا «1» برای حالت پیکسلی.
function makeDigitTexture(char: string, color: string) {
  const size = 24;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = color;
    ctx.font = "bold 18px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, size / 2, size / 2 + 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.magFilter = THREE.NearestFilter;
  tex.minFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  return tex;
}

function Technology({ def }: { def: NodeDef }) {
  const texture = useTexture(def.icon, (t) => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
  });

  return (
    <group position={def.position}>
      <Billboard>
        {/* هاله‌ی نرم پشت آیکون */}
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[0.32, 48]} />
          <meshBasicMaterial color={def.color} transparent opacity={0.12} toneMapped={false} />
        </mesh>
        {/* آیکون */}
        <mesh>
          <planeGeometry args={[0.44, 0.44]} />
          <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
        </mesh>
      </Billboard>

      <Html
        center
        position={[0, -0.42, 0]}
        distanceFactor={9}
        style={{ pointerEvents: "none" }}
      >
        <span className="font-mono whitespace-nowrap rounded-full border border-white/10 bg-slate-900/80 px-2.5 py-1 text-[10px] leading-none text-slate-300">
          {def.name}
        </span>
      </Html>
    </group>
  );
}

function Pulse({
  from,
  to,
  speed,
  offset,
  char,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  offset: number;
  char: string;
}) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => makeDigitTexture(char, "#22c55e"), [char]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    g.position.lerpVectors(from, to, t);

    const mat = mesh.current?.material as THREE.MeshBasicMaterial | undefined;
    if (mat) mat.opacity = Math.min(1, Math.sin(t * Math.PI) * 4);
  });

  return (
    <Billboard ref={group}>
      <mesh ref={mesh}>
        <planeGeometry args={[0.26, 0.26]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} depthWrite={false} />
      </mesh>
    </Billboard>
  );
}

function Network({
  progress,
  pointer,
}: {
  progress: RefObject<number>;
  pointer: RefObject<{ x: number; y: number }>;
}) {
  const tilt = useRef<THREE.Group>(null);
  const scroll = useRef<THREE.Group>(null);
  const drift = useRef<THREE.Group>(null);

  const viewW = useThree((state) => state.viewport.width);
  const viewH = useThree((state) => state.viewport.height);
  const layout = useMemo(() => computeLayout(viewW, viewH), [viewW, viewH]);

  useFrame((state, delta) => {
    const damp = THREE.MathUtils.damp;

    if (tilt.current) {
      tilt.current.rotation.x = damp(tilt.current.rotation.x, -pointer.current.y * 0.25, 3, delta);
      tilt.current.rotation.z = damp(tilt.current.rotation.z, pointer.current.x * 0.15, 3, delta);
      tilt.current.scale.setScalar(damp(tilt.current.scale.x, layout.scale, 3, delta));
    }
    if (scroll.current) {
      scroll.current.rotation.y = damp(
        scroll.current.rotation.y,
        (progress.current ?? 0) * Math.PI * 2,
        2.5,
        delta,
      );
      scroll.current.position.y = damp(
        scroll.current.position.y,
        ((progress.current ?? 0) - 0.5) * 0.8,
        3,
        delta,
      );
    }
    if (drift.current) {
      drift.current.rotation.y += delta * 0.05;
      drift.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.08;
    }
  });

  return (
    <group ref={tilt}>
      <group ref={scroll}>
        <group ref={drift}>
          {EDGES.map(([a, b], i) => (
            <Line
              key={i}
              points={[layout.nodes[a].position, layout.nodes[b].position]}
              color="#22c55e"
              lineWidth={1}
              transparent
              opacity={0.15}
            />
          ))}

          {layout.nodes.map((n) => (
            <Technology key={n.name} def={n} />
          ))}

          {PULSES.map((p, i) => {
            const [a, b] = EDGES[p.edge];
            return (
              <Pulse
                key={i}
                from={toVec(layout.nodes[a].position)}
                to={toVec(layout.nodes[b].position)}
                speed={p.speed}
                offset={p.offset}
                char={i % 2 === 0 ? "0" : "1"}
              />
            );
          })}
        </group>
      </group>
    </group>
  );
}

export default function NetworkScene() {
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? THREE.MathUtils.clamp(window.scrollY / max, 0, 1) : 0;
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9.5], fov:45 }} gl={{ antialias: true }}>
      <color attach="background" args={["#0f172a"]} />
      <fog attach="fog" args={["#0f172a", 12, 26]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <pointLight position={[-6, -2, 3]} intensity={40} color="#22c55e" />
      <pointLight position={[6, 3, 3]} intensity={30} color="#38bdf8" />

      <Network progress={progress} pointer={pointer} />
    </Canvas>
  );
}
