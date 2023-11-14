"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import Combinations from "./combinations";

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

export default function ColorChoices() {
  const [colour1, setColour1] = useState<HexColor>({
    color: "#0D1635",
    background: true,
    text: true,
  });
  const [colour2, setColour2] = useState<HexColor>({
    color: "#0A0C18",
    background: true,
    text: true,
  });
  const [colour3, setColour3] = useState<HexColor>({
    color: "#393F59",
    background: true,
    text: true,
  });
  const [colour4, setColour4] = useState<HexColor>({
    color: "#DF9D87",
    background: true,
    text: true,
  });
  const [colour5, setColour5] = useState<HexColor>({
    color: "#337A7E",
    background: true,
    text: true,
  });
  const [colour6, setColour6] = useState<HexColor>({
    color: "#FBDEAE",
    background: true,
    text: true,
  });
  const [black, setBlack] = useState(false);
  const [white, setWhite] = useState(false);
  const [aaa, setAaa] = useState([]);
  const [aa, setAa] = useState([]);
  const [lowContrast, setLowContrast] = useState([]);

  useEffect(() => {
    // Convert hex to rgb:
    const hexColours: HexColor[] = [
      colour1,
      colour2,
      colour3,
      colour4,
      colour5,
      colour6,
      ...(black ? [{ color: "#000000", background: false, text: true }] : []),
      ...(white ? [{ color: "#FFFFFF", background: true, text: true }] : []),
    ];

    const rgbColours: RgbColor[] = [];
    hexColours.map((colour) => {
      const { r: r, g: g, b: b } = hexToRgba(colour.color);
      const rgb = [r, g, b];
      rgbColours.push({
        rgb: rgb,
        background: colour.background,
        text: colour.text,
      });
    });

    const combinations: [[RgbColor, HexColor], [RgbColor, HexColor], number][] =
      [];

    // Iterate over rgbColours, calculating contrasts
    for (let i = 0; i < rgbColours.length - 1; i++) {
      for (let j = i + 1; j < rgbColours.length; j++) {
        const rgbBg: RgbColor = rgbColours[i]; // Object e.g. {rgb: [13, 22, 53], background: true, text: true}
        const rgbTxt: RgbColor = rgbColours[j]; // next colour after i
        const hexBg: HexColor = hexColours[i];
        const hexTxt: HexColor = hexColours[j];
        const contrastValue: number = contrast(rgbBg, rgbTxt).toFixed(2);
        combinations.push([[rgbBg, hexBg], [rgbTxt, hexTxt], contrastValue]);
      }
    }

    // Swap background and text combinations (text becomes bg, bg becomes text)
    combinations.map((combo) => {
      const background = combo[0];
      const text = combo[1];
      const contrastValue = combo[2];

      combinations.push([text, background, contrastValue]);
    });

    // Sort combinations based on contrast
    combinations.sort((a, b) => b[2] - a[2]);

    const aaa = combinations.filter((c) => c[2] >= 4.5);
    const aa = combinations.filter((c) => c[2] < 4.5 && c[2] >= 3);
    const lowContrast = combinations.filter((c) => c[2] < 3);

    setAaa(aaa);
    setAa(aa);
    setLowContrast(lowContrast);
  }, [colour1, colour2, colour3, colour4, colour5, colour6, black, white]);

  return (
    <section className={styles.pageContent}>
      <section className={styles.colorChoices}>
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
        <label htmlFor="">
          <input
            type="checkbox"
            checked={black}
            onChange={() => setBlack((prev) => !prev)}
          />
          Include black text
        </label>
        <label htmlFor="">
          <input
            type="checkbox"
            checked={white}
            onChange={() => setWhite((prev) => !prev)}
          />
          Include white text and background
        </label>
        <h2>Your colours:</h2>
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
