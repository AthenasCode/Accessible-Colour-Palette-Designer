"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import ColorCombo from "./colorCombo";
import Combinations from "./combinations";

export default function ColourChoices() {
  const [colour1, setColour1] = useState("#0d1635");
  const [colour2, setColour2] = useState("#393f59");
  const [colour3, setColour3] = useState("#337a7e");
  const [colour4, setColour4] = useState("#df9d87");
  const [colour5, setColour5] = useState("#fbdeae");
  const [colour6, setColour6] = useState("#efe7d4");
  // const [colourCombinations, setColourCombinations] = useState([]);
  const [aaa, setAaa] = useState([]);
  const [aa, setAa] = useState([]);
  const [displayLowContrast, setDisplayLowContrast] = useState(false);

  const [lowContrast, setLowContrast] = useState([]);

  const { r: r1, g: g1, b: b1 } = hexToRgba(colour1);
  const rgb1 = [r1, g1, b1];
  const { r: r2, g: g2, b: b2 } = hexToRgba(colour2);
  const rgb2 = [r2, g2, b2];

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
        const rgb1 = rgbColours[i];
        const rgb2 = rgbColours[j];
        const contrastValue = contrast(rgb1, rgb2).toFixed(2);
        combinations.push([rgb1, rgb2, contrastValue]);
      }
    }
    combinations.sort((a, b) => b[2] - a[2]); // negative if a < b, positive if a > b
    const aaa = combinations.filter((c) => c[2] >= 4.5);
    const aa = combinations.filter((c) => c[2] < 4.5 && c[2] >= 3);

    const lowContrast = combinations.filter((c) => c[2] < 3);

    setAaa(aaa);
    setAa(aa);
    setLowContrast(lowContrast);
  }, [colour1, colour2, colour3, colour4, colour5]);

  return (
    <section className={styles.pageContent}>
      <section className={styles.colourChoices}>
        <ColorPicker hex={colour1} setHex={setColour1} />
        <ColorPicker hex={colour2} setHex={setColour2} />
        <ColorPicker hex={colour3} setHex={setColour3} />
        <ColorPicker hex={colour4} setHex={setColour4} />
        <ColorPicker hex={colour5} setHex={setColour5} />
        <ColorPicker hex={colour6} setHex={setColour6} />
      </section>
      <section className={styles.combinationsSection}>
        <Combinations contrastLevel={"AAA"} colorArray={aaa} />
        <Combinations contrastLevel={"AA"} colorArray={aa} />
        <Combinations contrastLevel={"Low"} colorArray={lowContrast} />
      </section>
    </section>
  );
}
