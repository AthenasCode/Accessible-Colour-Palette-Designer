import styles from "../page.module.css";

interface DescriptionProps {
  contrastLevel: string;
}

export default function Description({ contrastLevel }: DescriptionProps) {
  const contrastDescriptions = {
    Aaa: "Normal text >= 7:1; Large text >= 4.5:1",
    Aa: "Normal text >= 4.5:1; Large text >= 3:1",
    Low: "Contrast ratio < 3:1",
  };

  return (
    <>
      <span className={styles.contrastDescription}>
        {" "}
        {contrastLevel === "AAA"
          ? contrastDescriptions.Aaa
          : contrastLevel === "AA"
          ? contrastDescriptions.Aa
          : contrastDescriptions.Low}
      </span>
    </>
  );
}
