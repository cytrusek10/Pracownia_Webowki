import { Link } from 'react-router-dom';
import styles from './PostCard.module.scss';

export default function PostCard({ post, featured = false }) {
  return (
    <article className={`${styles.card} ${featured ? styles['card--featured'] : ''}`}>
      <div className={styles.card__img} style={{ background: post.gradient }} />

      <div className={styles.card__body}>
        <div className={styles.card__meta}>
          <span className="tag">{post.category}</span>
          <span className={styles.card__date}>{post.date}</span>
        </div>

        <h2 className={styles.card__title}>
          <Link to={`/posts/${post.id}`}>{post.title}</Link>
        </h2>

        <p className={styles.card__excerpt}>{post.excerpt}</p>

        <div className={styles.card__footer}>
          <div className={styles.card__author}>
            <div className={styles.card__avatar} style={{ background: post.avatarColor }} />
            <span>{post.author}</span>
          </div>
          <Link to={`/posts/${post.id}`} className={styles.card__read}>
            Czytaj →
          </Link>
        </div>
      </div>
    </article>
  );
}
