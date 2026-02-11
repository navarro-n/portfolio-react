import { useEffect, useRef, useState } from 'react';

const ICON_Z_MIN = 10;
const ICON_Z_MAX = 99;
let topZIndexIcons = ICON_Z_MIN;

function clamp(pos, bounds, rect, padding = 8) {
  if (!bounds || !bounds.width || !bounds.height) return pos;

  const maxX = Math.max(padding, bounds.width - rect.w - padding);
  const maxY = Math.max(padding, bounds.height - rect.h - padding);

  return {
    x: Math.min(Math.max(pos.x, padding), maxX),
    y: Math.min(Math.max(pos.y, padding), maxY),
  };
}

export default function useDrag(initial = { x: 0, y: 0 }, options = {}) {
  const {
    bounds = null,
    rect = { w: 80, h: 80 },
    padding = 8,
  } = options;

  const [position, setPosition] = useState(() => clamp(initial, bounds, rect, padding));
  const [zIndex, setZIndex] = useState(ICON_Z_MIN);

  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  const userMoved = useRef(false);

  useEffect(() => {
    setPosition((prev) => {
      const next = userMoved.current ? prev : initial;
      return clamp(next, bounds, rect, padding);
    });
  }, [initial?.x, initial?.y, bounds?.width, bounds?.height, rect.w, rect.h, padding]);

  function onMouseDown(e) {
    e.preventDefault();
    userMoved.current = true;

    
    topZIndexIcons = Math.min(topZIndexIcons + 1, ICON_Z_MAX);
    setZIndex(topZIndexIcons);

    startMouse.current = { x: e.clientX, y: e.clientY };
    startPos.current = { x: position.x, y: position.y };

    function onMouseMove(ev) {
      const dx = ev.clientX - startMouse.current.x;
      const dy = ev.clientY - startMouse.current.y;

      const next = { x: startPos.current.x + dx, y: startPos.current.y + dy };
      setPosition(clamp(next, bounds, rect, padding));
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  return { position, onMouseDown, zIndex };
}
