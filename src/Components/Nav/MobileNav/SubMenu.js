import { Link } from 'react-router-dom'
import { useAuth } from '../../../auth'
import styles from './SubMenu.module.css'

function SubMenu() {
  const auth = useAuth()

  return (
    <div id={styles.subMenu}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>About</li>
        {auth.user ? (
          <>
            <li>
              <Link to={`/users/${auth.user.id}`}>Profile</Link>
            </li>
            <li>
              <button id={styles.sgnOut} type="button" onClick={auth.signOut}>
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

export default SubMenu
