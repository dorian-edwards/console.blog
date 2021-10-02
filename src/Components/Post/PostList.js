/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './PostList.module.css'

function PostList({ id }) {
  const [posts, setPosts] = useState(null)

  useEffect(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/users/${id}/posts`,
        { withCredentials: true }
      )
      const { data } = res.data
      setPosts(data)
    } catch (err) {
      console.log({ err })
    }
  }, [])

  return (
    <div id={styles.pst_wrapper}>
      <ul>
        {posts &&
          posts.map((post) => (
            <li className={styles.pst} key={post._id}>
              <h2 id={styles.ttl}>{post.title}</h2>
              <p id={styles.bdy_prev}>{post.body.slice(0, 400)}...</p>
              <Link to={`/posts/${post._id}`}>continue reading</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

PostList.propTypes = {
  id: PropTypes.string.isRequired,
}

export default PostList
