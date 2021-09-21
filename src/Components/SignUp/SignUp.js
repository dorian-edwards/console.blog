/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './SignUp.module.css'

function SignUp() {
  return (
    <div className={styles.container}>
      <form id={styles.sgn_form}>
        <h1 id={styles.sgn_header}>Sign Up</h1>
        <label className={styles.sgn_label} htmlFor={styles.firstName}>
          First Name:{' '}
        </label>
        <input type="text" name="firstName" id={styles.firstName} />
        <label className={styles.sgn_label} htmlFor={styles.lastName}>
          Last Name:{' '}
        </label>
        <input type="text" name="lastName" id={styles.lastName} />
        <label className={styles.sgn_label} htmlFor={styles.userName}>
          Username:{' '}
        </label>
        <input type="text" name="userName" id={styles.userName} />
        <label className={styles.sgn_label} htmlFor={styles.email}>
          Email:{' '}
        </label>
        <input type="email" name="email" id={styles.email} />
        <label className={styles.sgn_label} htmlFor={styles.password}>
          Password:{' '}
        </label>
        <input type="password" name="password" id={styles.password} />
        <label className={styles.sgn_label} htmlFor={styles.confirmPassword}>
          Retype Password:{' '}
        </label>
        <input
          type="password"
          name="confirmPassword"
          id={styles.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default SignUp
