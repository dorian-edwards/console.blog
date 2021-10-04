import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import styles from './EditPost.module.css'

function EditPost() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
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

  useEffect(async () => {
    const res = await axios.get(`http://localhost:8080/api/v1/posts/${id}`)
    const { data } = res.data
    setTitle(data.title)
    setSummary(data.summary)
    setBody(data.body)
  }, [id])

  return (
    <div>
      <div className={styles.container}>
        <form id={styles.edt_form} onSubmit={handleSubmit}>
          <div>
            {' '}
            <label className={styles.edt_label} htmlFor={styles.title}>
              Title:{' '}
            </label>
            <input
              type="text"
              name="title"
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
              name="summary"
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
              name="body"
              id={styles.body}
              onChange={handleBodyChange}
              value={body}
              required
            />
          </div>
          <button type="submit">Submit Changes</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
