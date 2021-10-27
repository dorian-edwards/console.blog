import styles from './Loading.module.css'

const Loading = () => (
  <div id={styles.loading}>
    <span id={styles.text}>Loading</span>
    <span id={styles.dot_1} className={styles.dot}>
      .
    </span>
    <span id={styles.dot_2} className={styles.dot}>
      .
    </span>
    <span id={styles.dot_3} className={styles.dot}>
      .
    </span>
  </div>
)

export default Loading
