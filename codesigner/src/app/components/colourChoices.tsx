"use client";

import Demo from "./demo";
import styles from "../page.module.css";
import { useState } from "react";

export default function ColourChoices() {
  const [colour1, setColour1] = useState("#475F64");
  const [colour2, setColour2] = useState("#5C2424");
  const [colour3, setColour3] = useState("#506969");
  const [colour4, setColour4] = useState("#203A26");
  const [colour5, setColour5] = useState("#919296");

  return (
    <section>
      <h2>Choose your colours here!</h2>
      <section className={styles.colourChoices}>
        <Demo hex={colour1} setHex={setColour1} />
        <Demo hex={colour2} setHex={setColour2} />
        <Demo hex={colour3} setHex={setColour3} />
        <Demo hex={colour4} setHex={setColour4} />
        <Demo hex={colour5} setHex={setColour5} />
      </section>
    </section>
  );
}
