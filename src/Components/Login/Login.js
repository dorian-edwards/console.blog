import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './Login.module.css'
import close from '../x.svg'

const baseUrl = 'http://localhost:8080/api/v1/login'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginFail, setLoginFail] = useState('')

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const closeError = () => {
    setLoginFail('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.post(
        baseUrl,
        { email, password },
        { withCredentials: true }
      )
      console.log({ res })
    } catch (err) {
      const { message } = err.response.data
      setLoginFail(message)
      setPassword('')
      setEmail('')
    }
  }

  return (
    <div className={styles.container}>
      <form id={styles.lgn_form} onSubmit={handleSubmit}>
        <h1 id={styles.lgn_header}>Login</h1>
        <label htmlFor={styles.email}>Email: </label>
        <input
          type="email"
          name="email"
          id={styles.email}
          value={email}
          onChange={handleEmail}
          placeholder="email@example.com"
        />
        <label htmlFor={styles.password}>Password: </label>
        <input
          type="password"
          name="password"
          id={styles.password}
          value={password}
          onChange={handlePassword}
          placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
        />
        <button type="submit">Login</button>
      </form>
      {loginFail && (
        <div id={styles.error}>
          {loginFail}
          <button type="button" onClick={closeError}>
            <img id={styles.close} src={close} alt="x close icon" />
          </button>
        </div>
      )}
    </div>
  )
}

export default Login
