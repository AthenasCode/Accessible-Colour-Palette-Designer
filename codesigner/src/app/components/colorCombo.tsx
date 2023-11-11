import styles from "../page.module.css";

export default function ColorCombo({
  colour1,
  colour2,
  contrast,
  contrastLevel,
}) {
  return (
    <div
      className={styles.colorCombinationDisplay}
      style={{ backgroundColor: colour1, color: colour2 }}
    >
      {contrast > 4.5 && contrastLevel === "AAA" ? (
        <>
          <p className={styles.largeText}>Large scale</p>
        </>
      ) : contrast > 3 && contrastLevel === "AA" ? (
        <>
          <p className={styles.largeText}>Large scale</p>
          <svg height="100" width="100">
            <circle
              cx="15"
              cy="15"
              r="10"
              stroke={`${colour2}`}
              stroke-width="3"
              fill={`${colour2}`}
            />
          </svg>
        </>
      ) : (
        "Low contrast"
      )}
      {contrast > 7 && contrastLevel === "AAA" ? (
        <p className={styles.normalText}>Normal</p>
      ) : contrast > 4.5 && contrastLevel === "AA" ? (
        <p className={styles.normalText}>Normal</p>
      ) : (
        ""
      )}

      <p className={styles.contrast}>{contrast}</p>
    </div>
  );
}
