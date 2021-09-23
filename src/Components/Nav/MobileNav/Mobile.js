/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import hamburger from '../hamburger.svg'
import logo from '../logo.svg'
import styles from './Mobile.module.css'

function SubMenu() {
  return (
    <div id={styles.subMenu}>
      <ul>
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
  )
}

function Mobile() {
  const [active, setActive] = useState(false)
  const toggleActive = () => setActive(!active)

  return (
    <div className={styles['mbl-wrap']}>
      <Link to="/" id={styles.logo}>
        <img src={logo} alt="open book icon" />
      </Link>
      <div id={styles.burger} onClick={toggleActive} role="button" tabIndex={0}>
        <img src={hamburger} alt="mobile hamburger icon" />
      </div>
      {active && <SubMenu />}
    </div>
  )
}

export default Mobile
