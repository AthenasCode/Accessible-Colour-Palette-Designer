import styles from "../page.module.css";
import { Dispatch, SetStateAction } from "react";

interface ChosenColorProps {
  color: string;
  setDisplayColorPicker: Dispatch<SetStateAction<boolean>>;
}

export default function ChosenColor({
  color,
  setDisplayColorPicker,
}: ChosenColorProps) {
  return (
    <button
      className={styles.colorDisplay}
      style={{ backgroundColor: color }}
      onClick={() => setDisplayColorPicker((prev) => !prev)}
    ></button>
  );
}
