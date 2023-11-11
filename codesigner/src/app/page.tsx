import styles from "./page.module.css";
import ColourChoices from "./components/colourChoices";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Codesigner</h1>
      <ColourChoices />
    </main>
  );
}
