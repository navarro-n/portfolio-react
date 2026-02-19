import { useRef } from "react";
import styles from "./DesktopIcon.module.css";
import useDrag from "../hooks/useDrag";

export default function DesktopIcon({
  icon,
  label,
  size,
  initial,
  bounds,
  onDoubleClick,
}) {
  const imgSize = size ?? 48;

  const rect = {
    w: imgSize,
    h: imgSize + (label ? 22 : 0),
  };

  const {
    position,
    zIndex,
    didDragRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
    
  } = useDrag(initial, {
    bounds,
    rect,
    padding: 8,
  });

  
  const lastTapRef = useRef({ t: 0, x: 0, y: 0 });

  function handlePointerUp(e) {
    onPointerUp?.(e);

    
    if (didDragRef?.current) return;

    
    if (e.pointerType !== "touch" && e.pointerType !== "pen") return;

    const now = Date.now();
    const prev = lastTapRef.current;
    const dt = now - prev.t;
    const dist = Math.hypot(e.clientX - prev.x, e.clientY - prev.y);

    if (dt < 320 && dist < 24) {
      lastTapRef.current = { t: 0, x: 0, y: 0 };
      onDoubleClick?.();
      return;
    }

    lastTapRef.current = { t: now, x: e.clientX, y: e.clientY };
  }

  return (
    <div
      className={styles.icon}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        zIndex,
      }}
      
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={onPointerCancel}
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
