"use client";
import styles from "../page.module.css";
import Image from "next/image";

export default function Home() {
  return (
    <main className={styles.main}>
      <p>
        When designing color schemes for a website, it is important to consider
        the color contrast between each color in the palette to ensure that the
        content on your website is easily readable and viewable, particularly
        for people with visual disabilities. The{" "}
        <a href="https://www.w3.org/TR/WCAG21/#contrast-minimum">
          Web Content Accessibility Guidelines (WCAG)
        </a>{" "}
        provide color contrast success criterion to assist designers and
        developers in this regard.
      </p>
      <p>
        Low contrast between text and background makes it very difficult to read
        the text. Here's a visual example: on the left is a low contrast
        combination, and on the right is a high contrast combination. If you're
        lucky, you will be able to read the low contrast text, but not everyone
        can.
      </p>
      <div className={styles.highContrast}>
        <Image src="/images/high-contrast.png" fill alt="High contrast text" />
      </div>
      <div className={styles.lowContrast}>
        <Image src="/images/low-contrast.png" fill alt="Low contrast text" />
      </div>

      <p>
        There are many helpful color palette generators and resources available
        online. <a href="http://a11yrocks.com/colorPalette/">A11y Rocks</a> is a
        tool that I found particularly helpful in my own development experience
        and that inspired the creation of ACPD. I wanted a similar tool that
        would allow for a visual experience of selecting the colors and quick
        fine-tuning.
      </p>
      <ol>
        <li>
          Select colors for your palette using the hex input fields and/or color
          pickers below.
        </li>
        <li>
          Color contrasts between each color in your palette will be generated.
          Each color will be included as both a background color and a text
          color.
        </li>
        <li>
          To exclude colors from the combinations, use the exclude as
          background/text checkboxes accordingly. To exclude a color completely,
          check both exclude as background and exclude as text.
        </li>
        <li>
          Black and white backgrounds and/or text can also be included in the
          combinations by utilising their respective checkboxes.
        </li>
        <li>
          For an ideal color palette, select combinations from the AAA (Enhanced
          Contrast) category. Avoid using low contrast colors (these have been
          hidden by default).
        </li>
      </ol>
      <br />
      <p>
        For more information, see . Feedback via{" "}
        <a href="https://github.com/emoore29">GitHub</a> is welcome!
      </p>
    </main>
  );
}
