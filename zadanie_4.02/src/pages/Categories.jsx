import { Link } from 'react-router-dom';
import { CATEGORIES, POSTS } from '../data/mockData';
import styles from './Categories.module.scss';

export default function Categories() {
  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Kategorie</h1>
        <p className={styles.sub}>Znajdź tematy, które Cię interesują</p>
      </div>

      <div className={styles.grid}>
        {CATEGORIES.map(cat => {
          const posts = POSTS.filter(p => p.categoryId === cat.id);
          return (
            <article key={cat.id} className={styles.card}
              style={{ '--cat': cat.color }}>
              <div className={styles.card__stripe} />
              <div className={styles.card__body}>
                <div className={styles.card__head}>
                  <h2 className={styles.card__name}>{cat.name}</h2>
                  <span className={styles.card__count}>{cat.count}</span>
                </div>
                <p className={styles.card__desc}>{cat.description}</p>
                <div className={styles.card__posts}>
                  {posts.slice(0, 2).map(p => (
                    <Link key={p.id} to={`/posts/${p.id}`} className={styles.card__post}>
                      {p.title}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
