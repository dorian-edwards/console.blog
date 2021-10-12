import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../auth'
import styles from './Post.module.css'
import User from '../User/User'
import Display from '../Display/Display'

function Post() {
  const auth = useAuth()
  const [post, setPost] = useState(null)
  const [access, setAccess] = useState(false)
  const [timeStamp, setTimeStamp] = useState(null)
  const [favorite, setFavorite] = useState('favBlack')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(true)
  const [likes, setLikes] = useState(0)
  const { id } = useParams()

  const handleFav = async () => {
    try {
      if (auth.user) {
        const res = await axios.post(
          `http://localhost:8080/api/v1/posts/${id}/like`,
          {},
          { withCredentials: true }
        )
        if (res) setLikes(res.data.data.likes.length)
      }
    } catch (err) {
      console.log({ err })
    }
  }

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    // todo
  }

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/posts/${id}`, {
        withCredentials: true,
      })
      const { data } = res.data
      const { _id } = data.author
      const postLikes = data.likes
      setPost(data)

      if (auth.user) {
        if (_id === auth.user._id) setAccess(true)
        if (postLikes.includes(auth.user._id)) {
          setFavorite('favSolid')
        } else {
          setFavorite('favBlack')
        }
      }

      const stamp =
        data.createdAt === data.updatedAt
          ? new Date(data.createdAt)
          : new Date(data.updatedAt)

      setTimeStamp(stamp.toDateString())
      setLikes(data.likes.length)
    } catch (err) {
      console.log({ err })
    }
  }, [id, comments, likes])

  return (
    post && (
      <div>
        {access ? (
          <Link to={`/posts/${id}/edit`}>
            <Display post={post} />
          </Link>
        ) : (
          <Display post={post} />
        )}
        <div className={styles.container}>
          <div id={styles.pst_wrapper}>
            <div id={styles.heading}>
              <User author={post.author} />
              <div id={styles.time_stmp}>{timeStamp}</div>
            </div>
            <div id={styles.pst_body}>{post.body}</div>
          </div>
          <div id={styles.interact}>
            <div id={styles.fav_wrapper}>
              <div className={styles.centerVert}>
                <button id={styles.fav} type="button" onClick={handleFav}>
                  <img src={`/assets/img/${favorite}.png`} alt="" />
                </button>
                <div>{post.likes.length || ''}</div>
              </div>
              <form onSubmit={handleSubmit}>
                <label>
                  <textarea
                    id={styles.commentInput}
                    value={comment}
                    onChange={handleComment}
                    required
                  />
                </label>
                <div className={styles.flexEnd}>
                  <button id={styles.submit} type="submit" disabled={!comment}>
                    Post
                  </button>
                </div>
              </form>
            </div>
            {comments && (
              <ul id={styles.commentSection}>
                <li className={styles.comment}>
                  <p>I didn&apos;t like this article at all...</p>
                  <p>- dorian</p>
                </li>
                <li className={styles.comment}>
                  <p>Yeah this post was dumb brah...</p>
                  <p>- steve</p>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  )
}

export default Post
