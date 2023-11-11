import styles from "../page.module.css";

export default function ChosenColour({ color }) {
  return (
    <div
      className={styles.colorDisplay}
      style={{ backgroundColor: color }}
    ></div>
  );
}
