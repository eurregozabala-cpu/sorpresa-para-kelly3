import { BELOVED, LETTER } from "@/lib/surprise-content";
import { Ornament, PaperCard } from "./ornament";

export function LetterSection() {
  return (
    <section id="carta" className="relative scroll-mt-20 px-5 pb-24 pt-16">
      <div className="mx-auto max-w-2xl">
        <header className="mb-12 text-center animate-fade-up">
          <p className="font-sans text-[0.7rem] uppercase tracking-[0.4em] text-gold">
            Una experiencia especial para
          </p>
          <h1 className="text-gradient-gold mt-2 px-4 font-script text-8xl leading-[1.3] sm:text-9xl">
            {BELOVED}
          </h1>
          <Ornament />
        </header>

        <PaperCard className="px-7 py-12 sm:px-14 animate-fade-up [animation-delay:200ms]">
          <p className="font-script text-4xl text-primary sm:text-5xl">{LETTER.greeting}</p>
          <div className="mt-6 space-y-5 text-xl leading-relaxed text-foreground">
            {LETTER.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-10 text-right font-script text-3xl text-wine">{LETTER.signature}</p>
        </PaperCard>
      </div>
    </section>
  );
}
