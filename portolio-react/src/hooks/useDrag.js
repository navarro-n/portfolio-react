import { useEffect, useRef, useState } from "react";

const ICON_Z_MIN = 10;
const ICON_Z_MAX = 99;
let topZIndexIcons = ICON_Z_MIN;

function clamp(pos, bounds, rect, padding = 8) {
  const w = bounds?.width ?? window.innerWidth;
  const h = bounds?.height ?? window.innerHeight;

  const maxX = Math.max(padding, w - rect.w - padding);
  const maxY = Math.max(padding, h - rect.h - padding);

  return {
    x: Math.min(Math.max(pos.x, padding), maxX),
    y: Math.min(Math.max(pos.y, padding), maxY),
  };
}

export default function useDrag(initial = { x: 0, y: 0 }, options = {}) {
  const { bounds = null, rect = { w: 80, h: 80 }, padding = 8 } = options;

  const [position, setPosition] = useState(() =>
    clamp(initial, bounds, rect, padding)
  );
  const [zIndex, setZIndex] = useState(ICON_Z_MIN);

  const startPointer = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const pointerIdRef = useRef(null);
  const userMoved = useRef(false);

  
  const didDragRef = useRef(false);
  const draggingRef = useRef(false);

  useEffect(() => {
    setPosition((prev) => {
      const next = userMoved.current ? prev : initial;
      return clamp(next, bounds, rect, padding);
    });
  }, [initial?.x, initial?.y, bounds?.width, bounds?.height, rect.w, rect.h, padding]);

  function bringToFront() {
    topZIndexIcons = Math.min(topZIndexIcons + 1, ICON_Z_MAX);
    setZIndex(topZIndexIcons);
  }

  
  function onPointerDown(e) {
    
    if (e.pointerType === "mouse" && e.button !== 0) return;

    e.preventDefault();

    bringToFront();

    pointerIdRef.current = e.pointerId;
    didDragRef.current = false;
    draggingRef.current = false;

    startPointer.current = { x: e.clientX, y: e.clientY };
    startPos.current = { x: position.x, y: position.y };

    
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      
    }
  }

  function onPointerMove(e) {
    if (pointerIdRef.current == null) return;
    if (e.pointerId !== pointerIdRef.current) return;

    const dx = e.clientX - startPointer.current.x;
    const dy = e.clientY - startPointer.current.y;

    
    const threshold = 6;

    if (!draggingRef.current) {
      if (Math.abs(dx) + Math.abs(dy) < threshold) return;
      draggingRef.current = true;
      didDragRef.current = true;
      userMoved.current = true;
    }

    const next = { x: startPos.current.x + dx, y: startPos.current.y + dy };
    setPosition(clamp(next, bounds, rect, padding));
  }

  function onPointerUp(e) {
    if (pointerIdRef.current == null) return;
    if (e.pointerId !== pointerIdRef.current) return;

    pointerIdRef.current = null;
    draggingRef.current = false;
  }

  function onPointerCancel() {
    pointerIdRef.current = null;
    draggingRef.current = false;
  }

  function onMouseDown(e) {
    onPointerDown(e);
  }

  return {
    position,
    zIndex,
    didDragRef,
    onMouseDown,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel,
  };
}
