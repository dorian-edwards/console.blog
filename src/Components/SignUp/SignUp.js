/* eslint-disable jsx-a11y/label-has-associated-control */
import styles from './SignUp.module.css'

function SignUp() {
  return (
    <div className={styles.container}>
      <form>
        <h1>Sign Up</h1>
        <label htmlFor={styles.firstName}>First Name: </label>
        <input type="text" name="firstName" id={styles.firstName} />
        <label htmlFor={styles.lastName}>Last Name: </label>
        <input type="text" name="lastName" id={styles.lastName} />
        <label htmlFor={styles.userName}>Username: </label>
        <input type="text" name="userName" id={styles.userName} />
        <label htmlFor={styles.email}>Email: </label>
        <input type="email" name="email" id={styles.email} />
        <label htmlFor={styles.password}>Password: </label>
        <input type="password" name="password" id={styles.password} />
        <label htmlFor={styles.confirmPassword}>Confirm Password: </label>
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
