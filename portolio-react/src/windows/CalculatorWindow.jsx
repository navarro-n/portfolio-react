import Window from "./Window";
import styles from "./CalculatorWindow.module.css";
import Calculator from "../components/Calculator/Calculator";

export default function CalculatorWindow({ onClose, bounds }) {
  const isSmall = (bounds?.width ?? 0) < 900;

  const width = isSmall ? Math.min(290, (bounds?.width ?? 360) - 20) : 290;
  const height = isSmall ? Math.min(420, (bounds?.height ?? 640) - 20) : 420;

  return (
    <Window
      title=""
      onClose={onClose}
      bounds={bounds}
      width={width}
      height={height}
      rect={{ w: width, h: height }}
      initial={isSmall ? { x: 10, y: 10 } : { x: 520, y: 90 }}
      windowClassName={styles.windowSkin}
      titleBarClassName={styles.titleBarSkin}
      contentClassName={styles.contentSkin}
    >
      <div className={styles.body}>
        <Calculator />
      </div>
    </Window>
  );
}