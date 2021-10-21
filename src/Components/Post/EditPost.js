/* eslint-disable no-undef */
/* eslint-disable no-shadow */
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Loading from '../Loading/Loading'
import styles from './EditPost.module.css'
import DeletePost from './DeletePost'

function EditPost() {
  const [isLoading, setLoading] = useState(true)
  const [deletePrompt, setDeletePrompt] = useState(false)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [img, setImg] = useState('')
  const { id } = useParams()
  const history = useHistory()

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleSumChange = (e) => {
    setSummary(e.target.value)
  }

  const handleBodyChange = (e) => {
    setBody(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newPost = { title, summary, body }
      const res = await axios.patch(
        `http://localhost:8080/api/v1/posts/${id}`,
        { ...newPost },
        { withCredentials: true }
      )
      if (res) history.go(0)
    } catch (err) {
      console.log({ err })
    }
  }

  const handleImageUpload = async (e) => {
    try {
      const upload = e.target.files[0]
      const formData = new FormData()
      formData.append('img', upload)

      const res = await axios.patch(
        `http://localhost:8080/api/v1/posts/${id}`,
        formData,
        { withCredentials: true }
      )

      if (res) history.push(`/posts/${id}`)
    } catch (err) {
      console.log({ err })
    }
  }

  const toggleDelete = (e) => {
    // eslint-disable-next-line no-undef
    const body = document.querySelector('body')
    const buttonId = e.target.id
    if (buttonId.startsWith('EditPost_del')) {
      body.style.overflow = 'hidden'
      setDeletePrompt(true)
    }
    if (buttonId.startsWith('DeletePost_cncl')) {
      body.style.overflow = 'auto'
      setDeletePrompt(false)
    }
  }

  useEffect(async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/posts/${id}`)
    const { data } = res.data
    setTitle(data.title)
    setSummary(data.summary)
    setBody(data.body)
    setImg(data.img)
    setLoading(false)
  }, [id])

  return (
    <div>
      {deletePrompt && (
        <>
          <div id={styles.cover} />
          <DeletePost cancel={toggleDelete} />
        </>
      )}
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.container}>
            <form id={styles.edt_form} onSubmit={handleSubmit}>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.title}>
                  Title:{' '}
                </label>
                <input
                  type="text"
                  id={styles.title}
                  onChange={handleTitleChange}
                  value={title}
                  required
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.sum}>
                  Summary:{' '}
                </label>
                <input
                  type="text"
                  id={styles.sum}
                  onChange={handleSumChange}
                  value={summary}
                  required
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.body}>
                  Body:{' '}
                </label>
                <textarea
                  id={styles.body}
                  onChange={handleBodyChange}
                  value={body}
                  required
                />
              </div>
              <div>
                <label className={styles.edt_label} htmlFor={styles.upload}>
                  Title Background
                </label>
                <input
                  type="file"
                  id={styles.upload}
                  onChange={handleImageUpload}
                />
              </div>
              <div>
                <img src={img} alt="user specified" id={styles.img} />
              </div>
              <button type="submit">Submit Changes</button>
              <button type="button" id={styles.del} onClick={toggleDelete}>
                Delete Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditPost
