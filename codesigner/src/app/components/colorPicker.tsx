"use client";

import { Sketch } from "@uiw/react-color";

import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { SwatchPresetColor } from "@uiw/react-color-swatch";
import ChosenColour from "./chosenColour";
import { useState } from "react";
import styles from "../page.module.css";

export interface SketchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "color"> {
  prefixCls?: string;
  width?: number;
  color?: string | HsvaColor;
  presetColors?: false | SwatchPresetColor[];
  editableDisable?: boolean;
  disableAlpha?: boolean;
  onChange?: (newShade: ColorResult) => void;
}

export default function ColorPicker({
  hex,
  setHex,
  excludeAsBackground,
  excludeAsText,
}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const checkBackgroundHandler = () => {
    setHex((prev) => ({ ...prev, background: !prev.background }));
  };

  const checkTextHandler = () => {
    setHex((prev) => ({ ...prev, text: !prev.text }));
  };

  return (
    <section className={styles.colorPickerSection}>
      <ChosenColour color={hex} />
      <div
        className={styles.colorPicker}
        style={{ display: displayColorPicker ? "block" : "none" }}
      >
        <Sketch
          color={hex}
          onChange={(color) => {
            setHex((prev) => ({ ...prev, color: color.hex }));
          }}
          disableAlpha="true"
        />
      </div>
      <section className={styles.colourPickerButtons}>
        <button onClick={() => setDisplayColorPicker((prev) => !prev)}>
          {displayColorPicker ? "Done" : "Edit color"}
        </button>
        <label htmlFor="">
          <input
            type="checkbox"
            checked={!excludeAsBackground}
            onChange={checkBackgroundHandler}
          />
          Exclude as background
        </label>
        <label htmlFor="">
          <input
            type="checkbox"
            checked={!excludeAsText}
            onChange={checkTextHandler}
          />
          Exclude as text
        </label>
      </section>
    </section>
  );
}

[
  [
    { rgb: [1, 2, 3], background: true, text: true },
    { color: "#000000", background: true, text: true },
  ],
  [
    { rgb: [1, 2, 3], background: true, text: true },
    { color: "#000000", background: true, text: true },
  ],
  "1",
];
