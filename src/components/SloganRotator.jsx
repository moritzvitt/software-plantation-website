import { Calligraph } from "calligraph";
import { useState } from "react";

const SLOGANS = [
  ["Wenn Software", "plötzlich kritisch wird."],
  ["Software wird", "zum Engpass?"],
  ["Wenn Ihre Software", "nicht mehr mithält."],
  ["Was gestern gereicht hat,", "bremst heute."],
];

export default function SloganRotator() {
  const [index, setIndex] = useState(0);

  return (
    <button
      className="slogan-rotator"
      type="button"
      aria-live="polite"
      onClick={() => setIndex((current) => (current + 1) % SLOGANS.length)}
    >
      {SLOGANS[index].map((line) => (
        <span className="slogan-line" key={line}>
          <Calligraph drift={{ x: 1.4, y: 0.2 }}>{line}</Calligraph>
        </span>
      ))}
    </button>
  );
}
