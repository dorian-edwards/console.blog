import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth'
import styles from './UserCard.module.css'

function UserCard({ user: { firstName, lastName, bio, img, _id: id } }) {
  const auth = useAuth()
  const [access, setAccess] = useState(false)

  useEffect(() => {
    if (auth.user) {
      const { _id } = auth.user
      if (_id === id) setAccess(true)
    }
  }, [id])

  return (
    <div id={styles.user_card}>
      <div id={styles.img_wrapper}>
        <img src={img} alt="user profile" />
      </div>
      <div id={styles.user_name}>
        {firstName} {lastName}
      </div>
      {access ? (
        <Link to={`/users/${id}/edit`}>
          <div id={styles.user_bio}>{bio}</div>
        </Link>
      ) : (
        <div id={styles.user_bio}>{bio}</div>
      )}
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserCard
