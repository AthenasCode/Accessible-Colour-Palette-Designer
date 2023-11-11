export default function Description({ contrastLevel }) {
  return (
    <>
      {contrastLevel === "AAA" && (
        <>
          <h4>Normal text</h4>
          <p>Contrast ratio of at least 7:1</p>
          <h4>Large text</h4>
          <p>Contrast ratio of at least 4.5:1</p>
        </>
      )}
      {contrastLevel === "AA" && (
        <>
          <h4>Normal text</h4>
          <p>Contrast ratio of at least 4.5:1</p>
          <h4>Large text</h4>
          <p>Contrast ratio of at least 3:1</p>
        </>
      )}
      {contrastLevel === "Low" && (
        <>
          <p>Contrast ratio is less than 3:1</p>
        </>
      )}
    </>
  );
}
