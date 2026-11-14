export type LoveOption = { label: string; reply: string; correct: boolean };

export const LOVE_OPTIONS: LoveOption[] = [
  { label: "Un poquito", reply: "Mmm… respuesta incorrecta 😌 Prueba otra vez.", correct: false },
  { label: "Mucho", reply: "Casi… pero es todavía más. ¡Sigue!", correct: false },
  { label: "Infinito", reply: "¡Exacto! Infinito… y un poquito más 💛", correct: true },
];

export const KISS_YES_REPLY = "Lo apunto. Te lo cobro con intereses 😘";
export const NO_LABELS = ["No", "¿Segura?", "Piénsalo bien", "Ya casi…", "Bueno, sí 😅"];

const NO_SHIFT_X = [80, -80, 55, -55];
const NO_SHIFT_Y = [6, -4, 10, 0];

/** What happens after the "No" button has been pressed `presses` times. */
export function kissNoState(presses: number) {
  const gaveIn = presses >= NO_LABELS.length - 1;
  return {
    label: NO_LABELS[Math.min(presses, NO_LABELS.length - 1)],
    message:
      presses === 0
        ? null
        : gaveIn
          ? "Sabía que dirías que sí 🥰"
          : "Ese botón está un poco tímido… 🙈",
    offset: gaveIn || presses === 0
      ? { x: 0, y: 0 }
      : { x: NO_SHIFT_X[presses % NO_SHIFT_X.length], y: NO_SHIFT_Y[presses % NO_SHIFT_Y.length] },
    yesScale: 1 + Math.min(presses, 3) * 0.08,
    gaveIn,
  };
}
