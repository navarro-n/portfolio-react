import styles from "./DesktopIcon.module.css";
import useDrag from "../hooks/useDrag";

export default function DesktopIcon({
  icon,
  label,
  size,
  initial,
  bounds,
  onOpen, 
  onDoubleClick,
}) {
  const imgSize = size ?? 48;

  const rect = {
    w: imgSize,
    h: imgSize + (label ? 22 : 0),
  };

  const drag = useDrag(initial, {
    bounds,
    rect,
    padding: 8,
  });

  function handlePointerUp(e) {
    drag.onPointerUp?.(e);

    
    if (drag.didDragRef?.current) return;

    
    if (e.pointerType !== "mouse") {
      onOpen?.();
    }
  }

  return (
    <div
      className={styles.icon}
      style={{
        transform: `translate(${drag.position.x}px, ${drag.position.y}px)`,
        zIndex: drag.zIndex,
      }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={drag.onPointerCancel}
      onDoubleClick={onDoubleClick}
      role="button"
      tabIndex={0}
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
