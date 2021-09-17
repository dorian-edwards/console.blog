import styles from './Desktop.module.css'
import logo from '../logo.svg'

function Desktop() {
  return (
    <div className={styles['dsk-wrap']}>
      <div id={styles.logo}>
        <img src={logo} alt="open book icon" />
      </div>
      <div>
        <ul id={styles.navMenu}>
          <li>Home</li>
          <li>About</li>
          <li>Profile</li>
          <li>Sign Out</li>
        </ul>
      </div>
    </div>
  )
}

export default Desktop
