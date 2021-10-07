import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../auth'
import styles from './DeletePost.module.css'

const DeletePost = ({ cancel }) => {
  const { id } = useParams()
  const history = useHistory()
  const auth = useAuth()

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
      console.log({ err })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      <div className={styles.display}>
        <div>
          <div id={styles.heading}>Do you really want to delete this post?</div>
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
  )
}

DeletePost.propTypes = {
  cancel: PropTypes.func.isRequired,
}

export default DeletePost
