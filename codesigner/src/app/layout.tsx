import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Accessible Colour Palette Designer",
  description:
    "A colour palette designer that calculates and displays colour contrasts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className={styles.header}>
          <h1 className={styles.title}>acpd</h1>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link href={"/about"}>about</Link>
                <Link href={"/"}>playground</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
