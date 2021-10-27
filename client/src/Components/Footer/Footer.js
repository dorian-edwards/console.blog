import CustomLink from '../CustomLink/CustomLink'
import styles from './Footer.module.css'
import twitter from '../../icons/twitter.svg'
import linkedin from '../../icons/linkedin.svg'
import email from '../../icons/email.svg'
import web from '../../icons/web.svg'

const Footer = () => (
  <footer id={styles.mainFtr}>
    <div className={styles.container}>
      <ul>
        <li>
          <CustomLink to="https://pharmdtechie.net/contact">
            <img src={email} alt="email logo" />
          </CustomLink>
        </li>
        <li>
          <CustomLink to="https://www.linkedin.com/in/dorian-edwards-503136211/">
            <img src={linkedin} alt="linkedin logo" />
          </CustomLink>
        </li>
        <li>
          <CustomLink to="https://twitter.com/PharmDTechie">
            <img src={twitter} alt="twitter logo" />
          </CustomLink>
        </li>
        <li>
          <CustomLink to="https://pharmdtechie.net/">
            <img src={web} alt="www globe symbol" />
          </CustomLink>
        </li>
      </ul>
    </div>
  </footer>
)

export default Footer
