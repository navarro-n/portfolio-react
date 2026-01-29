import styles from './DesktopIcon.module.css';
import useDrag from '../hooks/useDrag';

export default function DesktopIcon({
  icon,
  label,
  size,
  initial,
  onDoubleClick
}) {
  const { position, onMouseDown, zIndex } = useDrag(initial);

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
        style={{ 
          width: size ?? 48, 
          height: size ?? 48 
        }}
      />
      {label && <span>{label}</span>}
    </div>
  );
}

