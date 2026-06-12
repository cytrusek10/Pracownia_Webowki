import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__inner}`}>
        <div className={styles.footer__brand}>
          <span className={styles.footer__logo}>ink<span>.</span></span>
          <p>Miejsce na słowa, które zostają.</p>
        </div>

        <nav className={styles.footer__nav}>
          <Link to="/">Home</Link>
          <Link to="/posts">Blog</Link>
          <Link to="/categories">Kategorie</Link>
        </nav>

        <p className={styles.footer__copy}>© 2025 ink. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
