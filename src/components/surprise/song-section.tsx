import { useState } from "react";
import { Info, Music2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SONG_YOUTUBE_ID } from "@/lib/surprise-content";
import { SectionHeader } from "./ornament";

export function SongSection() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="musica" className="relative scroll-mt-20 px-5 py-24">
      <div className="mx-auto max-w-2xl">
        <SectionHeader
          eyebrow="Nuestra canción"
          title="Para escuchar juntos"
          subtitle="Una canción que me hace pensar en ti."
        />
        <div className="gold-frame rounded-3xl bg-paper p-2 shadow-paper">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-wine">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${SONG_YOUTUBE_ID}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
                title="Nuestra canción"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Reproducir la canción"
                className="group absolute inset-0 cursor-pointer"
              >
                <img
                  src={`https://i.ytimg.com/vi/${SONG_YOUTUBE_ID}/hqdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-wine/70 via-wine/20 to-transparent" />
                <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-rose text-primary-foreground shadow-romance transition group-hover:scale-110">
                  <Play className="ml-1 h-7 w-7 fill-current" />
                </span>
              </button>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="soft" size="pill" onClick={() => setPlaying((p) => !p)}>
            {playing ? (
              "Detener la canción"
            ) : (
              <>
                <Music2 /> Reproducir nuestra canción
              </>
            )}
          </Button>
        </div>
        <p className="mt-5 flex gap-3 rounded-2xl bg-blush/80 px-5 py-4 font-sans text-sm leading-relaxed text-wine">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          Algunos navegadores (como Safari en iPhone) no reproducen música solos: si no suena, toca
          el botón de reproducir dentro del video.
        </p>
      </div>
    </section>
  );
}
