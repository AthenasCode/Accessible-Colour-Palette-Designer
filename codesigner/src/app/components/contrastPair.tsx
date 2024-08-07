import styles from "../page.module.css";
import ColorCombination from "./colorCombination";

interface ColorComboProps {
  color1: string;
  color2: string;
  contrast: number;
  contrastCategory: string;
}

export default function ContrastPair({
  color1,
  color2,
  contrast,
  contrastCategory,
}: ColorComboProps) {
  return (
    <section className={styles.colorPair}>
      <ColorCombination
        color1={color1}
        color2={color2}
        contrast={contrast}
        contrastCategory={contrastCategory}
      />
      <ColorCombination
        color1={color2}
        color2={color1}
        contrast={contrast}
        contrastCategory={contrastCategory}
      />
    </section>
  );
}
