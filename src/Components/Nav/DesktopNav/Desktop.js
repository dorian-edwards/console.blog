import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth'
import styles from './Desktop.module.css'
import logo from '../logo.svg'

function Desktop() {
  const auth = useAuth()
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
          {auth.user ? (
            <>
              <li>
                <Link to={`/users/${auth.user._id}`}>Profile</Link>
              </li>
              <li>
                <Link to="/posts/new">Create</Link>
              </li>
              <li>
                <button id={styles.sgnOut} type="button" onClick={auth.signOut}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
export default Desktop
