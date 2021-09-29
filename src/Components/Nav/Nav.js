/* eslint-disable no-undef */
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Mobile from './MobileNav/Mobile'
import Desktop from './DesktopNav/Desktop'
import styles from './Nav.module.css'

function Nav({ loggedIn, signOut, userId }) {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 500

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])

  return (
    <nav id={styles.mainNav}>
      {width < breakpoint ? (
        <Mobile loggedIn={loggedIn} signOut={signOut} userId={userId} />
      ) : (
        <Desktop loggedIn={loggedIn} signOut={signOut} userId={userId} />
      )}
    </nav>
  )
}

Nav.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  signOut: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
}

export default Nav
