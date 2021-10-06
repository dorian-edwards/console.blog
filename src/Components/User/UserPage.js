/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import axios from 'axios'
import { useParams, Redirect, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth'
import UserCard from './UserCard'
import DeleteUser from './DeleteUser'
import PostList from '../Post/PostList'
import styles from './UserPage.module.css'

function UserPage() {
  const auth = useAuth()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [access, setAccess] = useState(false)
  const [deletePrompt, setDeletePrompt] = useState(false)
  const { id } = useParams()

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
        withCredentials: true,
      })
      const { data } = res.data
      if (data) setUser(data)
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) setError(true)
      }
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
      <div className={styles.container}>
        {error && <Redirect to="/login" />}
        <div id={styles.usr}>
          {user && <UserCard user={user} />}
          {access && (
            <div>
              <ul>
                <li>
                  <Link to={`/users/${id}/edit`}>Edit</Link>
                </li>
                <li>
                  <button id={styles.del} type="button" onClick={toggleDelete}>
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
    </div>
  )
}

export default UserPage
