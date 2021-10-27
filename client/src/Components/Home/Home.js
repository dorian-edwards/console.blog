import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Loading from '../Loading/Loading'
import styles from './Home.module.css'
import User from '../User/User'

const baseUrl = '/api/v1/'

function Home() {
  const [posts, setPosts] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${baseUrl}posts`, { withCredentials: true }).then((res) => {
      const { data } = res.data
      setPosts(data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <h1 id={styles.home_header}>
            console.<span>b</span>log()
          </h1>
          <ul>
            {posts &&
              posts.map((entry) => {
                const date = new Date(entry.createdAt).toDateString()

                return (
                  <div className={styles.pst_wrapper} key={entry._id}>
                    <div id={styles.article_wrapper}>
                      <Link
                        to={`/posts/${entry._id}`}
                        className={styles.article_lnk}
                      >
                        <h2 className={styles.article_ttl}>{entry.title}</h2>
                        <p className={styles.article_sum}>{entry.summary}</p>
                      </Link>
                    </div>
                    <User author={entry.author} />
                    <span className={styles.date}>- {date}</span>
                  </div>
                )
              })}
          </ul>
        </div>
      )}
    </>
  )
}

export default Home
