/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import baseUrl from '../../url'
import Error from '../Error/Error'
import styles from './PostList.module.css'

function PostList({ id, access }) {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')

  useEffect(async () => {
    try {
      const res = await axios.get(`${baseUrl}users/${id}/posts`, {
        withCredentials: true,
      })
      const { data } = res.data
      setPosts(data)
    } catch (err) {
      setError(err)
    }
  }, [id])

  return (
    <div>
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
      {error && <Error err={error} setError={setError} />}
    </div>
  )
}

PostList.propTypes = {
  id: PropTypes.string.isRequired,
  access: PropTypes.bool.isRequired,
}

export default PostList
