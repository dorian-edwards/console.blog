import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './Desktop.module.css'
import logo from '../logo.svg'

function Desktop({ loggedIn, signOut }) {
  return (
    <div className={styles['dsk-wrap']}>
      <Link to="/" id={styles.logo}>
        <img src={logo} alt="open book icon" />
      </Link>
      <div>
        <ul id={styles.navMenu}>
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
    </div>
  )
}

Desktop.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
}

export default Desktop
