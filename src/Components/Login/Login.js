/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import { useAuth } from '../../auth'
import styles from './Login.module.css'
import close from '../x.svg'

function Login({ history }) {
  const auth = useAuth()
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
      await auth.login(email, password)
      history.push('/')
    } catch (err) {
      if (err.response) setLoginFail(err.response.data.message)
    }
  }

  return (
    <div className={styles.container}>
      {auth.user && <Redirect to="/" />}
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
