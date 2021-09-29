/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import SubMenu from './SubMenu'
import hamburger from '../hamburger.svg'
import logo from '../logo.svg'
import styles from './Mobile.module.css'

function Mobile({ loggedIn, signOut, userId }) {
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
      {active && (
        <SubMenu loggedIn={loggedIn} signOut={signOut} userId={userId} />
      )}
    </div>
  )
}

Mobile.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default Mobile
