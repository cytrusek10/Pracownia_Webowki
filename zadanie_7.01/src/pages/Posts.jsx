import { useState } from 'react';
import PostCard from '../components/PostCard';
import { POSTS, CATEGORIES } from '../data/mockData';
import styles from './Posts.module.scss';

export default function Posts() {
  const [active, setActive] = useState(null);

  const filtered = active
    ? POSTS.filter(p => p.categoryId === active)
    : POSTS;

  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.sub}>{POSTS.length} wpisów · wybierz kategorię lub czytaj wszystko</p>
      </div>

      <div className={styles.filters}>
        <button
          className={`${styles.filter} ${active === null ? styles['filter--active'] : ''}`}
          onClick={() => setActive(null)}>
          Wszystkie
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            className={`${styles.filter} ${active === cat.id ? styles['filter--active'] : ''}`}
            style={{ '--cat': cat.color }}
            onClick={() => setActive(cat.id)}>
            {cat.name}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </main>
  );
}
