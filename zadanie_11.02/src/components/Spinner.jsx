import styles from './Spinner.module.scss';

export default function Spinner({ text = 'Ładowanie...' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.ring} />
      <p>{text}</p>
    </div>
  );
}
