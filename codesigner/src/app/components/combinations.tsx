import styles from "../page.module.css";
import ColorCombo from "./colorCombo";
import { useState } from "react";
import Description from "./description";

export default function Combinations({ colorArray, contrastLevel }) {
  const [displayLowContrast, setDisplayLowContrast] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <section>
      <h2>
        {contrastLevel}{" "}
        {contrastLevel === "AAA"
          ? "(Enhanced Contrast)"
          : contrastLevel === "AA"
          ? "(Minimum Contrast)"
          : "Contrast"}
      </h2>
      {contrastLevel == "Low" ? (
        <>
          <button onClick={() => setDisplayLowContrast((prev) => !prev)}>
            {displayLowContrast
              ? "(hide)"
              : `(show ${colorArray.length} combinations)`}
          </button>
          <button onClick={() => setShowInfo((prev) => !prev)}>
            {showInfo ? "hide info" : "show info"}
          </button>
        </>
      ) : (
        <button onClick={() => setShowInfo((prev) => !prev)}>
          {showInfo ? "hide info" : "show info"}
        </button>
      )}
      {showInfo && <Description contrastLevel={contrastLevel} />}
      <section className={styles.colourCombos}>
        {contrastLevel === "Low" && !displayLowContrast
          ? ""
          : colorArray.map((combo, index) => {
              return (
                <ColorCombo
                  key={index}
                  colour1={`rgb(${combo[0][0]})`}
                  colour2={`rgb(${combo[1][0]})`}
                  hex1={combo[0][1]}
                  hex2={combo[1][1]}
                  contrast={`${combo[2]}`}
                  contrastLevel={contrastLevel}
                />
              );
            })}
      </section>
    </section>
  );
}
