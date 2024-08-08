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
  // Check if the contrast is enough for large text
  // Must be >4.5 for AAA large text
  // Must be >3 for AA large text
  const largeText =
    (contrast > 4.5 && contrastCategory === "AAA") ||
    (contrast > 3 && contrastCategory === "AA")
      ? "✓ Large"
      : "✖ Large";

  // Check if the contrast is enough for normal text
  // Must be >7 for AAA normal text
  // Must be >4.5 for AA normal text
  const normalText =
    (contrast > 7 && contrastCategory === "AAA") ||
    (contrast > 4.5 && contrastCategory === "AA")
      ? "✓ Normal"
      : "✖ Normal";

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
