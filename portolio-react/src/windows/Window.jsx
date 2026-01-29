import styles from './Window.module.css';
import useDrag from '../hooks/useDrag';

let topZIndex = 10;

export default function Window({ title, children, onClose }) {
  const { position, onMouseDown, zIndex } = useDrag({ x: 120, y: 120 });

  return (
    <div
      className={styles.window}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex
      }}
      onMouseDown={() => (topZIndex++, null)}
    >
      <div
        className={styles.titleBar}
        onMouseDown={onMouseDown}
      >
        <div className={styles.controls}>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close window"
          />
        </div>

        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
