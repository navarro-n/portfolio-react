import { useEffect, useRef, useState } from 'react';
import styles from './Desktop.module.css';
import { desktopIcons } from '../data/desktopIcons';
import DesktopIcon from '../icons/DesktopIcon';
import AboutWindow from '../windows/AboutWindow';
import ProjectsWindow from '../windows/ProjectsWindow';
import CalculatorWindow from '../windows/CalculatorWindow';

const DESIGN = { width: 1440, height: 800 };

function getResponsiveInitial(icon, index, bounds) {
  const base = icon.initial ?? { x: 20, y: 20 };

  if (!bounds?.width || !bounds?.height) return base;

  
  const isSmall = bounds.width < 900;

    if (isSmall) {
    const padding = 16;

    
    const size = Math.min(icon.size ?? 48, 96);
    const rectW = Math.max(90, size + 18);
    const rectH = Math.max(100, size + (icon.label ? 28 : 10));

    
    const areaW = Math.max(1, bounds.width - padding * 2 - rectW);
    const areaH = Math.max(1, bounds.height - padding * 2 - rectH);

    
    const key = String(icon.id);
    let hash = 0;
    for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;

    
    const rx = (hash % 1000) / 1000;
    const ry = ((hash / 1000) % 1000) / 1000;

    
    const x = padding + Math.round(rx * areaW);
    const y = padding + Math.round(ry * areaH);

    return { x, y };
  }

  const sx = bounds.width / DESIGN.width;
  const sy = bounds.height / DESIGN.height;

  return {
    x: Math.round(base.x * sx),
    y: Math.round(base.y * sy),
  };
}

export default function Desktop() {
  const desktopRef = useRef(null);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [openWindow, setOpenWindow] = useState(null);

  function handleIconOpen(icon) {
    if (icon.type !== 'window') return;
    setOpenWindow(icon.window);
  }

  useEffect(() => {
    if (!desktopRef.current) return;
    const el = desktopRef.current;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setBounds({ width: rect.width, height: rect.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={desktopRef} className={styles.desktop}>
      <div className={styles.iconsLayer}>
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={icon.id}
            {...icon}
            bounds={bounds}
            
            initial={getResponsiveInitial(icon, index, bounds)}
            
            size={bounds.width < 900 ? Math.min(icon.size ?? 48, 96) : icon.size}
            onDoubleClick={() => handleIconOpen(icon)}
          />
        ))}
      </div>

      <div className={styles.windowsLayer}>
        {openWindow === 'aboutMe' && (
          <AboutWindow onClose={() => setOpenWindow(null)} />
        )}

        {openWindow === 'projects' && (
          <ProjectsWindow onClose={() => setOpenWindow(null)} />
        )}

        {openWindow === 'calculator' && (
          <CalculatorWindow onClose={() => setOpenWindow(null)} />
        )}
      </div>
    </div>
  );
}
