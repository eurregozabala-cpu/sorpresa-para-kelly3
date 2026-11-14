import { useState } from "react";
import { Gem } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FOREVER } from "@/lib/surprise-content";
import { Ornament, PaperCard } from "./ornament";
import { useHeartBurst } from "./heart-burst";

export function ForeverSection() {
  const burst = useHeartBurst();
  const [accepted, setAccepted] = useState(false);

  const accept = (x: number, y: number) => {
    setAccepted(true);
    burst(x, y, 40);
    window.setTimeout(() => burst(window.innerWidth * 0.25, window.innerHeight * 0.4, 24), 350);
    window.setTimeout(() => burst(window.innerWidth * 0.75, window.innerHeight * 0.4, 24), 650);
  };

  return (
    <section id="para-siempre" className="relative scroll-mt-20 bg-section-blush px-5 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-gold">
          La pregunta más importante
        </p>
        <h2 className="mt-4 font-display text-4xl italic leading-tight text-wine sm:text-5xl">
          {FOREVER.question}
        </h2>
        <div className="mt-6">
          <Ornament />
        </div>

        {accepted ? (
          <PaperCard className="mt-12 animate-fade-up px-7 py-12 sm:px-12">
            <p className="font-script text-5xl text-primary sm:text-6xl">{FOREVER.title}</p>
            <div className="mt-6 space-y-5 text-xl leading-relaxed text-foreground">
              {FOREVER.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="mt-8 font-script text-4xl text-wine">{FOREVER.closing}</p>
          </PaperCard>
        ) : (
          <div className="mt-12 flex justify-center">
            <Button
              variant="romance"
              size="xl"
              className="animate-pulse-ring"
              onClick={(e) => accept(e.clientX, e.clientY)}
            >
              <Gem /> Sí, quiero
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
