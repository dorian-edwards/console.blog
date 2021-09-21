/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import styles from './EditUser.module.css'

// After image upload is implemented, clicking on the image will trigger an upload option
const data = {
  _id: '612c478f7d99e8115c939cc5',
  firstName: 'dorian',
  lastName: 'edwards',
  email: 'dorian@gmail.com',
  username: 'breh',
  img: 'assets/img/profilePic.jpg',
  bio: `Dorian is a 37 year old pharmacist learning web-development.`,
}

function EditUser() {
  return (
    <div>
      <div className={styles.container}>
        <div id={styles.edt_wrapper}>
          <div id={styles.edt_image}>
            <div id={styles.img_wrapper}>
              <img src={data.img} alt="user specific" />
            </div>
          </div>
          <div id={styles.edt_info}>
            <form id={styles.edt_form}>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.firstName}>
                  First Name:{' '}
                </label>
                <input
                  type="text"
                  name="firstName"
                  id={styles.firstName}
                  placeholder={data.firstName}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.lastName}>
                  Last Name:{' '}
                </label>
                <input
                  type="text"
                  name="lastName"
                  id={styles.lastName}
                  placeholder={data.lastName}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.username}>
                  Username:{' '}
                </label>
                <input
                  type="text"
                  name="username"
                  id={styles.username}
                  placeholder={data.username}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.email}>
                  Email:{' '}
                </label>
                <input
                  type="email"
                  name="email"
                  id={styles.email}
                  placeholder={data.email}
                />
              </div>
              <div>
                {' '}
                <label className={styles.edt_label} htmlFor={styles.bio}>
                  Bio:{' '}
                </label>
                <textarea name="bio" id={styles.bio} placeholder={data.bio} />
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
