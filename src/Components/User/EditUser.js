/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import styles from './EditUser.module.css'

function EditUser() {
  const [img, setImg] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const { id } = useParams()
  const history = useHistory()

  useEffect(async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
        withCredentials: true,
      })
      const { data } = res.data
      setImg(data.img)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setUserName(data.username)
      setEmail(data.email)
      setBio(data.bio)
    } catch (err) {
      console.log({ err })
    }
  }, [])

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e) => {
    setLastName(e.target.value)
  }
  const handleUserNameChange = (e) => {
    setUserName(e.target.value)
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }
  const handleBioChange = (e) => {
    setBio(e.target.value)
  }

  const handleImgUpload = async (e) => {
    try {
      // eslint-disable-next-line no-shadow
      const img = e.target.files[0]
      setImg(img)
      const formData = new FormData()
      formData.append('img', img)

      const res = await axios.patch(
        `http://localhost:8080/api/v1/users/${id}`,
        formData,
        { withCredentials: true }
      )
      if (res) history.push(`/users/${id}`)
    } catch (err) {
      console.log({ err })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        firstName,
        lastName,
        username,
        email,
        bio,
      }

      console.log(img)

      const res = await axios.patch(
        `http://localhost:8080/api/v1/users/${id}`,
        { ...newUser },
        { withCredentials: true }
      )
      if (res) history.push(`/users/${id}`)
    } catch (err) {
      console.log({ err })
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div id={styles.edt_wrapper}>
          <div id={styles.edt_image}>
            <div id={styles.img_wrapper} className="placeholder">
              <input id={styles.upld} type="file" onChange={handleImgUpload} />
              <img src={img} alt="user specified" />
            </div>
          </div>
          <div id={styles.edt_info}>
            <form id={styles.edt_form} onSubmit={handleSubmit}>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.firstName}>
                  First Name:{' '}
                </label>
                <input
                  type="text"
                  id={styles.firstName}
                  value={firstName}
                  required
                  onChange={handleFirstNameChange}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.lastName}>
                  Last Name:{' '}
                </label>
                <input
                  type="text"
                  id={styles.lastName}
                  value={lastName}
                  required
                  onChange={handleLastNameChange}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.username}>
                  Username:{' '}
                </label>
                <input
                  type="text"
                  id={styles.username}
                  value={username}
                  required
                  onChange={handleUserNameChange}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.email}>
                  Email:{' '}
                </label>
                <input
                  type="email"
                  id={styles.email}
                  value={email}
                  required
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.bio}>
                  Bio:{' '}
                </label>
                <textarea
                  id={styles.bio}
                  value={bio}
                  onChange={handleBioChange}
                />
              </div>
              <button type="submit">Submit Changes</button>
              <Link to="#">
                <button type="button">Change Password</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditUser
