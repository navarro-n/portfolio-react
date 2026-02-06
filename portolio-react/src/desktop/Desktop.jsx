import { useState } from 'react';
import styles from './Desktop.module.css';
import { desktopIcons } from '../data/desktopIcons';
import DesktopIcon from '../icons/DesktopIcon';
import AboutWindow from '../windows/AboutWindow';

export default function Desktop() {
  const [openWindow, setOpenWindow] = useState(null);

  function handleIconOpen(icon) {
    if (icon.type !== 'window') return;
    setOpenWindow(icon.window);
  }

  return (
    <div className={styles.desktop}>
      <div className={styles.iconsLayer}>
        {desktopIcons.map(icon => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            onDoubleClick={() => handleIconOpen(icon)}
          />
        ))}
      </div>

      <div className={styles.windowsLayer}>
        {openWindow === 'aboutMe' && (
          <AboutWindow onClose={() => setOpenWindow(null)} />
        )}
      </div>
    </div>
  );
}
