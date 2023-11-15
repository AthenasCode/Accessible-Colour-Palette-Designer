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

  // console.log(JSON.stringify(colorArray), contrastLevel);
  const filteredArray = colorArray.filter((combo) => {
    return combo[0][0].background && combo[1][0].text;
  });

  console.log(JSON.stringify(filteredArray), contrastLevel);

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
                ? `Show ${filteredArray.length} combinations`
                : "Hide combinations"}
            </button>
          </h3>
        </>
      )}

      <section className={styles.colourCombos}>
        {contrastLevel === "Low" && !displayLowContrast
          ? ""
          : filteredArray.map(
              (
                combo: [[RgbColor, HexColor], [RgbColor, HexColor], number],
                index: number
              ) => {
                const backgroundRgb = combo[0][0].rgb;
                const textRgb = combo[1][0].rgb;
                const backgroundHex = combo[0][1].color;
                const textHex = combo[1][1].color;
                const contrast = combo[2];
                let paired: boolean = true; // true unless bg or text false
                // Check if either background or text should be rendered

                // Check if there is a next color combo
                if (index + 1 < filteredArray.length) {
                  const nextCombo = filteredArray[index + 1];
                  const nextBackgroundRgb = nextCombo[0][0].rgb;
                  const nextTextRgb = nextCombo[1][0].rgb;

                  if (
                    backgroundRgb === nextTextRgb &&
                    textRgb === nextBackgroundRgb
                  ) {
                    console.log("pairing found", backgroundRgb, nextTextRgb);
                    paired = true;
                  } else {
                    console.log(
                      "non-pairing found",
                      backgroundRgb,
                      nextTextRgb
                    );
                    paired = false;
                  }
                }

                return (
                  <ColorCombo
                    paired={paired}
                    key={index}
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
