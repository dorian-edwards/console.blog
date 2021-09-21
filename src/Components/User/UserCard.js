import PropTypes from 'prop-types'
import styles from './UserCard.module.css'

function UserCard({ user: { firstName, lastName, img } }) {
  return (
    <div id={styles.user_card}>
      <div id={styles.img_wrapper}>
        <img src={img} alt="user profile" />
      </div>
      <div id={styles.user_name}>
        {firstName} {lastName}
      </div>
      <div id={styles.user_bio}>
        What if I put some sort of user summary here. Maybe even a default that
        says how long they&apos;ve been a member e.g. so and so has been a
        member since 9.20.21.
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
}

export default UserCard
