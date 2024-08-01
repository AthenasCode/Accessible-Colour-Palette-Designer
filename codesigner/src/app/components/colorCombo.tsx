import styles from "../page.module.css";

interface ColorComboProps {
  colour1: string;
  colour2: string;
  hex1: string;
  hex2: string;
  contrast: number;
  contrastLevel: string;
  paired: boolean;
}

export default function ColorCombo({
  colour1,
  colour2,
  hex1,
  hex2,
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
            <svg height="30" width="30">
              <circle
                cx="15"
                cy="15"
                r="10"
                stroke={`rgb(${colour2})`}
                strokeWidth="3"
                fill={`rgb(${colour2})`}
              />
            </svg>
          </>
        ) : (
          "Hard to read"
        )}
        {contrast > 7 && contrastLevel === "AAA" ? (
          <p className={styles.normalText}>Easy to read</p>
        ) : contrast > 4.5 && contrastLevel === "AA" ? (
          <p className={styles.normalText}>Normal</p>
        ) : (
          ""
        )}
        <p className={styles.contrast}>{contrast.toFixed(1)}</p>
      </div>
      <h4 className={styles.visuallyHidden}>Info:</h4>
      <h5>Background:</h5>
      <p>
        {colour1} <br />
        {hex1}
      </p>
      <h5>Text:</h5>
      <p>
        {colour2} <br />
        {hex2}
      </p>
    </section>
  );
}
