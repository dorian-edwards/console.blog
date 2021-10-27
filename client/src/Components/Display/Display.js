import PropTypes from 'prop-types'
import styles from './Display.module.css'

function Display({ post: { title, summary, img } }) {
  return (
    <div id={styles.dsp_wrapper}>
      <div id={styles.dsp_img_wrapper}>
        <div id={styles.dsp_filter} />
        <img id={styles.dsp_img} alt="user specified" src={img} />
        <div id={styles.title}>
          <h1>{title}</h1>
          <p id={styles.sum}>{summary}</p>
        </div>
      </div>
    </div>
  )
}

Display.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
}

export default Display
