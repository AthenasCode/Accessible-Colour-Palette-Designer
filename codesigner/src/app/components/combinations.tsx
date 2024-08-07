import styles from "../page.module.css";
import ColorCombo from "./colorCombo";
import { useState } from "react";
import Description from "./description";

interface HexColor {
  color: string;
}

interface RgbColor {
  rgb: number[];
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

  // const filteredArray = colorArray.filter((combo) => {
  //   return combo[0][0].background && combo[1][0].text;
  // });

  return (
    <section>
      {contrastLevel === "AAA" ? (
        <>
          <h3>Enhanced (AAA)</h3>
        </>
      ) : contrastLevel === "AA" ? (
        <>
          <h3>Minimum (AA)</h3>
        </>
      ) : (
        <>
          <h3>
            Low
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
                const contrast = combo[2];
                let paired: boolean = true; // true unless bg or text false
                // Check if either background or text should be rendered

                // Check if there is a next color combo
                if (index + 1 < colorArray.length) {
                  const nextCombo = colorArray[index + 1];
                  const nextBackgroundRgb = nextCombo[0][0].rgb;
                  const nextTextRgb = nextCombo[1][0].rgb;

                  if (
                    backgroundRgb === nextTextRgb &&
                    textRgb === nextBackgroundRgb
                  ) {
                    paired = true;
                  } else {
                    paired = false;
                  }
                }

                return (
                  <ColorCombo
                    paired={paired}
                    key={index}
                    colour1={`${backgroundRgb}`}
                    colour2={`${textRgb}`}
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
