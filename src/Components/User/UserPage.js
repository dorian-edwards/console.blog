import axios from 'axios'
import { useParams, Redirect, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth'
import styles from './UserPage.module.css'
import UserCard from './UserCard'
import PostList from '../Post/PostList'

function UserPage() {
  const auth = useAuth()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [access, setAccess] = useState(false)
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
    const { _id } = auth.user
    if (_id === id) setAccess(true)
  }, [id])

  return (
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
                <Link to="/">Delete</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div id={styles.posts}>
        <PostList id={id} />
      </div>
    </div>
  )
}

export default UserPage
