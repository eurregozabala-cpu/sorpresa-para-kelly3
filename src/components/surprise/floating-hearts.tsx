const HEARTS = [
  { left: "6%", size: 14, dur: 22, delay: 0, drift: 30, o: 0.3 },
  { left: "18%", size: 10, dur: 28, delay: 6, drift: -20, o: 0.25 },
  { left: "31%", size: 18, dur: 25, delay: 12, drift: 40, o: 0.2 },
  { left: "47%", size: 12, dur: 30, delay: 3, drift: -30, o: 0.28 },
  { left: "62%", size: 16, dur: 24, delay: 9, drift: 25, o: 0.22 },
  { left: "75%", size: 11, dur: 27, delay: 15, drift: -15, o: 0.3 },
  { left: "88%", size: 15, dur: 23, delay: 5, drift: -35, o: 0.24 },
  { left: "95%", size: 9, dur: 31, delay: 18, drift: 10, o: 0.2 },
];

export function FloatingHearts() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {HEARTS.map((h, i) => (
        <span
          key={i}
          className={`absolute -bottom-10 ${i % 3 === 0 ? "text-gold" : "text-primary"}`}
          style={
            {
              left: h.left,
              fontSize: h.size,
              opacity: h.o,
              "--drift": `${h.drift}px`,
              animation: `float-up ${h.dur}s linear ${h.delay}s infinite`,
            } as React.CSSProperties
          }
        >
          ♥
        </span>
      ))}
    </div>
  );
}
