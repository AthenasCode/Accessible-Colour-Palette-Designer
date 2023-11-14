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
  const [inputValue, setInputValue] = useState(hex);

  const checkBackgroundHandler = () => {
    setHex((prev) => ({ ...prev, background: !prev.background }));
  };

  const checkTextHandler = () => {
    setHex((prev) => ({ ...prev, text: !prev.text }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHex((prev) => ({ ...prev, color: inputValue }));
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
            setInputValue(color.hex);
          }}
          disableAlpha="true"
        />
      </div>
      <section className={styles.colourEditingTools}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="">
            Input hex:{" "}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <button onClick={() => setDisplayColorPicker((prev) => !prev)}>
          {displayColorPicker ? "Done" : "Edit with colour picker"}
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
