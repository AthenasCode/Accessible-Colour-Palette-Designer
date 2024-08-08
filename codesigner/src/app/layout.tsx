"use client";

import type { Metadata } from "next";
import { Capriola } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "./layout.module.css";
import { usePathname } from "next/navigation";

const capriola = Capriola({ weight: "400", subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Accessible Color Palette Designer",
//   description:
//     "A color palette designer that calculates and displays color contrasts.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={capriola.className}>
        <header className={styles.header}>
          <h1 className={styles.title}>acpd</h1>
          <nav className={styles.nav}>
            <ul>
              <li>
                <Link
                  href={"/about"}
                  className={pathname == `/about` ? `${styles.activeLink}` : ""}
                >
                  about
                </Link>
              </li>
              <li>
                <Link
                  href={"/"}
                  className={pathname == `/` ? `${styles.activeLink}` : ""}
                >
                  palette
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
