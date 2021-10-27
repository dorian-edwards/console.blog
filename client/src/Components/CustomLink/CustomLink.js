import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import isExternal from 'is-url-external'

export default function CustomLink({ to, children }) {
  return isExternal(to) ? (
    <a href={to} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link to={to} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  )
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
}
