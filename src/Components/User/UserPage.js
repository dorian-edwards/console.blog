import axios from 'axios'
import { useParams, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './UserPage.module.css'
import UserCard from './UserCard'
import PostList from '../Post/PostList'

function UserPage() {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
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

  return (
    <div className={styles.container}>
      {error && <Redirect to="/login" />}
      <div id={styles.usr}>{user && <UserCard user={user} />}</div>
      <div id={styles.posts}>
        <PostList id={id} />
      </div>
    </div>
  )
}

export default UserPage
