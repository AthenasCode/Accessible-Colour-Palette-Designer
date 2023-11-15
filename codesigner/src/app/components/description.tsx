interface DescriptionProps {
  contrastLevel: string;
}

export default function Description({ contrastLevel }: DescriptionProps) {
  return (
    <>
      {contrastLevel === "AAA" && (
        <>
          <p>Normal text &gt;= 7:1</p>
          <p>Large text &gt;= 4.5:1</p>
        </>
      )}
      {contrastLevel === "AA" && (
        <>
          <p>Normal text &gt;= 4.5:1</p>
          <p>Large text &gt;= 3:1</p>
        </>
      )}
      {contrastLevel === "Low" && (
        <>
          <p>Contrast ratio &lt; 3:1</p>
        </>
      )}
    </>
  );
}
