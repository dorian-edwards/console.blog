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

  const processError = (err) => {
    const arr = err.split(',')
    setEmail('')
    setPassword('')
    setError(arr)
  }

  const clear = (i) => {
    const copy = [...error]
    copy.splice(i, 1)
    setError(copy)
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
      const { message } = err.response.data
      if (message) {
        processError(message)
      } else {
        setError('Something went wrong, please check the console')
        // eslint-disable-next-line no-console
        console.log({ err })
      }
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
            placeholder="email@example.com"
          />
          <label htmlFor={styles.password}>Password: </label>
          <input
            type="password"
            id={styles.password}
            value={password}
            onChange={handlePassword}
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
          />
          <button type="submit">Login</button>
        </form>
      </div>
      {error.length !== 0 && <Error message={error} clear={clear} />}
    </div>
  )
}

export default Login
