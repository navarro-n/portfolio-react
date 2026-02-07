import { useState } from "react";
import Header from "../system/Header/Header";
import Footer from "../system/Footer/Footer";
import Desktop from "../desktop/Desktop";
import styles from "./DesktopLayout.module.css";
import { THEMES } from "../data/themes";

export default function DesktopLayout() {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = THEMES[themeIndex];

  const nextTheme = () => {
    setThemeIndex((i) => (i + 1) % THEMES.length);
  };

  return (
    <div
      className={styles.layout}
      style={{
        "--header-bg": theme.headerBg,
        "--header-fg": theme.headerFg,
        "--desktop-bg": theme.desktopBg,
        "--desktop-image": theme.desktopImage ? `url(${theme.desktopImage})` : "none",
      }}
    >
      <Header headerVariant={theme.headerVariant} onToggleTheme={nextTheme} />
      <main className={styles.desktopArea}>
        <Desktop />
      </main>
      <Footer />
    </div>
  );
}
