// src/desktop/Desktop.jsx
import styles from './Desktop.module.css';
import { desktopIcons } from '../data/desktopIcons';
import DesktopIcon from '../icons/DesktopIcon';

export default function Desktop() {
  return (
    <div className={styles.desktop}>
      {desktopIcons.map(icon => (
        <DesktopIcon key={icon.id} {...icon} />
      ))}
    </div>
  );
}
