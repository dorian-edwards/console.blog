/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Home.module.css'
import profile from '../../assets/img/default.png'

const genericParagraph = `

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tempus magna nisl, vitae fringilla lectus pellentesque nec. Suspendisse imperdiet nisl non orci tempor rhoncus. Sed in semper quam. In hac habitasse platea dictumst. Sed vulputate elementum nisl ac elementum. Ut vehicula nibh fringilla luctus viverra. Integer euismod, nisl fringilla finibus consectetur, metus turpis rutrum lorem, vitae consequat lorem arcu at nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus faucibus nisi ut molestie consequat. Ut at turpis eros. Ut vel lobortis nibh. Nullam hendrerit tellus a tristique malesuada. Sed rhoncus ligula at neque blandit, id tristique nisi elementum. In quis neque fermentum, elementum quam sit amet, imperdiet arcu.

Mauris eget leo tellus. Ut cursus facilisis mi nec porta. Ut quis ultrices nisl. Aenean nulla arcu, facilisis eu tellus in, lacinia vehicula mauris. Curabitur quis lobortis augue. Nunc et imperdiet tellus. Duis efficitur nisi vitae lectus interdum, fermentum aliquet neque accumsan. Nam imperdiet eleifend porta. Donec id dictum urna, ullamcorper vestibulum ex. Nam porttitor nunc id sodales eleifend. Cras nec blandit odio. Aliquam eu ullamcorper orci. Nulla dignissim molestie nulla a sodales.

Aenean malesuada id erat sit amet dignissim. Mauris eu lacinia ipsum, in ornare libero. Integer urna elit, molestie non sapien condimentum, tempor luctus est. Curabitur condimentum ullamcorper neque, in pellentesque arcu lobortis id. Sed non auctor diam, vel egestas sem. Donec vel imperdiet est, eu vehicula lectus. Phasellus vestibulum arcu sed dui ultrices gravida sed vel risus. Nunc molestie lobortis mi et dignissim. Duis egestas ex odio, a iaculis nunc fringilla et. Sed sed dignissim orci.

Aliquam erat volutpat. Proin eget placerat est. Donec risus eros, lacinia eu ante eget, imperdiet malesuada ex. Donec ultricies, dolor sit amet congue molestie, metus eros pellentesque tellus, in sodales ante lectus ut turpis. Aenean sit amet nunc ut nulla condimentum tempor ut a risus. Nulla venenatis bibendum turpis quis dignissim. Nam vulputate luctus eleifend. Nunc vel purus convallis, eleifend neque in, ullamcorper justo. Etiam eleifend leo sit amet dolor interdum, in eleifend libero egestas. Sed auctor sapien nec orci suscipit laoreet. Duis tristique, sem id tincidunt commodo, velit arcu vestibulum erat, at rhoncus neque ex malesuada libero. Nulla volutpat tortor vitae libero fringilla interdum. Nam vitae dolor volutpat, fringilla felis vel, mollis arcu.

Curabitur in massa ante. Maecenas congue sodales lacinia. Donec ultricies quis lectus nec luctus. Praesent sit amet eros mi. Donec sed erat est. Vivamus dapibus nisi id ex eleifend dapibus. Cras dapibus, arcu non aliquet dictum, diam enim sodales odio, sit amet sollicitudin lacus magna vitae nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. `

const data = [
  {
    _id: '612fc68a37b9db0ee2fd5b05',
    title: 'Post 1',
    summary: "Here's a brief blurb about this article",
    body: genericParagraph,
    author: {
      _id: '612c478f7d99e8115c939cc5',
      username: 'breh',
    },
    createdAt: '2021-09-01T18:29:30.184Z',
    updatedAt: '2021-09-01T18:29:30.184Z',
    __v: 0,
  },
  {
    _id: '612fc68f37b9db0ee2fd5b07',
    title: 'New Ish',
    summary: "Here's a brief blurb about this article",
    body: genericParagraph,
    author: {
      _id: '612c478f7d99e8115c939cc5',
      username: 'breh',
    },
    createdAt: '2021-09-01T18:29:35.716Z',
    updatedAt: '2021-09-01T18:37:35.744Z',
    __v: 0,
  },
  {
    _id: '613cbd25a1d89615d3597e4d',
    title: 'Another Post',
    summary: "Here's a brief blurb about this article",
    body: genericParagraph,
    author: {
      _id: '613cb95261f9f4143ef1ce2f',
      username: 'botboy',
    },
    createdAt: '2021-09-11T14:28:53.128Z',
    updatedAt: '2021-09-11T14:28:53.128Z',
    __v: 0,
  },
  {
    _id: '613cbdb92c465715ffdb3c20',
    title: 'this is the beginning',
    summary: "Here's a brief blurb about this article",
    body: genericParagraph,
    author: {
      _id: '613cb95261f9f4143ef1ce2f',
      username: 'botboy',
    },
    createdAt: '2021-09-11T14:31:21.114Z',
    updatedAt: '2021-09-11T14:31:21.114Z',
    __v: 0,
  },
]

function Home() {
  return (
    <div className={styles.container}>
      <h1 id={styles.home_header}>
        console.<span>b</span>log()
      </h1>
      <ul>
        {data.map((entry) => {
          let date
          if (entry.createdAt !== entry.updatedAt) {
            date = new Date(entry.updatedAt).toDateString()
          } else {
            date = new Date(entry.createdAt).toDateString()
          }
          return (
            <a className={styles.pst_lnk} href="#" key={entry._id}>
              <div className={styles.prfl_pic}>
                <img src={entry.profilePic || profile} alt="X" />
              </div>
              <div>
                <a className={styles.article_lnk} href="">
                  <h2 className={styles.article_ttl}>{entry.title}</h2>
                </a>
                <p className={styles.sum}>{entry.summary}</p>
                <span className={styles.date}>- {date}</span>
              </div>
            </a>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
