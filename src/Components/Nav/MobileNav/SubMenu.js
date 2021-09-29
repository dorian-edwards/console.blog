import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './SubMenu.module.css'

function SubMenu({ loggedIn, signOut }) {
  return (
    <div id={styles.subMenu}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>About</li>
        {loggedIn ? (
          <>
            <li>Profile</li>
            <li>
              <button id={styles.sgnOut} type="button" onClick={signOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

SubMenu.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default SubMenu