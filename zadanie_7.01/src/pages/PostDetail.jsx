import { useParams, Link } from 'react-router-dom';
import { POSTS } from '../data/mockData';
import styles from './PostDetail.module.scss';

export default function PostDetail() {
  const { id } = useParams();
  const post = POSTS.find(p => p.id === Number(id));

  if (!post) return (
    <main className="container">
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>Nie znaleziono wpisu.</p>
        <Link to="/posts" className="btn btn--primary">Wróć do bloga</Link>
      </div>
    </main>
  );

  return (
    <main>
      <div className={styles.hero} style={{ background: post.gradient }}>
        <div className={styles.hero__overlay} />
        <div className={`container ${styles.hero__inner}`}>
          <Link to="/posts" className={styles.back}>← Wróć do bloga</Link>
          <span className="tag">{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: post.avatarColor }} />
              <span>{post.author}</span>
            </div>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime} czytania</span>
          </div>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <article className={styles.article}>
          <p className={styles.lead}>{post.excerpt}</p>
          {post.body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className={styles.placeholder}>
            <span>✦</span>
            <p>Pełna treść artykułu byłaby tutaj. Ten wpis to przykładowy post demonstracyjny.</p>
          </div>
        </article>

        <aside className={styles.sidebar}>
          <div className={styles.widget}>
            <h3>O autorze</h3>
            <div className={styles.authorCard}>
              <div className={styles.authorAvatar} style={{ background: post.avatarColor }} />
              <div>
                <strong>{post.author}</strong>
                <p>Redaktor ink. Pisze o technologii i kulturze.</p>
              </div>
            </div>
          </div>
          <div className={styles.widget}>
            <h3>Inne wpisy</h3>
            {POSTS.filter(p => p.id !== post.id).slice(0, 3).map(p => (
              <Link key={p.id} to={`/posts/${p.id}`} className={styles.relatedPost}>
                <span className="tag">{p.category}</span>
                <span>{p.title}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
