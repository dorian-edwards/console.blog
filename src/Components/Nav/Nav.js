/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import Mobile from './MobileNav/Mobile'
import Desktop from './DesktopNav/Desktop'
import './Nav.module.css'

function Nav() {
  const [width, setWidth] = useState(window.innerWidth)
  const breakpoint = 500

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth)
    })
  }, [])

  return <nav>{width < breakpoint ? <Mobile /> : <Desktop />}</nav>
}

export default Nav
