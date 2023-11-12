"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import Combinations from "./combinations";

export default function ColourChoices() {
  const [colour1, setColour1] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
  const [colour2, setColour2] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
  const [colour3, setColour3] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
  const [colour4, setColour4] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
  const [colour5, setColour5] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
  const [colour6, setColour6] = useState({
    color: "#0d1635",
    background: true,
    text: true,
  });
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
      const { r: r, g: g, b: b } = hexToRgba(colour.color);
      const rgb = [r, g, b];
      rgbColours.push({
        rgb: rgb,
        background: colour.background,
        text: colour.text,
      });
    });

    const combinations = [];

    // Iterate over rgbColours, calculating contrasts
    for (let i = 0; i < rgbColours.length - 1; i++) {
      for (let j = i + 1; j < rgbColours.length; j++) {
        const rgbBg = rgbColours[i]; // Object e.g. {rgb: [13, 22, 53], background: true, text: true}
        const rgbTxt = rgbColours[j]; // next colour after i
        const hexBg = hexColours[i];
        const hexTxt = hexColours[j];
        const contrastValue = contrast(rgbBg, rgbTxt).toFixed(2);
        combinations.push([[rgbBg, hexBg], [rgbTxt, hexTxt], contrastValue]);
      }
    }

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

    setAaa(aaa);
    setAa(aa);
    setLowContrast(lowContrast);
  }, [colour1, colour2, colour3, colour4, colour5, colour6]);

  return (
    <section className={styles.pageContent}>
      <section className={styles.colourChoices}>
        <ColorPicker
          hex={colour1.color}
          setHex={setColour1}
          excludeAsBackground={colour1.background}
          excludeAsText={colour1.text}
        />
        <ColorPicker
          hex={colour2.color}
          setHex={setColour2}
          excludeAsBackground={colour2.background}
          excludeAsText={colour2.text}
        />
        <ColorPicker
          hex={colour3.color}
          setHex={setColour3}
          excludeAsBackground={colour3.background}
          excludeAsText={colour3.text}
        />
        <ColorPicker
          hex={colour4.color}
          setHex={setColour4}
          excludeAsBackground={colour4.background}
          excludeAsText={colour4.text}
        />
        <ColorPicker
          hex={colour5.color}
          setHex={setColour5}
          excludeAsBackground={colour5.background}
          excludeAsText={colour5.text}
        />
        <ColorPicker
          hex={colour6.color}
          setHex={setColour6}
          excludeAsBackground={colour6.background}
          excludeAsText={colour6.text}
        />
        <h2>Colours:</h2>
        <p>
          {colour1.color}, {colour2.color}, {colour3.color}, {colour4.color},{" "}
          {colour5.color}, {colour6.color}
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
