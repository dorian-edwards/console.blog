/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth'
import UserCard from './UserCard'
import DeleteUser from './DeleteUser'
import PostList from '../Post/PostList'
import Loading from '../Loading/Loading'
import Error from '../Error/Error'
import styles from './UserPage.module.css'

const baseUrl = '/api/v1/'

function UserPage() {
  const auth = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [access, setAccess] = useState(false)
  const [deletePrompt, setDeletePrompt] = useState(false)
  const [error, setError] = useState('')
  const { id } = useParams()

  useEffect(async () => {
    try {
      const res = await axios.get(`${baseUrl}users/${id}`, {
        withCredentials: true,
      })
      const { data } = res.data
      if (data) {
        setUser(data)
        setLoading(false)
      }
    } catch (err) {
      setError(err)
    }
  }, [id])

  useEffect(() => {
    if (auth.user) {
      const { _id } = auth.user
      if (_id === id) setAccess(true)
    }
  }, [id])

  const toggleDelete = (e) => {
    // eslint-disable-next-line no-undef
    const body = document.querySelector('body')
    const buttonId = e.target.id
    if (buttonId.startsWith('UserPage_del')) {
      body.style.overflow = 'hidden'
      setDeletePrompt(true)
    }
    if (buttonId.startsWith('DeleteUser_cncl')) {
      body.style.overflow = 'auto'
      setDeletePrompt(false)
    }
  }

  return (
    <div>
      {deletePrompt && (
        <>
          <div id={styles.cover} />
          <DeleteUser cancel={toggleDelete} />
        </>
      )}
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            <div className={styles.container}>
              <div id={styles.usr}>
                {user && <UserCard user={user} />}
                {access && (
                  <div>
                    <ul id={styles.ctrl_panel}>
                      <li>
                        <Link to={`/users/${id}/edit`}>
                          <button type="button">Edit</button>
                        </Link>
                      </li>
                      <li>
                        <button
                          id={styles.del}
                          type="button"
                          onClick={toggleDelete}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div id={styles.posts}>
                <PostList id={id} access={access} />
              </div>
            </div>
            {error && <Error err={error} setError={setError} />}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserPage
