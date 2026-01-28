import Window from './Window';

export default function AboutWindow({ onClose }) {
  return (
    <Window title="About me" onClose={onClose}>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
        Sapiente et reprehenderit, cum, aliquid suscipit ut 
        laboriosam tempora natus accusamus consequatur quod 
        officia blanditiis eius ipsum aut sint incidunt enim quasi?
      </p>
    </Window>
  );
}
