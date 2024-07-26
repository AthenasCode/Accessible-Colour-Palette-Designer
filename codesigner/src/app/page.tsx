"use client";

import styles from "./page.module.css";
import ColorPalette from "./components/colorPalette";
import CombinationsSection from "./components/combinationsSection";
import { useState } from "react";

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
      <ColorPalette
        setAaa={setAaa}
        setAa={setAa}
        setLowContrast={setLowContrast}
      />
      <CombinationsSection aaa={aaa} aa={aa} lowContrast={lowContrast} />
    </main>
  );
}
