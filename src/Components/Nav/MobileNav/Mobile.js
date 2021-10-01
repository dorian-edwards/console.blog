/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SubMenu from './SubMenu'
import hamburger from '../hamburger.svg'
import logo from '../logo.svg'
import styles from './Mobile.module.css'

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
