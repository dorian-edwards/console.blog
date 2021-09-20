/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import styles from './User.module.css'

function User({ author: { username, img } }) {
  return (
    <div>
      <Link to="#" id={styles.usr_wrapper}>
        <div id={styles.usr_img}>
          <img src={img} alt="uploaded pic or default blank profile pic" />
        </div>
        <div id={styles.usr_name}>{username}</div>
      </Link>
    </div>
  )
}

User.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
}
export default User
