import styles from "../page.module.css";
import ColorCombo from "./colorCombo";
import { useState } from "react";

export default function Combinations({ colorArray, contrastLevel }) {
  const [displayLowContrast, setDisplayLowContrast] = useState(false);

  const descriptions = {
    AAA: "Enhanced contrast: Normal text has a contrast ratio of at least 7:1, and large text (>18 point or 14 point bold) has a contrast ratio of at least 4.5:1.",
    AA: "Minimum contrast: Text has a contrast ratio of at least 4.5:1, and large text (>18 point or 14 point bold) has a contrast ratio of at least 3:1.",
    Low: "Text contrast is less than 3:1.",
  };

  return (
    <>
      <h2>{contrastLevel}</h2>
      {contrastLevel == "Low" ? (
        <button onClick={() => setDisplayLowContrast((prev) => !prev)}>
          {displayLowContrast
            ? "(hide)"
            : `(show ${colorArray.length} combinations)`}
        </button>
      ) : (
        ""
      )}
      <p>{descriptions[contrastLevel]}</p>
      <section className={styles.colourCombos}>
        {contrastLevel === "Low" && !displayLowContrast
          ? ""
          : colorArray.map((combo) => {
              return (
                <ColorCombo
                  colour1={`rgb(${combo[0]})`}
                  colour2={`rgb(${combo[1]})`}
                  contrast={`${combo[2]}`}
                />
              );
            })}
      </section>
    </>
  );
}
