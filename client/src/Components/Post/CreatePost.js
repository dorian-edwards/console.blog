/* eslint-disable react/prop-types */
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth'
import Error from '../Error/Error'

import styles from './EditPost.module.css'

function EditPost({ history }) {
  const auth = useAuth()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [error, setError] = useState('')

  const baseUrl = '/api/v1/'

  useEffect(async () => {
    try {
      if (auth.user) {
        const res = await axios.get(`${baseUrl}users/${auth.user._id}`, {
          withCredentials: true,
        })
        if (res) setAuthor(auth.user._id)
      }
    } catch (err) {
      setError(err)
    }
  }, [])

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
      const newPost = {
        title,
        summary,
        body,
        author,
      }

      const res = await axios.post(
        `${baseUrl}posts`,
        { ...newPost },
        { withCredentials: true }
      )

      if (res) {
        const { data } = res.data
        history.push(`/posts/${data._id}`)
      }
    } catch (err) {
      setError(err)
    }
  }

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
          <button type="submit">Create Post</button>
        </form>
      </div>
      {error && <Error err={error} setError={setError} />}
    </div>
  )
}

export default EditPost
