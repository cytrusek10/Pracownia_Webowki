import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';

const GRADIENTS = [
  'linear-gradient(135deg, #e94560 0%, #0f3460 100%)',
  'linear-gradient(135deg, #7b61ff 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #00c9a7 0%, #16213e 100%)',
  'linear-gradient(135deg, #ffa500 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #00b4d8 0%, #0f3460 100%)',
  'linear-gradient(135deg, #f72585 0%, #16213e 100%)',
];

const AVATARS = ['#e94560','#7b61ff','#00c9a7','#ffa500','#00b4d8','#f72585'];

export default function ApiPostCard({ post }) {
  const gradient = GRADIENTS[post.id % GRADIENTS.length];
  const avatar = AVATARS[post.userId % AVATARS.length];

  return (
    <article className={styles.card}>
      <div className={styles.card__img} style={{ background: gradient }} />
      <div className={styles.card__body}>
        <div className={styles.card__meta}>
          <span className="tag">User {post.userId}</span>
          <span className={styles.card__date}>#{post.id}</span>
        </div>
        <h2 className={styles.card__title}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>
        <p className={styles.card__excerpt}>{post.body}</p>
        <div className={styles.card__footer}>
          <div className={styles.card__author}>
            <div className={styles.card__avatar} style={{ background: avatar }} />
            <span>Autor #{post.userId}</span>
          </div>
          <Link to={`/posts/${post.id}`} className={styles.card__read}>Czytaj →</Link>
        </div>
      </div>
    </article>
  );
}
