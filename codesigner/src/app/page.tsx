import styles from "./page.module.css";
import ColourChoices from "./components/colourChoices";
import ColourCombinations from "./components/colourCombinations";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Welcome to Codesigner!</h1>
      <p>
        Codesigner was made to help designers choose accessible colours easily.
      </p>
      <ColourChoices />
      <button>Combine</button>
      <ColourCombinations />
    </main>
  );
}
