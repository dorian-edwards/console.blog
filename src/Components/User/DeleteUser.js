import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../auth'
import Error from '../Error/Error'
import styles from './DeleteUser.module.css'

const baseUrl = '/api/v1/'

const DeleteUser = ({ cancel }) => {
  const { id } = useParams()
  const history = useHistory()
  const auth = useAuth()
  const [confirm, setConfirm] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line no-undef
      const body = document.querySelector('body')
      const res = await axios.delete(`${baseUrl}users/${id}`, {
        withCredentials: true,
      })
      if (res) {
        auth.signOut()
        body.style.overflow = 'auto'
        history.push('/')
      }
    } catch (err) {
      setError(err)
    }
  }

  useEffect(() => {
    if (email === auth.user.email) {
      setConfirm(true)
    } else {
      setConfirm(false)
    }
  }, [email])

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.background} />
        <div className={styles.display}>
          <div>
            <div id={styles.heading}>
              To delete your profile, type your email address
            </div>
            <label htmlFor={styles.del}>
              <input
                type="text"
                id={styles.email}
                value={email}
                onChange={handleEmail}
              />
            </label>
            <div className={styles.btn_panel}>
              <button
                id={styles.del}
                className={styles.btn}
                disabled={!confirm}
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                id={styles.cncl}
                className={styles.btn}
                type="button"
                onClick={cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <Error err={error} setError={setError} />}
    </div>
  )
}

DeleteUser.propTypes = {
  cancel: PropTypes.func.isRequired,
}

export default DeleteUser
