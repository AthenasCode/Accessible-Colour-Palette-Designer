"use client";

import Demo from "./demo";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import ColorCombo from "./colorCombo";

export default function ColourChoices() {
  const [colour1, setColour1] = useState("#475F64");
  const [colour2, setColour2] = useState("#5C2424");
  const [colour3, setColour3] = useState("#506969");
  const [colour4, setColour4] = useState("#203A26");
  const [colour5, setColour5] = useState("#919296");
  const [colour6, setColour6] = useState("#919296");
  // const [colourCombinations, setColourCombinations] = useState([]);
  const [aaa, setAaa] = useState([]);
  const [aa, setAa] = useState([]);
  const [aaNonText, setAaNonText] = useState([]);
  const [lowContrast, setLowContrast] = useState([]);

  const { r: r1, g: g1, b: b1 } = hexToRgba(colour1);
  const rgb1 = [r1, g1, b1];
  const { r: r2, g: g2, b: b2 } = hexToRgba(colour2);
  const rgb2 = [r2, g2, b2];

  useEffect(() => {
    // Convert hex to rgb:
    const hexColours = [colour1, colour2, colour3, colour4, colour5];
    const rgbColours = [];
    hexColours.map((colour) => {
      const { r: r, g: g, b: b } = hexToRgba(colour);
      const rgb = [r, g, b];
      rgbColours.push(rgb);
    });

    console.log(rgbColours);

    const combinations = [];

    // Iterate over rgbColours, calculating contrasts
    for (let i = 0; i < rgbColours.length - 1; i++) {
      for (let j = i + 1; j < rgbColours.length; j++) {
        const rgb1 = rgbColours[i];
        const rgb2 = rgbColours[j];
        const contrastValue = contrast(rgb1, rgb2).toFixed(2);
        combinations.push([rgb1, rgb2, contrastValue]);
      }
    }
    combinations.sort((a, b) => b[2] - a[2]); // negative if a < b, positive if a > b
    const aaa = combinations.filter((c) => c[2] >= 4.5);
    const aa = combinations.filter((c) => c[2] < 4.5 && c[2] > 3);
    const aaNonText = combinations.filter((c) => c[2] === 3);
    const lowContrast = combinations.filter((c) => c[2] < 3);

    setAaa(aaa);
    setAa(aa);
    setAaNonText(aaNonText);
    setLowContrast(lowContrast);
  }, [colour1, colour2, colour3, colour4, colour5]);

  return (
    <section>
      <section className={styles.colourChoices}>
        <Demo hex={colour1} setHex={setColour1} />
        <Demo hex={colour2} setHex={setColour2} />
        <Demo hex={colour3} setHex={setColour3} />
        <Demo hex={colour4} setHex={setColour4} />
        <Demo hex={colour5} setHex={setColour5} />
        <Demo hex={colour6} setHex={setColour6} />
      </section>
      <h2>AAA normal/large text</h2>
      <p>(contrast greater than 4.5 : 1)</p>
      <section className={styles.colourCombos}>
        {aaa.map((combo) => {
          return (
            <ColorCombo
              colour1={`rgb(${combo[0]})`}
              colour2={`rgb(${combo[1]})`}
              contrast={`${combo[2]}`}
            />
          );
        })}
      </section>

      <h2>AA normal/large text</h2>
      <p>(contrast between 3 : 1 and 4.5 : 1)</p>
      <section className={styles.colourCombos}>
        {aa.map((combo) => {
          return (
            <ColorCombo
              colour1={`rgb(${combo[0]})`}
              colour2={`rgb(${combo[1]})`}
              contrast={`${combo[2]}`}
            />
          );
        })}
      </section>

      <h2>AA non-text: 3 : 1</h2>
      <p>(Combinations at 3 : 1)</p>
      <section className={styles.colourCombos}>
        {aaNonText.map((combo) => {
          return (
            <ColorCombo
              colour1={`rgb(${combo[0]})`}
              colour2={`rgb(${combo[1]})`}
              contrast={`${combo[2]}`}
            />
          );
        })}
      </section>

      <h2>Low contrast combinations</h2>
      <p>(combinations less than 3 : 1)</p>
      <section className={styles.colourCombos}>
        {lowContrast.map((combo) => {
          return (
            <ColorCombo
              colour1={`rgb(${combo[0]})`}
              colour2={`rgb(${combo[1]})`}
              contrast={`${combo[2]}`}
            />
          );
        })}
      </section>

      <button>(hide low contrast combinations)</button>
    </section>
  );
}
