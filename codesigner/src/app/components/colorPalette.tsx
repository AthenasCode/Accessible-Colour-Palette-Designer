"use client";

import ColorPicker from "./colorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colourContrastCalculator";
import { hexToRgba } from "@uiw/color-convert";
import { Dispatch, SetStateAction } from "react";

interface RgbColor {
  rgb: number[];
}

interface ColorPaletteProps {
  setAaa: Dispatch<
    SetStateAction<[[RgbColor, string], [RgbColor, string], number][]>
  >;
  setAa: Dispatch<
    SetStateAction<[[RgbColor, string], [RgbColor, string], number][]>
  >;
  setLowContrast: Dispatch<
    SetStateAction<[[RgbColor, string], [RgbColor, string], number][]>
  >;
}

export default function ColorPalette({
  setAaa,
  setAa,
  setLowContrast,
}: ColorPaletteProps) {
  const [colour1, setColour1] = useState<string>("#ffd8c0");
  const [colour2, setColour2] = useState<string>("#f48d8f");
  const [colour3, setColour3] = useState<string>("#b06774");
  const [colour4, setColour4] = useState<string>("#564362");
  const [colour5, setColour5] = useState<string>("#2d4156");
  const [colour6, setColour6] = useState<string>("#171f25");

  useEffect(() => {
    // Convert hex to rgb
    const hexColours: string[] = [
      colour1,
      colour2,
      colour3,
      colour4,
      colour5,
      colour6,
    ];

    const rgbColours: RgbColor[] = [];
    hexColours.map((hex) => {
      const { r: r, g: g, b: b } = hexToRgba(hex);
      const rgb = [r, g, b];
      rgbColours.push({
        rgb: rgb,
      });
    });

    const combinations: [[RgbColor, string], [RgbColor, string], number][] = [];

    // Iterate over rgbColours, calculating contrasts
    for (let i = 0; i < rgbColours.length - 1; i++) {
      for (let j = i + 1; j < rgbColours.length; j++) {
        const rgbBg: RgbColor = rgbColours[i]; // Object e.g. {rgb: [13, 22, 53]}
        const rgbTxt: RgbColor = rgbColours[j]; // next colour after i
        const hexBg: string = hexColours[i];
        const hexTxt: string = hexColours[j];
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
  }, [colour1, colour2, colour3, colour4, colour5, colour6]);

  return (
    <section className={styles.paletteSection}>
      <section className={styles.colorPalette}>
        <ColorPicker hex={colour1} setHex={setColour1} />
        <ColorPicker hex={colour2} setHex={setColour2} />
        <ColorPicker hex={colour3} setHex={setColour3} />
        <ColorPicker hex={colour4} setHex={setColour4} />
        <ColorPicker hex={colour5} setHex={setColour5} />
        <ColorPicker hex={colour6} setHex={setColour6} />
      </section>
    </section>
  );
}
