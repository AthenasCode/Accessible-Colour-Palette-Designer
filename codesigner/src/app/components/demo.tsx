"use client";

import { Sketch } from "@uiw/react-color";

export default function Demo({ hex, setHex }) {
  return (
    <Sketch
      style={{ marginLeft: 20 }}
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
      }}
    />
  );
}
