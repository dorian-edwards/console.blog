import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import close from '../../icons/x.svg'
import styles from './Error.module.css'

const Error = ({ err, setError }) => {
  const [display, setDisplay] = useState('')
  const { message } = err.response.data

  const clear = (i) => {
    const copy = [...display]
    copy.splice(i, 1)
    if (copy.length === 0) {
      setError('')
    } else {
      setDisplay(copy)
    }
  }

  useEffect(() => {
    if (message) {
      const arr = message.split(',')
      setDisplay(arr)
    } else {
      setDisplay(['Please check console ...'])
      // eslint-disable-next-line no-console
      console.log({ err })
    }
  }, [message])

  return (
    <div id={styles.err}>
      <ul>
        {display.length !== 0 &&
          display.map((txt, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={i}>
              <div className={styles.txt}>{txt}</div>
              <div className={styles.ctrl}>
                <button type="button" onClick={clear}>
                  <img id={styles.close} src={close} alt="x close icon" />
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}

Error.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  err: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
}

export default Error
