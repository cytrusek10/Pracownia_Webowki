import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { POSTS, CATEGORIES } from '../data/mockData';
import styles from './Home.module.scss';

export default function Home() {
  const featured = POSTS[0];
  const recent = POSTS.slice(1, 4);

  return (
    <main>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.hero__bg} />
        <div className={`container ${styles.hero__inner}`}>
          <div className={styles.hero__content}>
            <span className={styles.hero__eyebrow}>Witaj w ink.</span>
            <h1 className={styles.hero__headline}>
              Słowa, które<br />
              <em>zostają</em>
            </h1>
            <p className={styles.hero__sub}>
              Eseje, analizy i opowieści o technologii, kulturze i tym,
              co łączy oba światy. Bez pośpiechu.
            </p>
            <div className={styles.hero__actions}>
              <Link to="/posts" className="btn btn--primary">Przeglądaj wpisy</Link>
              <Link to="/categories" className="btn btn--outline">Kategorie</Link>
            </div>
          </div>
          <div className={styles.hero__deco} aria-hidden>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.hero__blob} style={{ '--i': i }} />
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className={styles.featured}>
        <div className="container">
          <h2 className={styles.section__title}>Wyróżniony wpis</h2>
          <PostCard post={featured} featured />
        </div>
      </section>

      {/* RECENT */}
      <section className={styles.recent}>
        <div className="container">
          <div className={styles.section__header}>
            <h2 className={styles.section__title}>Ostatnie wpisy</h2>
            <Link to="/posts" className={styles.section__more}>Zobacz wszystkie →</Link>
          </div>
          <div className={styles.grid}>
            {recent.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </div>
      </section>

      {/* CATEGORIES STRIP */}
      <section className={styles.cats}>
        <div className="container">
          <h2 className={styles.section__title}>Kategorie</h2>
          <div className={styles.cats__grid}>
            {CATEGORIES.map(cat => (
              <Link key={cat.id} to={`/categories`} className={styles.cats__item}
                style={{ '--accent': cat.color }}>
                <span className={styles.cats__name}>{cat.name}</span>
                <span className={styles.cats__count}>{cat.count} wpisów</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
