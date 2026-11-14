import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BELOVED } from "@/lib/surprise-content";

export function EnvelopeIntro({ onOpened }: { onOpened: () => void }) {
  const [opening, setOpening] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => setLeaving(true), 1500);
    window.setTimeout(onOpened, 2300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--gradient-page)" }}
    >
      <div className="animate-fade-up text-center">
        <p className="font-sans text-[0.7rem] uppercase tracking-[0.4em] text-gold">
          Una experiencia especial
        </p>
        <h1 className="mt-2 flex items-baseline justify-center gap-3 text-wine">
          <span className="font-display text-4xl italic">para</span>
          <span className="font-script text-6xl text-primary sm:text-7xl">{BELOVED}</span>
        </h1>
      </div>

      <button
        type="button"
        onClick={open}
        aria-label="Abrir el sobre"
        className="perspective relative mt-12 cursor-pointer"
      >
        <div
          className={`relative h-[200px] w-[300px] sm:h-[230px] sm:w-[345px] ${
            opening ? "" : "animate-envelope-float"
          }`}
        >
          {/* letter peeking out */}
          <div
            className={`absolute inset-x-5 top-4 bottom-4 flex items-center justify-center rounded-lg bg-paper shadow-paper transition-transform duration-1000 ease-out ${
              opening ? "-translate-y-28 delay-500" : "translate-y-0"
            }`}
          >
            <span className="font-script text-3xl text-primary">Te amo</span>
          </div>
          {/* envelope body */}
          <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-envelope shadow-envelope">
            <div
              className="absolute inset-0 bg-gradient-flap opacity-60"
              style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}
            />
          </div>
          {/* flap */}
          <div
            className={`preserve-3d absolute inset-x-0 top-0 h-[58%] origin-top transition-transform duration-700 ease-in-out ${
              opening ? "z-0 [transform:rotateX(180deg)]" : "z-10"
            }`}
          >
            <div
              className="h-full w-full rounded-t-xl bg-gradient-flap"
              style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </div>
          {/* wax seal */}
          <div
            className={`absolute left-1/2 top-[58%] z-20 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-seal shadow-romance transition-all duration-500 ${
              opening ? "scale-0 opacity-0" : "scale-100"
            }`}
          >
            <Heart className="h-6 w-6 fill-wine text-wine" />
          </div>
        </div>
      </button>

      <div className="mt-12 flex flex-col items-center gap-4 animate-fade-up [animation-delay:300ms]">
        <Button variant="romance" size="xl" onClick={open} className="animate-pulse-ring">
          <Heart className="fill-current" /> Abrir mi sorpresa
        </Button>
        <p className="font-display italic text-muted-foreground">Toca el sobre o el botón</p>
      </div>
    </div>
  );
}
