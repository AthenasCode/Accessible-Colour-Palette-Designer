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

export default function Demo({ hex, setHex }) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  return (
    <section className={styles.colorPickerSection}>
      <ChosenColour color={hex} />
      <button onClick={() => setDisplayColorPicker((prev) => !prev)}>
        {displayColorPicker ? "Done" : "Edit color"}
      </button>
      <div
        className={styles.colorPicker}
        style={{ display: displayColorPicker ? "block" : "none" }}
      >
        <Sketch
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
          disableAlpha="true"
        />
      </div>
    </section>
  );
}
