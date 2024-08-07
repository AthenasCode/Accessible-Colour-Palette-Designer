import Combinations from "./combinations";
import styles from "../page.module.css";

interface HexColor {
  color: string;
}

interface RgbColor {
  rgb: number[];
}

interface CombinationsSectionProps {
  aaa: [[RgbColor, HexColor], [RgbColor, HexColor], number][];
  aa: [[RgbColor, HexColor], [RgbColor, HexColor], number][];
  lowContrast: [[RgbColor, HexColor], [RgbColor, HexColor], number][];
}

export default function CombinationsSection({
  aaa,
  aa,
  lowContrast,
}: CombinationsSectionProps) {
  return (
    <section className={styles.combinationsSection}>
      <h2>Contrasts</h2>
      <Combinations contrastLevel={"AAA"} colorArray={aaa} />
      <Combinations contrastLevel={"AA"} colorArray={aa} />
      <Combinations contrastLevel={"Low"} colorArray={lowContrast} />
    </section>
  );
}
