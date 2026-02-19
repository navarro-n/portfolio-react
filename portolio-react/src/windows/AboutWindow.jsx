import Window from './Window';

export default function AboutWindow({ onClose, bounds }) {
  const isSmall = (bounds?.width ?? 0) < 900;

  const width = isSmall
    ? Math.min(360, (bounds?.width ?? 360) - 24)
    : 520;

  const height = isSmall
    ? Math.min(520, (bounds?.height ?? 520) - 24)
    : 360;

  return (
    <Window
      title="About-me.txt"
      onClose={onClose}
      bounds={bounds}
      width={width}
      height={height}
      rect={{ w: width, h: height }}
      initial={isSmall ? { x: 12, y: 12 } : { x: 140, y: 110 }}
    >
      
      <p>Hola 👋 Soy Irene!
        
      </p>
      <p>Desarrolladora Full Stack.</p>
    </Window>
  );
}
