/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth'
import Error from '../Error/Error'
import styles from './PassReset.module.css'

function PasswordReset({ history }) {
  const auth = useAuth()
  const { id } = useParams()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const processError = (err) => {
    const arr = err.split(',')
    setOldPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setError(arr)
  }

  const clear = (i) => {
    const copy = [...error]
    copy.splice(i, 1)
    setError(copy)
  }

  const handleOldPassword = (e) => {
    setOldPassword(e.target.value)
  }

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = {
        password: oldPassword,
        newPassword,
        confirmPassword,
      }

      const res = await axios.patch(
        `http://localhost:8080/api/v1/users/${id}`,
        user,
        { withCredentials: true }
      )
      if (res) {
        await auth.signOut()
        history.push(`/login`)
      }
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
        <form id={styles.lgn_form} onSubmit={handleSubmit}>
          <h1 id={styles.lgn_header}>Reset Password</h1>
          <label htmlFor={styles.oldPass}>Old Password: </label>
          <input
            type="password"
            id={styles.oldPass}
            value={oldPassword}
            required
            onChange={handleOldPassword}
          />
          <label htmlFor={styles.newPass}>Password: </label>
          <input
            type="password"
            id={styles.newPass}
            value={newPassword}
            required
            onChange={handleNewPassword}
          />

          <label htmlFor={styles.cnfPass}>Confirm: </label>
          <input
            type="password"
            id={styles.cnfPass}
            value={confirmPassword}
            required
            onChange={handleConfirmPassword}
          />

          <button type="submit">Change Password</button>
        </form>
      </div>
      {error.length !== 0 && <Error message={error} clear={clear} />}
    </div>
  )
}

export default PasswordReset
