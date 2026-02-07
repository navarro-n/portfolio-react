    import { useEffect, useMemo, useState } from 'react';
    import styles from './Calculator.module.css';

    export default function Calculator() {
    const [numeroActual, setNumeroActual] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('');
    const [operadorActual, setOperadorActual] = useState(null);
    const [empezarNuevoNumero, setEmpezarNuevoNumero] = useState(true);

    // Hora tipo iPhone (puedes dejarla fija si prefieres)
    const [hora, setHora] = useState(() => {
        const now = new Date();
        return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    });

    useEffect(() => {
        const id = setInterval(() => {
        const now = new Date();
        setHora(now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
        }, 1000);
        return () => clearInterval(id);
    }, []);

    const operacion = useMemo(() => {
        if (operadorActual != null && numeroAnterior !== '') {
        return `${numeroAnterior} ${operadorActual}`;
        }
        return '';
    }, [numeroAnterior, operadorActual]);

    const fontSize = useMemo(() => {
        const longitud = numeroActual.length;
        if (longitud > 12) return 30;
        if (longitud > 8) return 45;
        return 80;
    }, [numeroActual]);

    function limpiar() {
        setNumeroActual('0');
        setNumeroAnterior('');
        setOperadorActual(null);
        setEmpezarNuevoNumero(true);
    }

    function borrar() {
        setNumeroActual((prev) => {
        const next = prev.slice(0, -1);
        return next === '' ? '0' : next;
        });
    }

    function agregarNumero(digito) {
        setNumeroActual((prev) => {
        if (digito === '.' && prev.includes('.')) return prev;

        const cantidadDigitos = prev.replace('-', '').replace('.', '').length;
        if (!empezarNuevoNumero && cantidadDigitos >= 6) return prev;

        if (prev === '0' || empezarNuevoNumero) {
            setEmpezarNuevoNumero(false);
            return digito === '.' ? '0.' : String(digito);
        }

        return prev + String(digito);
        });
    }

    function calcular() {
        const num1 = parseFloat(numeroAnterior);
        const num2 = parseFloat(numeroActual);

        if (Number.isNaN(num1) || Number.isNaN(num2)) return;

        let resultado;

        switch (operadorActual) {
        case '+':
            resultado = num1 + num2;
            break;
        case '-':
            resultado = num1 - num2;
            break;
        case 'x':
            resultado = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
            setNumeroActual('Error');
            setNumeroAnterior('');
            setOperadorActual(null);
            setEmpezarNuevoNumero(true);
            return;
            }
            resultado = num1 / num2;
            break;
        default:
            return;
        }

        setNumeroActual(String(resultado));
        setNumeroAnterior('');
        setOperadorActual(null);
        setEmpezarNuevoNumero(true);
    }

    function seleccionarOperador(op) {
        if (numeroActual === 'Error') return;

        if (numeroAnterior !== '' && operadorActual != null && !empezarNuevoNumero) {
        // si ya había operación en marcha, calcula antes
        // (equivalente a tu comportamiento)
        // Nota: para no complicar, usamos el calcular() y luego set operador
        // pero necesitamos el resultado ya en numeroActual
        // Así que hacemos cálculo manual aquí:
        const num1 = parseFloat(numeroAnterior);
        const num2 = parseFloat(numeroActual);
        if (!Number.isNaN(num1) && !Number.isNaN(num2)) {
            let res;
            switch (operadorActual) {
            case '+': res = num1 + num2; break;
            case '-': res = num1 - num2; break;
            case 'x': res = num1 * num2; break;
            case '/': res = (num2 === 0) ? null : num1 / num2; break;
            default: res = null;
            }
            if (res == null) {
            setNumeroActual('Error');
            setNumeroAnterior('');
            setOperadorActual(null);
            setEmpezarNuevoNumero(true);
            return;
            }
            setNumeroActual(String(res));
            setNumeroAnterior(String(res));
        }
        } else {
        setNumeroAnterior(numeroActual);
        }

        setOperadorActual(op);
        setEmpezarNuevoNumero(true);
    }

    function porcentaje() {
        if (numeroActual === 'Error') return;
        const n = parseFloat(numeroActual);
        if (Number.isNaN(n)) return;
        setNumeroActual(String(n / 100));
    }

    function toggleNegativo() {
        if (numeroActual === '0' || numeroActual === 'Error') return;
        const n = parseFloat(numeroActual);
        if (Number.isNaN(n)) return;
        setNumeroActual(String(n * -1));
    }

    return (
        <div className={styles.calculadora}>
        <div className={styles.statusBar}>
            <span className={styles.hora}>{hora}</span>
            <div className={styles.iconosDerecha}>
            <i className="bi bi-reception-4"></i>
            <i className="bi bi-wifi"></i>
            <i className="bi bi-battery-full"></i>
            </div>
        </div>

        <div className={styles.calIconoContenedor}>
            <button className={styles.topButton} type="button" aria-label="Historial">
            <i className="bi bi-list-ul"></i>
            </button>
            <button className={styles.topButton} type="button" aria-label="Calculadora">
            <i className="bi bi-calculator"></i>
            </button>
        </div>

        <div className={styles.display}>
            <p className={styles.operacion}>{operacion}</p>
            <p className={styles.resultado} style={{ fontSize }}>{numeroActual}</p>
        </div>

        <div className={styles.botones}>
            {/* fila 1 */}
            <button className={`${styles.btn} ${styles.control}`} onClick={borrar} type="button">
            <i className="bi bi-backspace"></i>
            </button>
            <button className={`${styles.btn} ${styles.control}`} onClick={limpiar} type="button">AC</button>
            <button className={`${styles.btn} ${styles.control}`} onClick={porcentaje} type="button">
            <i className="bi bi-percent"></i>
            </button>
            <button className={`${styles.btn} ${styles.operador}`} onClick={() => seleccionarOperador('/')} type="button">
            <i className="bi bi-slash-lg"></i>
            </button>

            {/* fila 2 */}
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('7')} type="button">7</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('8')} type="button">8</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('9')} type="button">9</button>
            <button className={`${styles.btn} ${styles.operador}`} onClick={() => seleccionarOperador('x')} type="button">
            <i className="bi bi-x-lg"></i>
            </button>

            {/* fila 3 */}
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('4')} type="button">4</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('5')} type="button">5</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('6')} type="button">6</button>
            <button className={`${styles.btn} ${styles.operador}`} onClick={() => seleccionarOperador('-')} type="button">
            <i className="bi bi-dash-lg"></i>
            </button>

            {/* fila 4 */}
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('1')} type="button">1</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('2')} type="button">2</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('3')} type="button">3</button>
            <button className={`${styles.btn} ${styles.operador}`} onClick={() => seleccionarOperador('+')} type="button">
            <i className="bi bi-plus-lg"></i>
            </button>

            {/* fila 5 */}
            <button className={`${styles.btn} ${styles.numero}`} onClick={toggleNegativo} type="button">
            <i className="bi bi-plus-slash-minus"></i>
            </button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('0')} type="button">0</button>
            <button className={`${styles.btn} ${styles.numero}`} onClick={() => agregarNumero('.')} type="button">
            <i className="bi bi-dot"></i>
            </button>
            <button className={`${styles.btn} ${styles.operador}`} onClick={calcular} type="button">=</button>
        </div>
        </div>
    );
    }
