import ContrastCategory from "./ContrastCategory";
import styles from "../page.module.css";

interface RgbColor {
  rgb: number[];
}

interface CombinationsSectionProps {
  aaa: [[RgbColor, string], [RgbColor, string], number][];
  aa: [[RgbColor, string], [RgbColor, string], number][];
  lowContrast: [[RgbColor, string], [RgbColor, string], number][];
}

export default function ContrastSection({
  aaa,
  aa,
  lowContrast,
}: CombinationsSectionProps) {
  return (
    <section className={styles.contrastSection}>
      <h2>Contrasts</h2>
      <ContrastCategory contrastCategory={"AAA"} colorArray={aaa} />
      <ContrastCategory contrastCategory={"AA"} colorArray={aa} />
      <ContrastCategory contrastCategory={"Low"} colorArray={lowContrast} />
    </section>
  );
}
