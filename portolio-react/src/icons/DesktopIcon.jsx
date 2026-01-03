import styles from './DesktopIcon.module.css';
import useDrag from '../hooks/useDrag';

export default function DesktopIcon({ icon, label }) {
  const { position, onMouseDown } = useDrag();

  return (
    <div
      className={styles.icon}
      onMouseDown={onMouseDown}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
    >
      <img src={icon} alt={label} draggable={false} />
      {label && <span>{label}</span>}
    </div>
  );
}
