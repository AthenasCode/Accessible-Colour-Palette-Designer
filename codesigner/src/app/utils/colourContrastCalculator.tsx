const RED = 0.2126;
const GREEN = 0.7152;
const BLUE = 0.0722;
const GAMMA = 2.4;

interface RgbColor {
  rgb: number[];
  background: boolean;
  text: boolean;
}

function luminance(...args: number[]): number {
  var a = [args[0], args[1], args[2]].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export default function contrast(rgb1: RgbColor, rgb2: RgbColor): number {
  const colour1 = rgb1.rgb;
  const colour2 = rgb2.rgb;

  var lum1 = luminance(...colour1);
  var lum2 = luminance(...colour2);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}
