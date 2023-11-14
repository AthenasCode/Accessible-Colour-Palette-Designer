import styles from "../page.module.css";
import ColorCombo from "./colorCombo";
import { useState } from "react";
import Description from "./description";

export default function Combinations({ colorArray, contrastLevel }) {
  const [displayLowContrast, setDisplayLowContrast] = useState(false);

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
        </>
      ) : (
        <></>
      )}
      <Description contrastLevel={contrastLevel} />
      <section className={styles.colourCombos}>
        {contrastLevel === "Low" && !displayLowContrast
          ? ""
          : colorArray.map((combo, index) => {
              const backgroundRgb = combo[0][0].rgb;
              const textRgb = combo[1][0].rgb;
              const backgroundHex = combo[0][1].color;
              const textHex = combo[1][1].color;
              const contrast = combo[2];

              console.log("contrast", contrast);
              console.log(
                "type of contrast before passing to ColorCombo",
                typeof contrast
              );

              // Check if either background or text should be rendered
              if (!combo[0][0].background || !combo[1][0].text) {
                return null; // Skip rendering if either condition is false
              }

              return (
                <ColorCombo
                  key={index}
                  colour1={`rgb(${backgroundRgb})`}
                  colour2={`rgb(${textRgb})`}
                  hex1={backgroundHex}
                  hex2={textHex}
                  contrast={contrast}
                  contrastLevel={contrastLevel}
                />
              );
            })}
      </section>
    </section>
  );
}
