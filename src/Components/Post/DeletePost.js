import axios from 'axios'
import { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../auth'
import Error from '../Error/Error'
import styles from './DeletePost.module.css'

const DeletePost = ({ cancel }) => {
  const { id } = useParams()
  const history = useHistory()
  const auth = useAuth()
  const [error, setError] = useState('')

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line no-undef
      const body = document.querySelector('body')
      const res = await axios.delete(
        `http://localhost:8080/api/v1/posts/${id}`,
        { withCredentials: true }
      )

      if (res) {
        body.style.overflow = 'auto'
        history.push(`/users/${auth.user._id}`)
      }
    } catch ({ err }) {
      setError(err)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.background} />
        <div className={styles.display}>
          <div>
            <div id={styles.heading}>
              Do you really want to delete this post?
            </div>
            <div className={styles.btn_panel}>
              <button
                id={styles.del}
                className={styles.btn}
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

DeletePost.propTypes = {
  cancel: PropTypes.func.isRequired,
}

export default DeletePost
