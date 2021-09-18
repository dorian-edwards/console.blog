/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './Login.module.css'

function Login() {
  return (
    <div className={styles.container}>
      <form id={styles.lgn_form}>
        <h1 id={styles.lgn_header}>Login</h1>
        <label htmlFor={styles.email}>Email: </label>
        <input type="email" name="email" id={styles.email} />
        <label htmlFor={styles.password}>Password: </label>
        <input type="password" name="password" id={styles.password} />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
