"use client";

import styles from "./page.module.css";
import ColorPalette from "./components/colorPalette";
import CombinationsSection from "./components/combinationsSection";
import { useEffect, useState } from "react";

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

export default function Home() {
  const [aaa, setAaa] = useState<
    [[RgbColor, HexColor], [RgbColor, HexColor], number][]
  >([]);
  const [aa, setAa] = useState<
    [[RgbColor, HexColor], [RgbColor, HexColor], number][]
  >([]);
  const [lowContrast, setLowContrast] = useState<
    [[RgbColor, HexColor], [RgbColor, HexColor], number][]
  >([]);

  return (
    <main className={styles.main}>
      <header>
        <h1>Accessible Colour Palette Designer</h1>
        <p>
          For more information, see{" "}
          <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">
            Web Content Accessibility Guidelines (WCAG)
          </a>
          .
        </p>
      </header>
      <ColorPalette
        setAaa={setAaa}
        setAa={setAa}
        setLowContrast={setLowContrast}
      />
      <CombinationsSection aaa={aaa} aa={aa} lowContrast={lowContrast} />
    </main>
  );
}
