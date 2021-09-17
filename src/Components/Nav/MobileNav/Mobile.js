/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react'
import hamburger from '../hamburger.svg'
import logo from '../logo.svg'
import styles from './Mobile.module.css'

function SubMenu() {
  return (
    <div id={styles.subMenu}>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Profile</li>
        <li>Sign Out</li>
      </ul>
    </div>
  )
}

function Mobile() {
  const [active, setActive] = useState(false)
  const toggleActive = () => setActive(!active)

  return (
    <div className={styles['mbl-wrap']}>
      <div id={styles.logo}>
        <img src={logo} alt="open book icon" />
      </div>
      <div id={styles.burger} onClick={toggleActive} role="button" tabIndex={0}>
        <img src={hamburger} alt="mobile hamburger icon" />
      </div>
      {active && <SubMenu />}
    </div>
  )
}

export default Mobile
