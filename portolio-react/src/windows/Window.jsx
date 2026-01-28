import styles from './Window.module.css';

export default function Window({ title, children, onClose }) {
  return (
    <div className={styles.window}>
      <div className={styles.header}>
        <span>{title}</span>
        <button onClick={onClose}><i class="bi bi-circle-fill"></i></button>
      </div>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
