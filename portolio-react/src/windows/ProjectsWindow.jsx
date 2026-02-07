import Window from './Window';
import styles from './ProjectsWindow.module.css';
import { projectsList } from '../data/projects';

export default function ProjectsWindow({ onClose }) {
    return (
        <Window
        title="Projects"
        onClose={onClose}
        initial={{ x: 760, y: 90 }}
        width={360}
        >
        <div className={styles.body}>
            <div className={styles.list}>
            {projectsList.map((p) => (
                <a
                key={p.id}
                className={styles.item}
                href={p.links?.live || p.links?.repo || p.url}
                target="_blank"
                rel="noreferrer"
                title={p.description}
                >
                {p.name}
                </a>
            ))}
            </div>
        </div>
        </Window>
    );
}
