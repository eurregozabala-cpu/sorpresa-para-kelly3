import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from "react";

type Particle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  size: number;
  delay: number;
  glyph: string;
  tone: "rose" | "gold" | "wine";
};

const TONES = { rose: "text-primary", gold: "text-gold", wine: "text-wine" } as const;
const GLYPHS = ["♥", "♥", "♥", "✦", "❀"];

const BurstContext = createContext<(x: number, y: number, count?: number) => void>(() => {});

export function useHeartBurst() {
  return useContext(BurstContext);
}

export function HeartBurstProvider({ children }: { children: ReactNode }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  const burst = useCallback((x: number, y: number, count = 18) => {
    const tones: Particle["tone"][] = ["rose", "gold", "wine"];
    const fresh: Particle[] = Array.from({ length: count }, (_, i) => {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
      const dist = 60 + Math.random() * 120;
      return {
        id: nextId.current++,
        x,
        y,
        dx: Math.cos(angle) * dist,
        dy: Math.sin(angle) * dist - 40,
        r: Math.random() * 120 - 60,
        size: 12 + Math.random() * 18,
        delay: Math.random() * 120,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "♥",
        tone: tones[i % tones.length] ?? "rose",
      };
    });
    setParticles((p) => [...p, ...fresh]);
    const ids = new Set(fresh.map((f) => f.id));
    window.setTimeout(() => setParticles((p) => p.filter((q) => !ids.has(q.id))), 1800);
  }, []);

  return (
    <BurstContext.Provider value={burst}>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className={`absolute select-none ${TONES[p.tone]}`}
            style={
              {
                left: p.x,
                top: p.y,
                fontSize: p.size,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--r": `${p.r}deg`,
                animation: `burst 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${p.delay}ms both`,
              } as React.CSSProperties
            }
          >
            {p.glyph}
          </span>
        ))}
      </div>
    </BurstContext.Provider>
  );
}
