import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/surprise-content";

export function SectionNav() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        const first = visible[0];
        if (first) setActive(first.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.getElementById(`nav-${active}`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <nav className="sticky top-3 z-40 mx-auto w-[calc(100%-1.5rem)] max-w-2xl">
      <div className="no-scrollbar flex gap-1 overflow-x-auto rounded-full border border-gold-soft/70 bg-paper/80 p-1 shadow-paper backdrop-blur-md">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            id={`nav-${s.id}`}
            type="button"
            onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
            className={`shrink-0 cursor-pointer rounded-full px-4 py-1.5 font-sans text-sm transition-all duration-300 ${
              active === s.id
                ? "bg-gradient-rose text-primary-foreground shadow-romance"
                : "text-muted-foreground hover:text-wine"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
