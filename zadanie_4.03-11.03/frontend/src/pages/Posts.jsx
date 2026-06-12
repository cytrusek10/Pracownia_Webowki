import { useState } from 'react';
import ApiPostCard from '../components/ApiPostCard';
import Spinner from '../components/Spinner';
import { usePosts } from '../hooks/useApi';
import styles from './Posts.module.scss';

export default function Posts() {
  const { data: posts, isLoading, isError } = usePosts();
  const [search, setSearch] = useState('');

  const filtered = posts?.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Blog</h1>
        <p className={styles.sub}>
          {posts ? `${posts.length} wpisów z JSONPlaceholder` : 'Pobieranie wpisów...'}
        </p>
      </div>

      <div className={styles.searchWrap}>
        <input
          className={styles.search}
          type="text"
          placeholder="Szukaj wpisów..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {isLoading && <Spinner text="Pobieranie wpisów z API..." />}
      {isError && (
        <div className={styles.error}>
          <p>Błąd pobierania danych. Sprawdź połączenie z internetem.</p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className={styles.grid}>
          {filtered.map(p => <ApiPostCard key={p.id} post={p} />)}
        </div>
      )}
    </main>
  );
}
