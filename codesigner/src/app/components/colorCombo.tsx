import styles from "../page.module.css";

export default function ColorCombo({ colour1, colour2, contrast }) {
  return (
    <div
      className={styles.colorCombinationDisplay}
      style={{ backgroundColor: colour1, color: colour2 }}
    >
      <p>Contrast is {contrast}</p>
    </div>
  );
}
