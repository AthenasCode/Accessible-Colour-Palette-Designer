import Combinations from "./combinations";
import styles from "../page.module.css";

interface RgbColor {
  rgb: number[];
}

interface CombinationsSectionProps {
  aaa: [[RgbColor, string], [RgbColor, string], number][];
  aa: [[RgbColor, string], [RgbColor, string], number][];
  lowContrast: [[RgbColor, string], [RgbColor, string], number][];
}

export default function CombinationsSection({
  aaa,
  aa,
  lowContrast,
}: CombinationsSectionProps) {
  return (
    <section className={styles.combinationsSection}>
      <h2>Contrasts</h2>
      <Combinations contrastCategory={"AAA"} colorArray={aaa} />
      <Combinations contrastCategory={"AA"} colorArray={aa} />
      <Combinations contrastCategory={"Low"} colorArray={lowContrast} />
    </section>
  );
}
