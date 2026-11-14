// All the words of the surprise live here so they are easy to change in one place.
export const BELOVED = "Kelly";

export const LETTER = {
  greeting: "Mi amor,",
  paragraphs: [
    "Hice este pequeño rincón solo para ti, para regalarte con calma algo que a veces no sé decir del todo con palabras.",
    "Desde que llegaste, mis días tienen otro color: más suave, más bonito, más nuestro. Contigo aprendí que el amor también vive en lo sencillo — en una mirada, en una risa compartida, en saber que estás ahí.",
    "Gracias por tu paciencia, por tu ternura y por los silencios que contigo nunca son incómodos. Gracias por ser mi lugar seguro.",
    "Tómate tu tiempo y recorre cada parte. Todo lo que vas a ver aquí está hecho pensando en ti.",
  ],
  signature: "Con todo mi corazón",
};

export const MEMORY_LABELS = ["Un instante", "Una sonrisa", "Un abrazo", "Un para siempre"];

export const SONG_YOUTUBE_ID = "T8jBwgD6gxI";

export const REASONS = [
  {
    numeral: "I",
    title: "Tu sonrisa",
    text: "Porque tu sonrisa tiene la costumbre de arreglarme el día, incluso los más grises.",
  },
  {
    numeral: "II",
    title: "Tu forma de ser",
    text: "Porque eres dulce y fuerte a la vez, y contigo todo se siente más ligero.",
  },
  {
    numeral: "III",
    title: "Cómo me miras",
    text: "Porque cuando me miras, siento que estoy exactamente donde tengo que estar.",
  },
  {
    numeral: "IV",
    title: "Nuestro mañana",
    text: "Porque cada vez que imagino el futuro, te veo a mi lado, de la mano.",
  },
];

export const FOREVER = {
  question: `${BELOVED}, ¿quieres ser mi esposa y casarte conmigo?`,
  title: "Para siempre",
  paragraphs: [
    "Entonces te prometo elegirte cada día, en los días fáciles y en los que no lo son tanto.",
    "Prometo cuidarte, hacerte reír, escucharte y construir contigo un hogar lleno de calma, de risas y de amor.",
    "Esto no es un final: es el comienzo de nuestra historia más bonita.",
  ],
  closing: `Te amo, ${BELOVED}`,
};

export const SECTIONS = [
  { id: "carta", label: "Carta" },
  { id: "recuerdos", label: "Recuerdos" },
  { id: "musica", label: "Música" },
  { id: "razones", label: "Razones" },
  { id: "preguntas", label: "Preguntas" },
  { id: "para-siempre", label: "Para siempre" },
] as const;
