import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { KISS_YES_REPLY, LOVE_OPTIONS, kissNoState } from "@/lib/surprise-game";
import { PaperCard, SectionHeader } from "./ornament";
import { useHeartBurst } from "./heart-burst";

function QuestionCard({ number, question, children }: { number: string; question: string; children: ReactNode }) {
  return (
    <PaperCard className="px-6 py-10 text-center sm:px-10">
      <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-gold">Pregunta {number}</p>
      <h3 className="mt-4 font-display text-3xl italic text-wine sm:text-4xl">{question}</h3>
      {children}
    </PaperCard>
  );
}

function Reply({ text, k }: { text: string | null; k: number }) {
  if (!text) return null;
  return (
    <p key={k} className="mt-6 animate-fade-up font-display text-xl italic text-primary">
      {text}
    </p>
  );
}

export function QuestionsSection() {
  const burst = useHeartBurst();
  const [loveReply, setLoveReply] = useState<{ text: string; n: number } | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [kissReply, setKissReply] = useState<{ text: string; n: number } | null>(null);
  const [noPresses, setNoPresses] = useState(0);
  const [saidYes, setSaidYes] = useState(false);
  const counter = useRef(0);

  const noState = kissNoState(saidYes ? 0 : noPresses);

  return (
    <section id="preguntas" className="relative scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeader eyebrow="Un pequeño juego" title="Dos preguntas para ti" />
        <div className="space-y-10">
          <QuestionCard number="uno" question="¿Sabes cuánto te quiero?">
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {LOVE_OPTIONS.map((o) => (
                <Button
                  key={o.label}
                  variant={picked === o.label ? "choice-active" : "choice"}
                  size="pill"
                  className="min-w-28"
                  onClick={(e) => {
                    setPicked(o.label);
                    setLoveReply({ text: o.reply, n: ++counter.current });
                    burst(e.clientX, e.clientY, o.correct ? 24 : 5);
                  }}
                >
                  {o.label}
                </Button>
              ))}
            </div>
            <Reply text={loveReply?.text ?? null} k={loveReply?.n ?? 0} />
          </QuestionCard>

          <QuestionCard number="dos" question="¿Me regalas un beso cuando termines de leer esto?">
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                variant="romance"
                size="pill"
                style={{ transform: `scale(${noState.yesScale})` }}
                onClick={(e) => {
                  setSaidYes(true);
                  setKissReply({ text: KISS_YES_REPLY, n: ++counter.current });
                  burst(e.clientX, e.clientY, 26);
                }}
              >
                Sí, claro 💋
              </Button>
              <Button
                variant="choice"
                size="pill"
                className="transition-transform duration-500"
                style={{ transform: `translate(${noState.offset.x}px, ${noState.offset.y}px)` }}
                onClick={(e) => {
                  const next = noPresses + 1;
                  const s = kissNoState(next);
                  setSaidYes(false);
                  setNoPresses(next);
                  setKissReply({ text: s.message ?? "", n: ++counter.current });
                  if (s.gaveIn) burst(e.clientX, e.clientY, 20);
                }}
              >
                {noState.label}
              </Button>
            </div>
            <Reply text={kissReply?.text ?? null} k={kissReply?.n ?? 0} />
          </QuestionCard>
        </div>
      </div>
    </section>
  );
}
