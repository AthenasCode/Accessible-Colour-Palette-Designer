import styles from "../page.module.css";

interface ChosenColorProps {
  color: string;
}

export default function ChosenColor({ color }: ChosenColorProps) {
  return (
    <div
      className={styles.colorDisplay}
      style={{ backgroundColor: color }}
    ></div>
  );
}
