import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../../../auth'
import styles from './SubMenu.module.css'

function SubMenu({ clear }) {
  const auth = useAuth()

  const signOutClear = () => {
    auth.signOut()
    clear()
  }

  return (
    <div id={styles.subMenu}>
      <ul>
        <li>
          <Link to="/" onClick={clear}>
            Home
          </Link>
        </li>
        {auth.user ? (
          <>
            <li>
              <Link to={`/users/${auth.user._id}`} onClick={clear}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/posts/new" onClick={clear}>
                Create
              </Link>
            </li>
            <li>
              <button id={styles.sgnOut} type="button" onClick={signOutClear}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" onClick={clear}>
                Signup
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={clear}>
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

SubMenu.propTypes = {
  clear: PropTypes.func.isRequired,
}

export default SubMenu
