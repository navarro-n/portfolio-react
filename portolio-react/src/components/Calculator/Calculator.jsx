    import { useEffect, useMemo, useState } from 'react';
    import styles from './Calculator.module.css';

    export default function Calculator() {
    const [numeroActual, setNumeroActual] = useState('0');
    const [numeroAnterior, setNumeroAnterior] = useState('');
    const [operadorActual, setOperadorActual] = useState(null);
    const [empezarNuevoNumero, setEmpezarNuevoNumero] = useState(true);
    const MAX_DIGITS = 8;

    
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

      
      if (numeroActual === "Error") return 48;

      if (longitud > 12) return 28;
      if (longitud > 10) return 34;
      if (longitud > 8) return 42;

      return 64;
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
    if (prev === "Error") return "0";

    
    if (digito === "." && prev.includes(".")) return prev;

    
    const digitsCount = prev.replace("-", "").replace(".", "").length;

    
    if (!empezarNuevoNumero && digitsCount >= MAX_DIGITS && digito !== ".") {
      return prev;
    }

    
    if (prev === "0" || empezarNuevoNumero) {
      setEmpezarNuevoNumero(false);
      return digito === "." ? "0." : String(digito);
    }

    
    if (digitsCount >= MAX_DIGITS && digito !== ".") return prev;

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

        let texto = String(resultado);
        
        
        if (texto.replace("-", "").replace(".", "").length > MAX_DIGITS) {
          
          if (texto.includes(".")) {
            const [ent, dec] = texto.split(".");
            const allowedDec = Math.max(0, MAX_DIGITS - ent.replace("-", "").length);
            texto = allowedDec > 0 ? `${ent}.${dec.slice(0, allowedDec)}` : ent;
          }
          
          
          if (texto.replace("-", "").replace(".", "").length > MAX_DIGITS) {
            texto = Number(resultado).toPrecision(MAX_DIGITS);
          }
        }
        setNumeroActual(texto);

        setNumeroActual(String(resultado));
        setNumeroAnterior('');
        setOperadorActual(null);
        setEmpezarNuevoNumero(true);
    }

    function seleccionarOperador(op) {
        if (numeroActual === 'Error') return;

        if (numeroAnterior !== '' && operadorActual != null && !empezarNuevoNumero) {
        
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
    <div className={styles.display}>
      <p className={styles.operacion}>{operacion}</p>
      <p className={styles.resultado} style={{ fontSize }}>
        {numeroActual}
      </p>
    </div>

    <div className={styles.botones}>
      {/* fila 1 */}
      <button
        className={`${styles.btn} ${styles.control}`}
        onClick={limpiar}
        type="button"
      >
        AC
      </button>

      <button
        className={`${styles.btn} ${styles.control}`}
        onClick={toggleNegativo}
        type="button"
      >
        +/-
      </button>

      <button
        className={`${styles.btn} ${styles.control}`}
        onClick={porcentaje}
        type="button"
      >
        %
      </button>

      <button
        className={`${styles.btn} ${styles.operador}`}
        onClick={() => seleccionarOperador("/")}
        type="button"
      >
        ÷
      </button>

      {/* fila 2 */}
      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("7")}
        type="button"
      >
        7
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("8")}
        type="button"
      >
        8
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("9")}
        type="button"
      >
        9
      </button>

      <button
        className={`${styles.btn} ${styles.operador}`}
        onClick={() => seleccionarOperador("x")}
        type="button"
      >
        ×
      </button>

      {/* fila 3 */}
      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("4")}
        type="button"
      >
        4
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("5")}
        type="button"
      >
        5
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("6")}
        type="button"
      >
        6
      </button>

      <button
        className={`${styles.btn} ${styles.operador}`}
        onClick={() => seleccionarOperador("-")}
        type="button"
      >
        -
      </button>

      {/* fila 4 */}
      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("1")}
        type="button"
      >
        1
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("2")}
        type="button"
      >
        2
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero("3")}
        type="button"
      >
        3
      </button>

      <button
        className={`${styles.btn} ${styles.operador}`}
        onClick={() => seleccionarOperador("+")}
        type="button"
      >
        +
      </button>

      {/* fila 5 */}
      <button
        className={`${styles.btn} ${styles.numero} ${styles.zero}`}
        onClick={() => agregarNumero("0")}
        type="button"
      >
        0
      </button>

      <button
        className={`${styles.btn} ${styles.numero}`}
        onClick={() => agregarNumero(".")}
        type="button"
      >
        .
      </button>

      <button
        className={`${styles.btn} ${styles.operador}`}
        onClick={calcular}
        type="button"
      >
        =
      </button>
    </div>
  </div>
);

    }
