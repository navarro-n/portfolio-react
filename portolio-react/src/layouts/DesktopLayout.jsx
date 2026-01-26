// src/layouts/DesktopLayout.jsx
import Header from '../system/Header/Header';
import Footer from '../system/Footer/Footer';
import Desktop from '../desktop/Desktop';
import styles from './DesktopLayout.module.css';

export default function DesktopLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.desktopArea}>
        <Desktop />
      </main>
      <Footer />
    </div>
  );
}
