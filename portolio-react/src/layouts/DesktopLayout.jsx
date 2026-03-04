import { useMemo, useState } from "react";
import Header from "../system/Header/Header";
import Footer from "../system/Footer/Footer";
import Desktop from "../desktop/Desktop";
import styles from "./DesktopLayout.module.css";
import { THEMES } from "../data/themes";
import usePreloadImages from "../hooks/usePreloadImages";

function preloadOne(url) {
  return new Promise((resolve) => {
    if (!url) return resolve();
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = url;
  });
}

export default function DesktopLayout() {
  const [themeIndex, setThemeIndex] = useState(0);
  const theme = THEMES[themeIndex];

  const wallpapers = useMemo(
    () => THEMES.map((t) => t.desktopImage).filter(Boolean),
    []
  );
  usePreloadImages(wallpapers);

  const nextTheme = async () => {
    const nextIndex = (themeIndex + 1) % THEMES.length;
    const next = THEMES[nextIndex];

    await preloadOne(next.desktopImage);
    setThemeIndex(nextIndex);
  };

  return (
    <div
      className={styles.layout}
      style={{
        "--header-bg": theme.headerBg,
        "--header-fg": theme.headerFg,
        "--desktop-bg": theme.desktopBg,
        "--desktop-image": theme.desktopImage ? `url(${theme.desktopImage})` : "none",

        "--footer-fg": theme.footerFg ?? "#888585",
        "--footer-shadow": theme.footerShadow ?? "none",

        "--icon-label-fg": theme.iconLabelFg,
        "--icon-label-shadow": theme.iconLabelShadow,
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