    import { useEffect } from 'react';
    import styles from './CalculatorWindow.module.css';
    import Calculator from '../components/Calculator/Calculator';

    export default function CalculatorWindow({ onClose }) {
    useEffect(() => {
        const onKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <div
        className={styles.overlay}
        onMouseDown={(e) => {
            // Cierra solo si haces click en el fondo (fuera de la calculadora)
            if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}
        >
        <div className={styles.shell}>
            <Calculator />
        </div>
        </div>
    );
    }
