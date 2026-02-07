import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header({ onToggleTheme, headerVariant = "solid" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className={`${styles.header} ${headerVariant === "glass" ? styles.glass : ""}`}
    >
      <div className={styles.left}>
        <i className="bi bi-apple"></i>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.location.reload();
          }}
        >
          home
        </a>


        <a href="#credits">credits</a>

        <button
          type="button"
          className={styles.iconButton}
          onClick={onToggleTheme}
          aria-label="Cambiar tema"
          title="Cambiar tema"
        >
          <i className="bi bi-image"></i>
        </button>
      </div>

      <div className={styles.center}></div>

      <div className={styles.right}>
  <a
    className={styles.iconLink}
    href="https://github.com/navarro-n"
    target="_blank"
    rel="noreferrer"
    aria-label="GitHub"
    title="GitHub"
  >
    <i className="bi bi-github"></i>
  </a>

  <a
    className={styles.iconLink}
    href="https://www.linkedin.com/in/irenepinillosnavarro"
    target="_blank"
    rel="noreferrer"
    aria-label="LinkedIn"
    title="LinkedIn"
  >
    <i className="bi bi-linkedin"></i>
  </a>

  <span className={styles.time}>{time}</span>
</div>

    </header>
  );
}
