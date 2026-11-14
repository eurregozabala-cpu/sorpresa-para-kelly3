import { describe, expect, it } from "vitest";
import { LOVE_OPTIONS, kissNoState } from "@/lib/surprise-game";

describe("Dos preguntas game", () => {
  it("only 'Infinito' is the right answer to ¿Sabes cuánto te quiero?", () => {
    expect(LOVE_OPTIONS.filter((o) => o.correct).map((o) => o.label)).toEqual(["Infinito"]);
  });

  it("the 'No' button dodges and changes its text before giving in", () => {
    expect(kissNoState(1).label).toBe("¿Segura?");
    expect(kissNoState(1).offset).not.toEqual({ x: 0, y: 0 });
    expect(kissNoState(1).message).toBe("Ese botón está un poco tímido… 🙈");
  });

  it("after 4 presses of 'No' it turns into a yes", () => {
    const s = kissNoState(4);
    expect(s.gaveIn).toBe(true);
    expect(s.label).toBe("Bueno, sí 😅");
    expect(s.message).toBe("Sabía que dirías que sí 🥰");
  });
});
