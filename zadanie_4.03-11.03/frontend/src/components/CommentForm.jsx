import { useState } from 'react';
import { useAddComment } from '../hooks/useApi';
import styles from './CommentForm.module.scss';

export default function CommentForm({ postId }) {
  const [form, setForm] = useState({ author: '', email: '', body: '' });
  const [success, setSuccess] = useState(false);
  const { mutate, isPending, isError, error } = useAddComment(String(postId));

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.author.trim() || !form.body.trim()) return;

    mutate(form, {
      onSuccess: () => {
        setForm({ author: '', email: '', body: '' });
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      },
    });
  };

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Dodaj komentarz</h3>

      {success && (
        <div className={styles.success}>
          ✓ Komentarz został dodany!
        </div>
      )}

      {isError && (
        <div className={styles.error}>
          Błąd: {error?.message || 'Nie udało się dodać komentarza'}
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="author">Imię *</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Jan Kowalski"
              value={form.author}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jan@example.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="body">Komentarz *</label>
          <textarea
            id="body"
            name="body"
            rows={4}
            placeholder="Podziel się swoją opinią..."
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className={`btn btn--primary ${styles.submit}`}
          disabled={isPending}>
          {isPending ? 'Wysyłanie...' : 'Wyślij komentarz'}
        </button>
      </form>
    </div>
  );
}
