import Window from './Window';

export default function AboutWindow({ onClose }) {
  return (
    <Window title="About-me.txt" onClose={onClose}>
      {/* contenido About Me */}
      <p>Hola 👋 Soy Irene!
        
      </p>
      <p>Desarrolladora Full Stack.</p>
    </Window>
  );
}
