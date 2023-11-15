import styles from "../page.module.css";
import ColorCombo from "./colorCombo";
import { useState } from "react";
import Description from "./description";

interface HexColor {
  color: string;
  background: boolean;
  text: boolean;
}

interface RgbColor {
  rgb: number[];
  background: boolean;
  text: boolean;
}

interface CombinationsProps {
  colorArray: [[RgbColor, HexColor], [RgbColor, HexColor], number][];
  contrastLevel: string;
}

export default function Combinations({
  colorArray,
  contrastLevel,
}: CombinationsProps) {
  const [displayLowContrast, setDisplayLowContrast] = useState(false);

  return (
    <section>
      <h3>
        {contrastLevel}{" "}
        {contrastLevel === "AAA"
          ? "(Enhanced Contrast)"
          : contrastLevel === "AA"
          ? "(Minimum Contrast)"
          : "Contrast"}
      </h3>
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
          : colorArray.map(
              (
                combo: [[RgbColor, HexColor], [RgbColor, HexColor], number],
                index: number
              ) => {
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
              }
            )}
      </section>
    </section>
  );
}
