import styles from './DesktopIcon.module.css';
import useDrag from '../hooks/useDrag';

export default function DesktopIcon({
  icon,
  label,
  size,
  initial,
  bounds,
  onDoubleClick
}) {
  const imgSize = size ?? 48;

  const rect = {
    w: imgSize,
    h: imgSize + (label ? 22 : 0),
  };

  const { position, onMouseDown, zIndex } = useDrag(initial, {
    bounds,
    rect,
    padding: 8,
  });

  return (
    <div
      className={styles.icon}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex
      }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <img
        src={icon}
        alt={label}
        draggable={false}
        style={{ width: imgSize, height: imgSize }}
      />
      {label && <span>{label}</span>}
    </div>
  );
}
