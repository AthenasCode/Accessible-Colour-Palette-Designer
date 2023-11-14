import styles from "./page.module.css";
import ColorChoices from "./components/colorChoices";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Accessible Colour Palette Designer</h1>
      <ColorChoices />
    </main>
  );
}
