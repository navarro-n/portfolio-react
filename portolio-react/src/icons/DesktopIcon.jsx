// src/icons/DesktopIcon.jsx
import styles from './DesktopIcon.module.css';

export default function DesktopIcon({ icon, label, onClick }) {
  return (
    <div className={styles.icon} onClick={onClick}>
      <img src={icon} alt={label} />
      <span>{label}</span>
    </div>
  );
}
