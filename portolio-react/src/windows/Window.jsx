import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Window.module.css";
import useDrag from "../hooks/useDrag";

export default function Window({
  title,
  children,
  onClose,
  initial = { x: 120, y: 120 },
  width,
  height,
  bounds,
}) {
  const winRef = useRef(null);

  
  const [measuredRect, setMeasuredRect] = useState({
    w: width ?? 420,
    h: height ?? 260,
  });

  
  useLayoutEffect(() => {
    if (!winRef.current) return;
    const r = winRef.current.getBoundingClientRect();
    setMeasuredRect({ w: Math.round(r.width), h: Math.round(r.height) });
  }, []);

  
  useEffect(() => {
    if (!winRef.current) return;
    const el = winRef.current;

    const update = () => {
      const r = el.getBoundingClientRect();
      setMeasuredRect({ w: Math.round(r.width), h: Math.round(r.height) });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const drag = useDrag(initial, {
    bounds,
    rect: measuredRect,
    padding: 4,
  });

  const hasPointer = typeof drag.onPointerDown === "function";

  return (
    <div
      ref={winRef}
      className={styles.window}
      style={{
        transform: `translate(${drag.position.x}px, ${drag.position.y}px)`,
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined,
        zIndex: drag.zIndex,
      }}
    >
      <div
        className={styles.titleBar}
        onPointerDown={hasPointer ? drag.onPointerDown : undefined}
        onPointerMove={hasPointer ? drag.onPointerMove : undefined}
        onPointerUp={hasPointer ? drag.onPointerUp : undefined}
        onPointerCancel={hasPointer ? drag.onPointerCancel : undefined}
        onMouseDown={!hasPointer ? drag.onMouseDown : undefined}
      >
        <div className={styles.controls}>
          <button
            className={styles.close}
            onClick={onClose}
            aria-label="Close window"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>

        <div className={styles.title}>{title}</div>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
}
