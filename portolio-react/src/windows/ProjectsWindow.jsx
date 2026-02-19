import Window from "./Window";
import styles from "./ProjectsWindow.module.css";
import { projectsList } from "../data/projects";

export default function ProjectsWindow({ onClose, bounds }) {
    const isSmall = (bounds?.width ?? 0) < 900;


    const desktopW = 300;
    const desktopH = 200;

    const padding = 12;

    const maxW = Math.max(200, (bounds?.width ?? 360) - padding * 2);
    const maxH = Math.max(160, (bounds?.height ?? 520) - padding * 2);


    const width = isSmall ? Math.min(desktopW, maxW) : desktopW;
    const height = isSmall ? Math.min(desktopH, maxH) : desktopH;

    return (
        <Window
        title="Projects"
        onClose={onClose}
        bounds={bounds}
        width={width}
        height={height}
        rect={{ w: width, h: height }}
        initial={isSmall ? { x: padding, y: padding } : { x: 760, y: 90 }}
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
