import styles from "../page.module.css";

interface ColorComboProps {
  colour1: string;
  colour2: string;
  contrast: number;
  contrastLevel: string;
  paired: boolean;
}

export default function ColorCombo({
  colour1,
  colour2,
  contrast,
  contrastLevel,
  paired,
}: ColorComboProps) {
  return (
    <section
      className={`${
        paired
          ? styles.colorCombinationPaired
          : styles.colorCombinationNotPaired
      }`}
    >
      <div
        className={styles.colorCombinationDisplay}
        style={{ backgroundColor: `rgb(${colour1})`, color: `rgb(${colour2})` }}
      >
        {contrast > 4.5 && contrastLevel === "AAA" ? (
          <>
            <p className={styles.largeText}>Large</p>
          </>
        ) : contrast > 3 && contrastLevel === "AA" ? (
          <>
            <p className={styles.largeText}>Large</p>
          </>
        ) : (
          "Normal"
        )}
        {contrast > 7 && contrastLevel === "AAA" ? (
          <p className={styles.normalText}>Normal</p>
        ) : contrast > 4.5 && contrastLevel === "AA" ? (
          <p className={styles.normalText}>Normal</p>
        ) : (
          ""
        )}
        <p className={styles.contrast}>{contrast.toFixed(1)}</p>
      </div>
    </section>
  );
}
