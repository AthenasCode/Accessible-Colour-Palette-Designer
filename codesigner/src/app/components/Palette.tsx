"use client";

import ColorPicker from "./ColorPicker";
import styles from "../page.module.css";
import { useEffect, useState } from "react";
import contrast from "../utils/colorContrastCalculator";
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

export default function Palette({
  setAaa,
  setAa,
  setLowContrast,
}: ColorPaletteProps) {
  const [color1, setColor1] = useState<string>("ffd8c0");
  const [color2, setColor2] = useState<string>("f48d8f");
  const [color3, setColor3] = useState<string>("b06774");
  const [color4, setColor4] = useState<string>("564362");
  const [color5, setColor5] = useState<string>("2d4156");
  const [color6, setColor6] = useState<string>("171f25");

  useEffect(() => {
    // Convert hex to rgb
    const hexColors: string[] = [
      color1,
      color2,
      color3,
      color4,
      color5,
      color6,
    ];

    const rgbColors: RgbColor[] = [];
    hexColors.map((hex) => {
      hex = "#" + hex;
      const { r: r, g: g, b: b } = hexToRgba(hex);
      const rgb = [r, g, b];
      rgbColors.push({
        rgb: rgb,
      });
    });

    const combinations: [[RgbColor, string], [RgbColor, string], number][] = [];

    // Iterate over rgbColors, calculating contrasts
    for (let i = 0; i < rgbColors.length - 1; i++) {
      for (let j = i + 1; j < rgbColors.length; j++) {
        const rgbBg: RgbColor = rgbColors[i]; // Object e.g. {rgb: [13, 22, 53]}
        const rgbTxt: RgbColor = rgbColors[j]; // next color after i
        const hexBg: string = hexColors[i];
        const hexTxt: string = hexColors[j];
        const contrastValue: number = contrast(rgbBg, rgbTxt);
        combinations.push([[rgbBg, hexBg], [rgbTxt, hexTxt], contrastValue]);
      }
    }

    // Sort combinations based on contrast
    combinations.sort((a, b) => b[2] - a[2]);

    const aaa = combinations.filter((c) => c[2] >= 4.5);
    const aa = combinations.filter((c) => c[2] < 4.5 && c[2] >= 3);
    const lowContrast = combinations.filter((c) => c[2] < 3);

    setAaa(aaa);
    setAa(aa);
    setLowContrast(lowContrast);

    // TODO: Save color palette to local storage or provide option to user to save.
  }, [color1, color2, color3, color4, color5, color6]);

  return (
    <section className={styles.paletteSection}>
      <section className={styles.colorPalette}>
        <ColorPicker hex={color1} setHex={setColor1} />
        <ColorPicker hex={color2} setHex={setColor2} />
        <ColorPicker hex={color3} setHex={setColor3} />
        <ColorPicker hex={color4} setHex={setColor4} />
        <ColorPicker hex={color5} setHex={setColor5} />
        <ColorPicker hex={color6} setHex={setColor6} />
      </section>
    </section>
  );
}
