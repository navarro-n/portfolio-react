import styles from './Window.module.css';
import useDrag from '../hooks/useDrag';

export default function Window({
  title,
  children,
  onClose,
  initial = { x: 120, y: 120 },
  width,
}) {
  const { position, onMouseDown } = useDrag(initial);

  return (
    <div
      className={styles.window}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: width ? `${width}px` : undefined,
      }}
    >
      <div className={styles.titleBar} onMouseDown={onMouseDown}>
        <div className={styles.controls}>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close window"
          />
        </div>

        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
