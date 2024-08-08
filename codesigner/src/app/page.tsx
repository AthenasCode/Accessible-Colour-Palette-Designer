"use client";

import styles from "./page.module.css";
import ContrastSection from "./components/ContrastSection";
import { useState } from "react";
import Palette from "./components/Palette";
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
      <Palette setAaa={setAaa} setAa={setAa} setLowContrast={setLowContrast} />
      <ContrastSection aaa={aaa} aa={aa} lowContrast={lowContrast} />
    </main>
  );
}
