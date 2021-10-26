import PropTypes from 'prop-types'
import close from '../../icons/x.svg'
import styles from './Error.module.css'

const Error = ({ message, clear }) => (
  <div id={styles.err}>
    <ul>
      {message.length !== 0 &&
        message.map((txt, i) => (
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

Error.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.array.isRequired,
  clear: PropTypes.func.isRequired,
}

export default Error
