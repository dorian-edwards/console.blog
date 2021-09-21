/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './Home.module.css'
import User from '../User/User'

const baseUrl = `http://localhost:8080/api/v1/posts`

function Home() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    axios.get(baseUrl).then((res) => {
      const { data } = res.data
      setPosts(data)
    })
  }, [])

  return (
    <div className={styles.container}>
      <h1 id={styles.home_header}>
        console.<span>b</span>log()
      </h1>
      <ul>
        {posts &&
          posts.map((entry) => {
            let date
            if (entry.createdAt !== entry.updatedAt) {
              date = new Date(entry.updatedAt).toDateString()
            } else {
              date = new Date(entry.createdAt).toDateString()
            }
            return (
              <div className={styles.pst_wrapper} key={entry._id}>
                <div id={styles.article_wrapper}>
                  <a className={styles.article_lnk} href="">
                    <h2 className={styles.article_ttl}>{entry.title}</h2>
                    <p className={styles.article_sum}>{entry.summary}</p>
                  </a>
                </div>
                <User author={entry.author} />
                <span className={styles.date}>- {date}</span>
              </div>
            )
          })}
      </ul>
    </div>
  )
}

export default Home
