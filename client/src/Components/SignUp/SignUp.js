/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios'
import { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useAuth } from '../../auth'
import Error from '../Error/Error'
import styles from './SignUp.module.css'

const baseUrl = '/api/v1/'

function SignUp({ history }) {
  const auth = useAuth()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      }
      const res = await axios.post(
        `${baseUrl}users`,
        { ...newUser },
        { withCredentials: true }
      )
      if (res) history.push('/login')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        {auth.user && <Redirect to="/" />}
        <form id={styles.sgn_form} onSubmit={handleSubmit}>
          <h1 id={styles.sgn_header}>Sign Up</h1>
          <label className={styles.sgn_label} htmlFor={styles.firstName}>
            First Name:{' '}
          </label>
          <input
            type="text"
            name="firstName"
            id={styles.firstName}
            onChange={handleFirstNameChange}
            value={firstName}
            required
          />
          <label className={styles.sgn_label} htmlFor={styles.lastName}>
            Last Name:{' '}
          </label>
          <input
            type="text"
            name="lastName"
            id={styles.lastName}
            onChange={handleLastNameChange}
            value={lastName}
            required
          />
          <label className={styles.sgn_label} htmlFor={styles.userName}>
            Username:{' '}
          </label>
          <input
            type="text"
            name="userName"
            id={styles.userName}
            onChange={handleUsernameChange}
            value={username}
            required
          />
          <label className={styles.sgn_label} htmlFor={styles.email}>
            Email:{' '}
          </label>
          <input
            type="email"
            name="email"
            id={styles.email}
            onChange={handleEmailChange}
            value={email}
            required
          />
          <label className={styles.sgn_label} htmlFor={styles.password}>
            Password:{' '}
          </label>
          <input
            type="password"
            name="password"
            id={styles.password}
            onChange={handlePasswordChange}
            value={password}
            required
          />
          <label className={styles.sgn_label} htmlFor={styles.confirmPassword}>
            Retype Password:{' '}
          </label>
          <input
            type="password"
            name="confirmPassword"
            id={styles.confirmPassword}
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>
      {error && <Error err={error} setError={setError} />}
    </div>
  )
}

export default SignUp
