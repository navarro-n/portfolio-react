import { useState, useRef } from 'react';

const ICON_SIZE = 80;

// Rango reservado para iconos: 10–99 (ventanas están en 1000)
const ICON_Z_MIN = 10;
const ICON_Z_MAX = 99;

// Contador global compartido por todos los iconos
let topZIndexIcons = ICON_Z_MIN;

export default function useDrag(initial = { x: 0, y: 0 }) {
  const [position, setPosition] = useState(initial);
  const [zIndex, setZIndex] = useState(ICON_Z_MIN);

  const startMouse = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: 0, y: 0 });

  function onMouseDown(e) {
    e.preventDefault();

    // Traer al frente SOLO dentro del rango de iconos
    topZIndexIcons = Math.min(topZIndexIcons + 1, ICON_Z_MAX);
    setZIndex(topZIndexIcons);

    startMouse.current = {
      x: e.clientX,
      y: e.clientY,
    };

    startPos.current = {
      x: position.x,
      y: position.y,
    };

    function onMouseMove(e) {
      const dx = e.clientX - startMouse.current.x;
      const dy = e.clientY - startMouse.current.y;

      let newX = startPos.current.x + dx;
      let newY = startPos.current.y + dy;

      const maxX = window.innerWidth - ICON_SIZE;
      const maxY = window.innerHeight - ICON_SIZE;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));

      setPosition({ x: newX, y: newY });
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
