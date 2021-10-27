/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../auth'
import Error from '../Error/Error'
import styles from './Login.module.css'

function Login({ history }) {
  const auth = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const clearInput = () => {
    setEmail('')
    setPassword('')
  }

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await auth.login(email, password)
      history.push('/')
    } catch (err) {
      clearInput()
      setError(err)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        {auth.user && <Redirect to="/" />}
        <form id={styles.lgn_form} onSubmit={handleSubmit}>
          <h1 id={styles.lgn_header}>Login</h1>
          <label htmlFor={styles.email}>Email: </label>
          <input
            type="email"
            id={styles.email}
            value={email}
            onChange={handleEmail}
            required
            placeholder="email@example.com"
          />
          <label htmlFor={styles.password}>Password: </label>
          <input
            type="password"
            id={styles.password}
            value={password}
            onChange={handlePassword}
            required
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      {error && <Error err={error} setError={setError} />}
    </div>
  )
}

export default Login
