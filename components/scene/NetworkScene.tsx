"use client";

import { useEffect, useMemo, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, Html, Line, useTexture } from "@react-three/drei";
import * as THREE from "three";

type NodeDef = {
  name: string;
  color: string;
  icon: string;
  position: [number, number, number];
};

// استک — برای تغییر، همین آرایه را ویرایش کن.
// موقعیت‌ها نسبت به قبل جمع‌وجورتر شده‌اند.
const NODES: NodeDef[] = [
  { name: "Node.js", color: "#5FA04E", icon: "/icons/nodedotjs.svg", position: [0, 0, 0] },
  { name: "NestJS", color: "#E0234E", icon: "/icons/nestjs.svg", position: [2.15, 0.85, 0.35] },
  { name: "TypeScript", color: "#3178C6", icon: "/icons/typescript.svg", position: [-2.15, 0.75, 0.25] },
  { name: "React", color: "#61DAFB", icon: "/icons/react.svg", position: [1.7, -1.35, -0.5] },
  { name: "Next.js", color: "#FFFFFF", icon: "/icons/nextdotjs.svg", position: [-1.7, -1.25, -0.6] },
  { name: "PostgreSQL", color: "#4169E1", icon: "/icons/postgresql.svg", position: [0.1, 2.2, -0.9] },
  { name: "Redis", color: "#FF4438", icon: "/icons/redis.svg", position: [-0.25, -2.35, 0.6] },
  { name: "Docker", color: "#2496ED", icon: "/icons/docker.svg", position: [2.7, -0.4, -1.35] },
  { name: "Prisma", color: "#5A67D8", icon: "/icons/prisma.svg", position: [-2.7, -0.5, -1.5] },
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
    // فیلتر نزدیک‌ترین همسایه => ظاهر پیکسلی
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
  });

  return (
    <group position={def.position}>
      <Billboard>
        {/* هالهی هشت‌ضلعی پشت آیکون (پیکسلی‌تر از دایره) */}
        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[0.32, 8]} />
          <meshBasicMaterial color={def.color} transparent opacity={0.14} toneMapped={false} />
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
        <span className="font-pixel whitespace-nowrap border-2 border-border bg-background/90 px-2 py-0.5 text-[9px] leading-none text-accent">
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
  const texture = useMemo(() => makeDigitTexture(char, "#3ddc84"), [char]);

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

  useFrame((state, delta) => {
    const damp = THREE.MathUtils.damp;

    if (tilt.current) {
      tilt.current.rotation.x = damp(tilt.current.rotation.x, -pointer.current.y * 0.25, 3, delta);
      tilt.current.rotation.z = damp(tilt.current.rotation.z, pointer.current.x * 0.15, 3, delta);

      // روی صفحه‌های باریک، کل شبکه کمی کوچک شود تا داخل کادر بماند
      const aspect = state.size.width / state.size.height;
      const fit = THREE.MathUtils.clamp(aspect / 1.5, 0.55, 1);
      tilt.current.scale.setScalar(damp(tilt.current.scale.x, fit, 3, delta));
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
              points={[NODES[a].position, NODES[b].position]}
              color="#3ddc84"
              lineWidth={1}
              transparent
              opacity={0.18}
            />
          ))}

          {NODES.map((n) => (
            <Technology key={n.name} def={n} />
          ))}

          {PULSES.map((p, i) => {
            const [a, b] = EDGES[p.edge];
            return (
              <Pulse
                key={i}
                from={toVec(NODES[a].position)}
                to={toVec(NODES[b].position)}
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
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 9.5], fov: 45 }} gl={{ antialias: true }}>
      <color attach="background" args={["#060a08"]} />
      <fog attach="fog" args={["#060a08", 12, 26]} />

      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 6]} intensity={1.6} />
      <pointLight position={[-6, -2, 3]} intensity={40} color="#3ddc84" />
      <pointLight position={[6, 3, 3]} intensity={30} color="#22d3ee" />

      <Network progress={progress} pointer={pointer} />
    </Canvas>
  );
}
