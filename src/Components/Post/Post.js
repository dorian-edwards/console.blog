import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAuth } from '../../auth'
import styles from './Post.module.css'
import User from '../User/User'
import Display from '../Display/Display'
import Loading from '../Loading/Loading'

function Post() {
  const auth = useAuth()
  const [isLoading, setLoading] = useState(true)
  const [post, setPost] = useState(null)
  const [access, setAccess] = useState(false)
  const [timeStamp, setTimeStamp] = useState(null)
  const [favorite, setFavorite] = useState('favBlack')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/posts/${id}/comment`,
        { body: comment },
        { withCredentials: true }
      )
      if (res) {
        setComment('')
        setCommentCount(commentCount + 1)
      }
    } catch (err) {
      console.log({ err })
    }
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

      const stamp = new Date(data.createdAt).toDateString()
      setTimeStamp(stamp)
      setLikes(data.likes.length)
      setLoading(false)
    } catch (err) {
      console.log({ err })
    }
  }, [id, likes])

  useEffect(async () => {
    const res = await axios.get(
      `http://localhost:8080/api/v1/posts/${id}/comment`,
      { withCredentials: true }
    )
    const { data } = res.data
    setComments(data)
    setCommentCount(data.length)
  }, [commentCount])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
                    <img
                      src={`/assets/img/${
                        auth.user ? favorite : 'favBlack'
                      }.png`}
                      alt=""
                    />
                  </button>
                  <div>{post.likes.length || ''}</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <label>
                    <textarea
                      id={styles.commentInput}
                      value={comment}
                      onChange={handleComment}
                      disabled={!auth.user}
                      required
                    />
                  </label>
                  <div className={styles.flexEnd}>
                    <button
                      id={styles.submit}
                      type="submit"
                      disabled={!comment}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>

              <ul id={styles.commentSection}>
                {comments &&
                  comments.map((entry) => (
                    <li className={styles.comment} key={entry._id}>
                      <div>{new Date(entry.createdAt).toDateString()}</div>
                      <div>{entry.body}</div>
                      <div>- {entry.author.username}</div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Post
