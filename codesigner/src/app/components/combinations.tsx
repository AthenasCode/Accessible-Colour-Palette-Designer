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
      {contrastLevel === "AAA" ? (
        <>
          <h3>
            AAA (Enhanced Contrast)
            <Description contrastLevel={contrastLevel} />
          </h3>
        </>
      ) : contrastLevel === "AA" ? (
        <>
          <h3>
            AA (Minimum Contrast)
            <Description contrastLevel={contrastLevel} />
          </h3>
        </>
      ) : (
        <>
          <h3>
            Low Contrast
            <Description contrastLevel={contrastLevel} />
            <button onClick={() => setDisplayLowContrast((prev) => !prev)}>
              {!displayLowContrast
                ? `Show ${colorArray.length} combinations`
                : "Hide combinations"}
            </button>
          </h3>
        </>
      )}

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

                // Check if either background or text should be rendered
                if (!combo[0][0].background || !combo[1][0].text) {
                  return null; // Skip rendering if either condition is false
                }

                return (
                  <ColorCombo
                    key={index}
                    index={index}
                    colour1={`${backgroundRgb}`}
                    colour2={`${textRgb}`}
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
