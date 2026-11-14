import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { EnvelopeIntro } from "@/components/surprise/envelope-intro";
import { FloatingHearts } from "@/components/surprise/floating-hearts";
import { HeartBurstProvider } from "@/components/surprise/heart-burst";
import { SectionNav } from "@/components/surprise/section-nav";
import { LetterSection } from "@/components/surprise/letter-section";
import { MemoriesSection } from "@/components/surprise/memories-section";
import { SongSection } from "@/components/surprise/song-section";
import { ReasonsSection } from "@/components/surprise/reasons-section";
import { QuestionsSection } from "@/components/surprise/questions-section";
import { ForeverSection } from "@/components/surprise/forever-section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Una sorpresa para Kelly ♥" },
      { name: "description", content: "Un pequeño rincón hecho con todo mi amor, solo para Kelly." },
      { property: "og:title", content: "Una sorpresa para Kelly ♥" },
      { property: "og:description", content: "Un pequeño rincón hecho con todo mi amor, solo para Kelly." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <HeartBurstProvider>
      <FloatingHearts />
      {!opened && <EnvelopeIntro onOpened={() => setOpened(true)} />}
      {opened && (
        <div className="relative z-10 animate-fade-up">
          <SectionNav />
          <main>
            <LetterSection />
            <MemoriesSection />
            <SongSection />
            <ReasonsSection />
            <QuestionsSection />
            <ForeverSection />
          </main>
          <footer className="pb-12 pt-4 text-center font-display italic text-muted-foreground">
            Hecho con cariño <span className="text-primary">♥</span>
          </footer>
        </div>
      )}
    </HeartBurstProvider>
  );
}
