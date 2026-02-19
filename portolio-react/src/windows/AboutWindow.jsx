import Window from './Window';

export default function AboutWindow({ onClose, bounds }) {
  return (
    <Window
      title="About-me.txt"
      onClose={onClose}
      bounds={bounds}
      initial={{ x: 140, y: 110 }}
    >
      
      <p>Hola 👋 Soy Irene!
        
      </p>
      <p>Desarrolladora Full Stack.</p>
    </Window>
  );
}
