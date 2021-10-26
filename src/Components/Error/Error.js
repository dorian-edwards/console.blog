import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './Error.module.css'

const Error = ({ message }) => {
  const arr = message.split(',')

  return (
    <div id={styles.err}>
      <ul>
        {arr &&
          arr.map((txt, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>{txt}</li>
          ))}
      </ul>
    </div>
  )
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Error
