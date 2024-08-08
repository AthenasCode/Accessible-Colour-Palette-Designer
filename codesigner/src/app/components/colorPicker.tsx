"use client";

import { Sketch } from "@uiw/react-color";
import { Dispatch, SetStateAction } from "react";
import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { SwatchPresetColor } from "@uiw/react-color-swatch";
import { useState } from "react";
import styles from "../page.module.css";
import { useRef, useEffect } from "react";

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
  const [displaySketch, setDisplaySketch] = useState(false);
  const [inputValue, setInputValue] = useState(hex);
  const [invalidHex, setInvalidHex] = useState(false);
  const sketch = useRef<HTMLDivElement | null>(null);

  const clickOutsideSketch = (e: MouseEvent) => {
    // If sketch is displayed, sketch exists, and clicked element is outside sketch
    // "as Node" asserts that e.target is a Node so the contains method can be used
    if (
      displaySketch &&
      sketch.current &&
      !sketch.current.contains(e.target as Node)
    ) {
      setDisplaySketch(false);
    }
  };

  useEffect(() => {
    // Add mousedown event listener when the component mounts or displaySketch changes
    document.addEventListener("mousedown", clickOutsideSketch);

    // Cleanup function to remove the mousedown event listener when the component unmounts
    // or before the effect runs again if displaySketch changes
    // This prevents potential memory leaks by ensuring the event listener is properly removed
    // so it is not running and trying to update the Sketch state when, for example, we are on the about page
    return () => {
      document.removeEventListener("mousedown", clickOutsideSketch);
    };
  }, [displaySketch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Updates the color of the color picker when user changes the hex input (if the input is valid)
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);

    if (/^([0-9A-F]{3}){1,2}$/i.test(newValue)) {
      // Regex validates that the input is a valid Hex code
      setHex(newValue);
      setInvalidHex(false);
    } else {
      setInvalidHex(true);
    }
  };

  return (
    <section ref={sketch} className={styles.colorPickerSection}>
      <button
        className={styles.colorDisplay}
        style={{ backgroundColor: "#" + hex }}
        onClick={() => setDisplaySketch((prev) => !prev)}
      ></button>
      <div
        className={styles.colorPicker}
        style={{ display: displaySketch ? "block" : "none" }}
      >
        <Sketch
          color={hex}
          onChange={(color) => {
            const code = color.hex.substring(1);
            setHex(code);
            setInputValue(code);
          }}
          disableAlpha={true}
        />
      </div>
      <section className={styles.colorEditingTools}>
        <label htmlFor="hexInput">
          <input
            id="hexInput"
            className={styles.hexInput}
            maxLength={6}
            type="text"
            value={inputValue.toUpperCase()}
            onChange={(e) => handleInputChange(e)}
          />
          {invalidHex && <div className={styles.invalidHex}>*Invalid hex</div>}
        </label>
      </section>
    </section>
  );
}
