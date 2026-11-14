import type { ReactNode } from "react";

export function Ornament() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3 text-sm">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
      <span className="text-gold">✦</span>
      <span className="text-primary">♥</span>
      <span className="text-gold">✦</span>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <header className="mb-12 text-center">
      <p className="font-sans text-[0.7rem] uppercase tracking-[0.35em] text-gold">{eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl italic text-wine sm:text-5xl">{title}</h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">{subtitle}</p>
      )}
      <div className="mt-6">
        <Ornament />
      </div>
    </header>
  );
}

export function PaperCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`gold-frame paper-texture rounded-3xl shadow-paper ${className}`}>{children}</div>
  );
}
