import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.navbar__inner}`}>
        <NavLink to="/" className={styles.navbar__logo}>
          ink<span>.</span>
        </NavLink>

        <nav className={styles.navbar__nav}>
          <NavLink to="/"
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.active : ''}`}
            end>
            Home
          </NavLink>
          <NavLink to="/posts"
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.active : ''}`}>
            Blog
          </NavLink>
          <NavLink to="/categories"
            className={({ isActive }) =>
              `${styles.navbar__link} ${isActive ? styles.active : ''}`}>
            Kategorie
          </NavLink>
        </nav>

        <NavLink to="/posts" className={`btn btn--primary ${styles.navbar__cta}`}>
          Czytaj
        </NavLink>
      </div>
    </header>
  );
}
