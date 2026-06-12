import { useParams, Link } from 'react-router-dom';
import { usePost, useUser, useComments } from '../hooks/useApi';
import Spinner from '../components/Spinner';
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
        <p>Nie znaleziono wpisu.</p>
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
          <span className="tag">Post #{ post.id }</span>
          <h1 className={styles.title}>{ post.title }</h1>
          <div className={styles.meta}>
            { userLoading ? <span>Ładowanie autora...</span> : user ? (
              <>
                <div className={styles.author}>
                  <div className={styles.avatar} style={{ background: '#e94560' }} />
                  <span>{ user.name }</span>
                </div>
                <span>·</span><span>{ user.company?.name }</span>
                <span>·</span><span>{ user.email }</span>
              </>
            ) : null }
          </div>
        </div>
      </div>

      <div className={`container ${styles.body}`}>
        <article className={styles.article}>
          <p className={styles.lead}>{ post.body }</p>
          <section className={styles.comments}>
            <h2 className={styles.comments__title}>
              Komentarze
              { comments && <span className={styles.comments__badge}>{ comments.length }</span> }
            </h2>
            { commentsLoading && <Spinner text="Pobieranie komentarzy..." /> }
            { comments?.map(c => (
              <div key={c.id} className={styles.comment}>
                <div className={styles.comment__head}>
                  <strong>{ c.name }</strong>
                  <a href={`mailto:${c.email}`} className={styles.comment__email}>{ c.email }</a>
                </div>
                <p>{ c.body }</p>
              </div>
            )) }
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
                  <p>{ user.email }</p>
                </div>
              </div>
              <div className={styles.authorDetails}>
                <div className={styles.authorDetail}><span>Firma</span><strong>{ user.company?.name }</strong></div>
                <div className={styles.authorDetail}><span>Miasto</span><strong>{ user.address?.city }</strong></div>
                <div className={styles.authorDetail}>
                  <span>Strona</span>
                  <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{ user.website }</a>
                </div>
              </div>
            </div>
          ) }
        </aside>
      </div>
    </main>
  );
}
