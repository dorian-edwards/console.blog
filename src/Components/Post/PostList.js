/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './PostList.module.css'

function PostList({ id, access }) {
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
  }, [id])

  return (
    <div id={styles.pst_wrapper}>
      <ul>
        {posts &&
          posts.map((post) => (
            <li className={styles.pst} key={post._id}>
              {access ? (
                <Link to={`/posts/${post._id}/edit`}>
                  <h2 id={styles.ttl_link} tooltip="Edit post">
                    {post.title}
                  </h2>
                </Link>
              ) : (
                <h2 id={styles.ttl}>{post.title}</h2>
              )}
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
  access: PropTypes.bool.isRequired,
}

export default PostList
