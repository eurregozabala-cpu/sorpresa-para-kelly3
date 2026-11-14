import { useEffect, useRef, useState } from "react";
import { ImagePlus, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MEMORY_LABELS } from "@/lib/surprise-content";
import { SectionHeader } from "./ornament";
import recuerdo1 from "@/assets/recuerdo-1.jpg";
import recuerdo2 from "@/assets/recuerdo-2.jpg";
import recuerdo3 from "@/assets/recuerdo-3.jpg";
import recuerdo4 from "@/assets/recuerdo-4.jpg";

const DEFAULT_PHOTOS = [recuerdo1, recuerdo2, recuerdo3, recuerdo4];
const STORAGE_KEY = "kelly-recuerdos-v2";
const TILTS = ["-rotate-2", "rotate-2", "rotate-1", "-rotate-1"];

// null = removed by the user, undefined = use the default photo
type Slot = string | null | undefined;

async function shrinkImage(file: File, max = 1100): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = reject;
      i.src = url;
    });
    const scale = Math.min(1, max / Math.max(img.width, img.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function MemoriesSection() {
  const [slots, setSlots] = useState<Slot[]>([undefined, undefined, undefined, undefined]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (Array.isArray(saved)) setSlots(saved.map((s) => (s === "default" ? undefined : s)));
    } catch {
      /* ignore broken storage */
    }
  }, []);

  const save = (next: Slot[]) => {
    setSlots(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next.map((s) => (s === undefined ? "default" : s))));
    } catch {
      /* storage full: keep in memory only */
    }
  };

  const onPick = async (i: number, file?: File) => {
    if (!file) return;
    const data = await shrinkImage(file);
    save(slots.map((s, j) => (j === i ? data : s)));
  };

  return (
    <section id="recuerdos" className="relative scroll-mt-20 bg-section-blush px-5 py-24">
      <div className="mx-auto max-w-3xl">
        <SectionHeader
          eyebrow="Nuestros recuerdos"
          title="Momentos que guardo"
          subtitle="Cuatro momentos nuestros que guardo en el corazón."
        />
        <div className="grid grid-cols-2 gap-4 sm:gap-8">
          {MEMORY_LABELS.map((label, i) => {
            const src = slots[i] === undefined ? DEFAULT_PHOTOS[i] : slots[i];
            return (
              <figure
                key={label}
                className={`${TILTS[i]} rounded-2xl bg-paper p-2.5 pb-4 shadow-paper transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] sm:p-4`}
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-gold-soft bg-blush">
                  {src ? (
                    <>
                      <img src={src} alt={label} className="h-full w-full object-cover" loading="lazy" />
                      <button
                        type="button"
                        aria-label={`Quitar foto: ${label}`}
                        onClick={() => save(slots.map((s, j) => (j === i ? null : s)))}
                        className="absolute right-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-paper/85 text-wine shadow-sm backdrop-blur transition hover:bg-paper"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => inputs.current[i]?.click()}
                      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-primary"
                    >
                      <ImagePlus className="h-8 w-8" />
                      <span className="font-sans text-sm">Tu foto aquí</span>
                    </button>
                  )}
                </div>
                <figcaption className="mt-3 text-center font-script text-2xl text-wine sm:text-3xl">
                  {label}
                </figcaption>
                <Button
                  variant="choice"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => inputs.current[i]?.click()}
                >
                  <RefreshCw /> Cambiar foto
                </Button>
                <input
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    void onPick(i, e.target.files?.[0]);
                    e.target.value = "";
                  }}
                />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
