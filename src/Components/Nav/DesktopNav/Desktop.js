import { Link } from 'react-router-dom'
import styles from './Desktop.module.css'
import logo from '../logo.svg'

function Desktop() {
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
          <li>Profile</li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Desktop
