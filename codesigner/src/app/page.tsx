"use client";

import styles from "./page.module.css";
import ColorPalette from "./components/colorPalette";
import CombinationsSection from "./components/combinationsSection";
import { useState } from "react";

interface RgbColor {
  rgb: number[];
}

export default function Home() {
  const [aaa, setAaa] = useState<
    [[RgbColor, string], [RgbColor, string], number][]
  >([]);
  const [aa, setAa] = useState<
    [[RgbColor, string], [RgbColor, string], number][]
  >([]);
  const [lowContrast, setLowContrast] = useState<
    [[RgbColor, string], [RgbColor, string], number][]
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
