import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styles from './Post.module.css'
import User from '../User/User'
import Display from '../Display/Display'

function Post() {
  const [post, setPost] = useState(null)
  const [timeStamp, setTimeStamp] = useState(null)
  const { id } = useParams()

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      const { data } = res.data
      setPost(data)

      const stamp =
        data.createdAt === data.updatedAt
          ? new Date(data.createdAt)
          : new Date(data.updatedAt)

      setTimeStamp(stamp.toDateString())
    } catch (err) {
      console.log({ err })
    }
  }, [id])

  return (
    post && (
      <div>
        <Display post={post} />
        <div className={styles.container}>
          <div id={styles.heading}>
            <User author={post.author} />
            <div id={styles.time_stmp}>{timeStamp}</div>
          </div>
          <div id={styles.pst_body}>{post.body}</div>
        </div>
      </div>
    )
  )
}

export default Post
