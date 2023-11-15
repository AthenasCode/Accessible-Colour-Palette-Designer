"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import Combinations from "./combinations";
import { Dispatch, SetStateAction } from "react";

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

interface ColorPaletteProps {
  setAaa: Dispatch<
    SetStateAction<[[RgbColor, HexColor], [RgbColor, HexColor], number][]>
  >;
  setAa: Dispatch<
    SetStateAction<[[RgbColor, HexColor], [RgbColor, HexColor], number][]>
  >;
  setLowContrast: Dispatch<
    SetStateAction<[[RgbColor, HexColor], [RgbColor, HexColor], number][]>
  >;
}

export default function ColorPalette({
  setAaa,
  setAa,
  setLowContrast,
}: ColorPaletteProps) {
  const [colour1, setColour1] = useState<HexColor>({
    color: "#ffd8c0",
    background: true,
    text: true,
  });
  const [colour2, setColour2] = useState<HexColor>({
    color: "#f48d8f",
    background: true,
    text: true,
  });
  const [colour3, setColour3] = useState<HexColor>({
    color: "#b06774",
    background: true,
    text: true,
  });
  const [colour4, setColour4] = useState<HexColor>({
    color: "#564362",
    background: true,
    text: true,
  });
  const [colour5, setColour5] = useState<HexColor>({
    color: "#2d4156",
    background: true,
    text: true,
  });
  const [colour6, setColour6] = useState<HexColor>({
    color: "#171f25",
    background: true,
    text: true,
  });
  const [blackText, setBlackText] = useState(false);
  const [blackBg, setBlackBg] = useState(false);
  const [whiteText, setWhiteText] = useState(false);
  const [whiteBg, setWhiteBg] = useState(false);

  useEffect(() => {
    // Convert hex to rgb:
    const hexColours: HexColor[] = [
      colour1,
      colour2,
      colour3,
      colour4,
      colour5,
      colour6,
      ...(blackText
        ? [{ color: "#000000", background: false, text: true }]
        : []),
      ...(blackBg ? [{ color: "#000000", background: true, text: false }] : []),
      ...(whiteText
        ? [{ color: "#FFFFFF", background: false, text: true }]
        : []),
      ...(whiteBg ? [{ color: "#FFFFFF", background: true, text: false }] : []),
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
        const contrastValue: number = contrast(rgbBg, rgbTxt);
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
  }, [
    colour1,
    colour2,
    colour3,
    colour4,
    colour5,
    colour6,
    blackText,
    blackBg,
    whiteText,
    whiteBg,
  ]);

  return (
    <section className={styles.paletteSection}>
      <h2>Colour Palette</h2>
      <section className={styles.colorPalette}>
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
        <section className={styles.blackWhiteToggle}>
          <label htmlFor="black-text-toggle">
            <input
              id="black-text-toggle"
              type="checkbox"
              checked={blackText}
              onChange={() => setBlackText((prev) => !prev)}
            />
            Include black text
          </label>
          <label htmlFor="black-bg-toggle">
            <input
              id="black-bg-toggle"
              type="checkbox"
              checked={blackBg}
              onChange={() => setBlackBg((prev) => !prev)}
            />
            Include black background
          </label>
          <label htmlFor="white-text-toggle">
            <input
              id="white-text-toggle"
              type="checkbox"
              checked={whiteText}
              onChange={() => setWhiteText((prev) => !prev)}
            />
            Include white text
          </label>
          <label htmlFor="white-bg-toggle">
            <input
              id="white-bg-toggle"
              type="checkbox"
              checked={whiteBg}
              onChange={() => setWhiteBg((prev) => !prev)}
            />
            Include white background
          </label>
        </section>
      </section>
      {/* <h3>Your colours:</h3>
      <p>
        {colour1.color}, {colour2.color}, {colour3.color}, {colour4.color},{" "}
        {colour5.color}, {colour6.color}
      </p> */}
    </section>
  );
}
