"use client";

import { Sketch } from "@uiw/react-color";
import { Dispatch, SetStateAction } from "react";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { SwatchPresetColor } from "@uiw/react-color-swatch";
import ChosenColour from "./chosenColour";
import { useState } from "react";
import styles from "../page.module.css";

// SketchProps retrieved from https://uiwjs.github.io/react-color/
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

interface ColorPickerProps {
  hex: string;
  setHex: Dispatch<SetStateAction<string>>;
}

export default function ColorPicker({ hex, setHex }: ColorPickerProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [inputValue, setInputValue] = useState(hex);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates the color of the color picker when user changes the hex input (if the input is valid)
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);

    if (/^#([0-9A-F]{3}){1,2}$/i.test(newValue)) {
      // Process the valid hex code
      setHex(newValue);
    }
  };

  return (
    <section className={styles.colorPickerSection}>
      <ChosenColour color={hex} setDisplayColorPicker={setDisplayColorPicker} />
      <div
        className={styles.colorPicker}
        style={{ display: displayColorPicker ? "block" : "none" }}
      >
        <Sketch
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            setInputValue(color.hex);
          }}
          disableAlpha={true}
        />
      </div>
      <section className={styles.colourEditingTools}>
        <label htmlFor="hexInput">
          <input
            id="hexInput"
            maxLength={6}
            type="text"
            value={inputValue.toUpperCase()}
            onChange={(e) => handleInputChange(e)}
          />
        </label>
      </section>
    </section>
  );
}
