import { useState } from "react";
import { REASONS } from "@/lib/surprise-content";
import { SectionHeader } from "./ornament";

export function ReasonsSection() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="razones" className="relative scroll-mt-20 bg-section-blush px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Cuatro de mil"
          title="Razones para quererte"
          subtitle="Toca cada tarjeta para descubrirla."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <button
              key={r.title}
              type="button"
              onClick={() => toggle(i)}
              className="perspective h-52 w-full cursor-pointer text-left"
            >
              <div
                className={`preserve-3d relative h-full w-full transition-transform duration-700 ${
                  flipped.has(i) ? "rotate-y-180" : ""
                }`}
              >
                <div className="backface-hidden gold-frame paper-texture absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl shadow-paper">
                  <span className="font-display text-lg tracking-[0.3em] text-gold">{r.numeral}</span>
                  <span className="font-display text-3xl italic text-wine">{r.title}</span>
                  <span className="text-xl text-primary animate-heartbeat">♥</span>
                </div>
                <div className="backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center rounded-3xl bg-gradient-rose px-8 text-center shadow-romance">
                  <p className="font-display text-xl italic leading-snug text-primary-foreground sm:text-2xl">
                    {r.text}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
