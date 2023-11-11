"use client";

import { Sketch } from "@uiw/react-color";

import { HsvaColor, ColorResult } from "@uiw/color-convert";
import { SwatchPresetColor } from "@uiw/react-color-swatch";
import ChosenColour from "./chosenColour";
import { useState } from "react";

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
    <>
      <ChosenColour color={hex} />
      <button onClick={() => setDisplayColorPicker((prev) => !prev)}>
        Edit color
      </button>
      <div style={{ display: displayColorPicker ? "block" : "none" }}>
        <Sketch
          style={{
            marginLeft: 20,
          }}
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
          }}
          disableAlpha="true"
        />
      </div>
    </>
  );
}
