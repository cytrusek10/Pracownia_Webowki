import { useParams, Link } from 'react-router-dom';
import { usePost, useUser, useComments } from '../hooks/useApi';
import Spinner from '../components/Spinner';
import CommentForm from '../components/CommentForm';
import styles from './PostDetail.module.scss';

const GRADIENTS = [
  'linear-gradient(135deg, #e94560 0%, #0f3460 100%)',
  'linear-gradient(135deg, #7b61ff 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #00c9a7 0%, #16213e 100%)',
  'linear-gradient(135deg, #ffa500 0%, #1a1a2e 100%)',
  'linear-gradient(135deg, #00b4d8 0%, #0f3460 100%)',
];

export default function PostDetail() {
  const { id } = useParams();
  const { data: post, isLoading: postLoading, isError: postError } = usePost(id);
  const { data: user, isLoading: userLoading } = useUser(post?.userId);
  const { data: comments, isLoading: commentsLoading } = useComments(id);

  if (postLoading) return <Spinner text="Pobieranie wpisu..." />;
  if (postError) return (
    <main className="container">
      <div className={styles.notFound}>
        <h1>404</h1>
        <p>Nie znaleziono wpisu lub backend nie działa.</p>
        <p className={styles.notFound__hint}>Uruchom: <code>cd backend && node server.js</code></p>
        <Link to="/posts" className="btn btn--primary">Wróć do bloga</Link>
      </div>
    </main>
  );

  const gradient = GRADIENTS[post.id % GRADIENTS.length];

  return (
    <main>
      <div className={styles.hero} style={{ background: gradient }}>
        <div className={styles.hero__overlay} />
        <div className={`container ${styles.hero__inner}`}>
          <Link to="/posts" className={styles.back}>← Wróć do bloga</Link>
          <span className="tag">{ post.category }</span>
          <h1 className={styles.title}>{ post.title }</h1>
          <div className={styles.meta}>
            { userLoading ? <span>Ładowanie autora...</span> : user ? (
              <>
                <div className={styles.author}>
                  <div className={styles.avatar} style={{ background: '#e94560' }} />
                  <span>{ user.name }</span>
                </div>
                <span>·</span>
                <span>{ user.city }</span>
                <span>·</span>
                <span>{ post.date }</span>
              </>
            ) : null }
          </div>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <article className={styles.article}>
          { post.body.split('\n\n').map((para, i) => (
            <p key={i} className={i === 0 ? styles.lead : ''}>{ para }</p>
          )) }

          <section className={styles.comments}>
            <h2 className={styles.comments__title}>
              Komentarze
              { comments && <span className={styles.comments__badge}>{ comments.length }</span> }
            </h2>

            { commentsLoading && <Spinner text="Pobieranie komentarzy..." /> }

            { comments?.length === 0 && !commentsLoading && (
              <p className={styles.comments__empty}>Brak komentarzy. Bądź pierwszy!</p>
            )}

            { comments?.map(c => (
              <div key={c.id} className={styles.comment}>
                <div className={styles.comment__head}>
                  <strong>{ c.author }</strong>
                  { c.email && <a href={`mailto:${c.email}`} className={styles.comment__email}>{ c.email }</a> }
                  { c.createdAt && <span className={styles.comment__date}>{ new Date(c.createdAt).toLocaleDateString('pl-PL') }</span> }
                </div>
                <p>{ c.body }</p>
              </div>
            )) }

            <CommentForm postId={id} />
          </section>
        </article>

        <aside className={styles.sidebar}>
          { user && (
            <div className={styles.widget}>
              <h3>O autorze</h3>
              <div className={styles.authorCard}>
                <div className={styles.authorAvatar} style={{ background: '#e94560' }} />
                <div>
                  <strong>{ user.name }</strong>
                  <p>@{ user.username }</p>
                </div>
              </div>
              <div className={styles.authorDetails}>
                <div className={styles.authorDetail}><span>Bio</span><strong>{ user.bio }</strong></div>
                <div className={styles.authorDetail}><span>Miasto</span><strong>{ user.city }</strong></div>
                <div className={styles.authorDetail}><span>E-mail</span><a href={`mailto:${user.email}`}>{ user.email }</a></div>
              </div>
            </div>
          ) }
        </aside>
      </div>
    </main>
  );
}
