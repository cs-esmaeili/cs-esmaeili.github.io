"use client";

import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";

type NodeDef = {
  name: string;
  color: string;
  position: [number, number, number];
};

// استک — برای تغییر، همین آرایه را ویرایش کن.
const NODES: NodeDef[] = [
  { name: "Node.js", color: "#5FA04E", position: [0, 0, 0] },
  { name: "NestJS", color: "#E0234E", position: [1.7, 0.7, 0.3] },
  { name: "TypeScript", color: "#3178C6", position: [-1.7, 0.6, 0.2] },
  { name: "React", color: "#61DAFB", position: [1.4, -1.1, -0.4] },
  { name: "Next.js", color: "#FFFFFF", position: [-1.4, -1.0, -0.5] },
  { name: "PostgreSQL", color: "#4169E1", position: [0.1, 1.8, -0.7] },
  { name: "Redis", color: "#FF4438", position: [-0.2, -1.9, 0.5] },
  { name: "Docker", color: "#2496ED", position: [2.2, -0.3, -1.1] },
  { name: "Prisma", color: "#5A67D8", position: [-2.2, -0.4, -1.2] },
];

// یال‌ها (ارتباط بین گره‌ها) بر اساس ایندکس در NODES.
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
  [1, 3], [2, 4], [1, 5], [3, 6], [2, 7], [8, 6], [5, 8], [1, 2],
];

// پالس‌های نور که روی یال‌ها حرکت می‌کنند.
const PULSES: { edge: number; speed: number; offset: number }[] = [
  { edge: 0, speed: 0.35, offset: 0.0 },
  { edge: 2, speed: 0.28, offset: 0.4 },
  { edge: 3, speed: 0.42, offset: 0.15 },
  { edge: 5, speed: 0.3, offset: 0.7 },
  { edge: 9, speed: 0.5, offset: 0.25 },
  { edge: 10, speed: 0.38, offset: 0.6 },
];

const toVec = (p: [number, number, number]) => new THREE.Vector3(p[0], p[1], p[2]);

function Node({ def }: { def: NodeDef }) {
  return (
    <group position={def.position}>
      <mesh>
        <sphereGeometry args={[0.16, 32, 32]} />
        <meshStandardMaterial
          color={def.color}
          emissive={def.color}
          emissiveIntensity={1.4}
          roughness={0.35}
          metalness={0.2}
          toneMapped={false}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color={def.color} transparent opacity={0.13} toneMapped={false} />
      </mesh>
      <Html center distanceFactor={9} style={{ pointerEvents: "none" }}>
        <span className="whitespace-nowrap rounded-full border border-white/10 bg-black/60 px-2 py-0.5 text-[10px] leading-none text-white/80">
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
  color,
}: {
  from: THREE.Vector3;
  to: THREE.Vector3;
  speed: number;
  offset: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const m = ref.current;
    if (!m) return;
    const t = (state.clock.elapsedTime * speed + offset) % 1;
    m.position.lerpVectors(from, to, t);
    (m.material as THREE.MeshBasicMaterial).opacity = Math.sin(t * Math.PI);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.055, 12, 12]} />
      <meshBasicMaterial color={color} transparent toneMapped={false} />
    </mesh>
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
      drift.current.rotation.y += delta * 0.08;
      drift.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08;
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
              color="#64748b"
              lineWidth={1}
              transparent
              opacity={0.35}
            />
          ))}

          {NODES.map((n) => (
            <Node key={n.name} def={n} />
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
                color={NODES[b].color}
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
    <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true }}>
      <color attach="background" args={["#08090d"]} />
      <fog attach="fog" args={["#08090d", 6, 15]} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 6]} intensity={1.5} />
      <pointLight position={[-6, -2, 3]} intensity={35} color="#34d399" />
      <pointLight position={[6, 3, 3]} intensity={30} color="#a78bfa" />

      <Network progress={progress} pointer={pointer} />
    </Canvas>
  );
}
