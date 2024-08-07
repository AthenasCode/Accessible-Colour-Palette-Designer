import styles from "../page.module.css";

interface ColorComboProps {
  color1: string;
  color2: string;
  contrast: number;
  contrastCategory: string;
}

export default function ColorCombination({
  color1,
  color2,
  contrast,
  contrastCategory,
}: ColorComboProps) {
  const largeText =
    (contrast > 4.5 && contrastCategory === "AAA") ||
    (contrast > 3 && contrastCategory === "AA")
      ? "Large"
      : "Normal";

  const normalText =
    (contrast > 7 && contrastCategory === "AAA") ||
    (contrast > 4.5 && contrastCategory === "AA")
      ? "Normal"
      : "";

  return (
    <div
      className={styles.colorCombination}
      style={{
        backgroundColor: `rgb(${color1})`,
        color: `rgb(${color2})`,
      }}
    >
      <p className={styles.largeText}>{largeText}</p>
      {normalText && <p className={styles.normalText}>{normalText}</p>}
      <p className={styles.contrast}>{contrast.toFixed(1)}</p>
    </div>
  );
}
