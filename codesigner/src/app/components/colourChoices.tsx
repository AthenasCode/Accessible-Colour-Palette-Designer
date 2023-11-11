"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import Combinations from "./combinations";

export default function ColourChoices() {
  const [colour1, setColour1] = useState("#0d1635");
  const [colour2, setColour2] = useState("#393f59");
  const [colour3, setColour3] = useState("#337a7e");
  const [colour4, setColour4] = useState("#df9d87");
  const [colour5, setColour5] = useState("#fbdeae");
  const [colour6, setColour6] = useState("#efe7d4");
  const [aaa, setAaa] = useState([]);
  const [aa, setAa] = useState([]);
  const [excludeAsBackground, setExcludeAsBackground] = useState(false);
  const [excludeAsText, setExcludeAsText] = useState(false);

  const [lowContrast, setLowContrast] = useState([]);

  useEffect(() => {
    // Convert hex to rgb:
    const hexColours = [colour1, colour2, colour3, colour4, colour5, colour6];
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
        const rgbBg = rgbColours[i];
        const rgbTxt = rgbColours[j];
        const hexBg = hexColours[i];
        const hexTxt = hexColours[j];
        const contrastValue = contrast(rgbBg, rgbTxt).toFixed(2);
        combinations.push([[rgbBg, hexBg], [rgbTxt, hexTxt], contrastValue]);
      }
    }

    console.log(combinations);

    // Swap colours in each combination (to account for background/text swaps)
    combinations.map((combo) => {
      const colour1 = combo[0];
      const colour2 = combo[1];
      const contrast = combo[2];

      combinations.push([colour2, colour1, contrast]);
    });

    combinations.sort((a, b) => b[2] - a[2]); // negative if a < b, positive if a > b

    const aaa = combinations.filter((c) => c[2] >= 4.5);
    const aa = combinations.filter((c) => c[2] < 4.5 && c[2] >= 3);
    const lowContrast = combinations.filter((c) => c[2] < 3);
    console.log("combinations", combinations);
    setAaa(aaa);
    setAa(aa);
    setLowContrast(lowContrast);
  }, [colour1, colour2, colour3, colour4, colour5, colour6]);

  return (
    <section className={styles.pageContent}>
      <section className={styles.colourChoices}>
        <ColorPicker
          hex={colour1}
          setHex={setColour1}
          excludeAsBackground={excludeAsBackground}
          setExcludeAsBackground={setExcludeAsBackground}
          excludeAsText={excludeAsText}
          setExcludeAsText={setExcludeAsText}
        />
        <ColorPicker hex={colour2} setHex={setColour2} />
        <ColorPicker hex={colour3} setHex={setColour3} />
        <ColorPicker hex={colour4} setHex={setColour4} />
        <ColorPicker hex={colour5} setHex={setColour5} />
        <ColorPicker hex={colour6} setHex={setColour6} />
        <h2>Colours:</h2>
        <p>
          {colour1}, {colour2}, {colour3}, {colour4}, {colour5}, {colour6}
        </p>
      </section>
      <section className={styles.combinationsSection}>
        <Combinations contrastLevel={"AAA"} colorArray={aaa} />
        <Combinations contrastLevel={"AA"} colorArray={aa} />
        <Combinations contrastLevel={"Low"} colorArray={lowContrast} />
      </section>
    </section>
  );
}
