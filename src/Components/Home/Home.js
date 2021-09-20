/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Home.module.css'
import User from '../User/User'

const data = [
  {
    _id: '6147e01fb7236b149a3fb768',
    title: 'New format One',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non iaculis massa, non ultricies leo. Nam ullamcorper sodales nulla quis sollicitudin. Nam lacinia vitae mauris eget faucibus. Sed elementum nunc tortor, ut blandit neque porta a. Maecenas in turpis vitae ante tempor tristique et at dui. Nam tincidunt erat est, vitae mollis lectus pharetra vitae. In hac habitasse platea dictumst. Nunc faucibus varius pulvinar.Pellentesque eros ipsum, accumsan sit amet risus vel, vehicula fringilla justo. Suspendisse commodo aliquet ipsum, a mattis lorem pharetra sed. Sed cursus cursus vehicula. Suspendisse sollicitudin enim ipsum, et mollis felis vulputate sed. Curabitur dui ipsum, sagittis id dolor ut, condimentum auctor libero. Donec tempus felis nec dolor convallis bibendum. Nullam nec fermentum lacus, id imperdiet nibh. Nulla malesuada lacus sit amet porttitor iaculis. Duis suscipit nibh vitae congue aliquet. Cras auctor pellentesque dolor non accumsan. Nulla mollis felis at erat facilisis, quis imperdiet mi tincidunt. Pellentesque dignissim egestas ipsum, vel lacinia leo egestas vestibulum. Etiam et vulputate massa. Morbi dignissim risus ac lorem iaculis sollicitudin. Mauris placerat nibh purus, congue pulvinar nisl imperdiet vitae. Suspendisse vehicula, mauris in finibus volutpat, augue dui auctor magna, eget rhoncus lectus ipsum id est. Proin ligula odio, lacinia nec sem vitae, mollis laoreet dolor. Quisque arcu dolor, auctor ut aliquet sed, facilisis in felis. Nullam nec ipsum augue. Duis vestibulum diam magna, eget tempor tellus malesuada id. Sed enim dui, convallis sollicitudin dui vel, venenatis volutpat lorem.',
    summary: 'Some stuff about lorem ipsum I suppose',
    author: {
      img: 'assets/img/default.png',
      _id: '6147ccb5171c2110dc9d6f56',
      username: 'febleh',
    },
    createdAt: '2021-09-20T01:13:03.634Z',
    updatedAt: '2021-09-20T01:13:03.634Z',
    __v: 0,
  },
  {
    _id: '6147e03fb7236b149a3fb76c',
    title: 'New format Two',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non iaculis massa, non ultricies leo. Nam ullamcorper sodales nulla quis sollicitudin. Nam lacinia vitae mauris eget faucibus. Sed elementum nunc tortor, ut blandit neque porta a. Maecenas in turpis vitae ante tempor tristique et at dui. Nam tincidunt erat est, vitae mollis lectus pharetra vitae. In hac habitasse platea dictumst. Nunc faucibus varius pulvinar.Pellentesque eros ipsum, accumsan sit amet risus vel, vehicula fringilla justo. Suspendisse commodo aliquet ipsum, a mattis lorem pharetra sed. Sed cursus cursus vehicula. Suspendisse sollicitudin enim ipsum, et mollis felis vulputate sed. Curabitur dui ipsum, sagittis id dolor ut, condimentum auctor libero. Donec tempus felis nec dolor convallis bibendum. Nullam nec fermentum lacus, id imperdiet nibh. Nulla malesuada lacus sit amet porttitor iaculis. Duis suscipit nibh vitae congue aliquet. Cras auctor pellentesque dolor non accumsan. Nulla mollis felis at erat facilisis, quis imperdiet mi tincidunt. Pellentesque dignissim egestas ipsum, vel lacinia leo egestas vestibulum. Etiam et vulputate massa. Morbi dignissim risus ac lorem iaculis sollicitudin. Mauris placerat nibh purus, congue pulvinar nisl imperdiet vitae. Suspendisse vehicula, mauris in finibus volutpat, augue dui auctor magna, eget rhoncus lectus ipsum id est. Proin ligula odio, lacinia nec sem vitae, mollis laoreet dolor. Quisque arcu dolor, auctor ut aliquet sed, facilisis in felis. Nullam nec ipsum augue. Duis vestibulum diam magna, eget tempor tellus malesuada id. Sed enim dui, convallis sollicitudin dui vel, venenatis volutpat lorem.',
    summary: 'This is a new take on generic text!',
    author: {
      img: 'assets/img/default.png',
      _id: '6147ccb5171c2110dc9d6f56',
      username: 'febleh',
    },
    createdAt: '2021-09-20T01:13:35.069Z',
    updatedAt: '2021-09-20T01:13:35.069Z',
    __v: 0,
  },
  {
    _id: '6147e053b7236b149a3fb770',
    title: 'New format Three',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non iaculis massa, non ultricies leo. Nam ullamcorper sodales nulla quis sollicitudin. Nam lacinia vitae mauris eget faucibus. Sed elementum nunc tortor, ut blandit neque porta a. Maecenas in turpis vitae ante tempor tristique et at dui. Nam tincidunt erat est, vitae mollis lectus pharetra vitae. In hac habitasse platea dictumst. Nunc faucibus varius pulvinar.Pellentesque eros ipsum, accumsan sit amet risus vel, vehicula fringilla justo. Suspendisse commodo aliquet ipsum, a mattis lorem pharetra sed. Sed cursus cursus vehicula. Suspendisse sollicitudin enim ipsum, et mollis felis vulputate sed. Curabitur dui ipsum, sagittis id dolor ut, condimentum auctor libero. Donec tempus felis nec dolor convallis bibendum. Nullam nec fermentum lacus, id imperdiet nibh. Nulla malesuada lacus sit amet porttitor iaculis. Duis suscipit nibh vitae congue aliquet. Cras auctor pellentesque dolor non accumsan. Nulla mollis felis at erat facilisis, quis imperdiet mi tincidunt. Pellentesque dignissim egestas ipsum, vel lacinia leo egestas vestibulum. Etiam et vulputate massa. Morbi dignissim risus ac lorem iaculis sollicitudin. Mauris placerat nibh purus, congue pulvinar nisl imperdiet vitae. Suspendisse vehicula, mauris in finibus volutpat, augue dui auctor magna, eget rhoncus lectus ipsum id est. Proin ligula odio, lacinia nec sem vitae, mollis laoreet dolor. Quisque arcu dolor, auctor ut aliquet sed, facilisis in felis. Nullam nec ipsum augue. Duis vestibulum diam magna, eget tempor tellus malesuada id. Sed enim dui, convallis sollicitudin dui vel, venenatis volutpat lorem.',
    summary: 'How many of these do I really need??',
    author: {
      img: 'assets/img/default.png',
      _id: '6147ccb5171c2110dc9d6f56',
      username: 'febleh',
    },
    createdAt: '2021-09-20T01:13:55.931Z',
    updatedAt: '2021-09-20T01:13:55.931Z',
    __v: 0,
  },
  {
    _id: '6147e070b7236b149a3fb774',
    title: 'I should probably limit the summary',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non iaculis massa, non ultricies leo. Nam ullamcorper sodales nulla quis sollicitudin. Nam lacinia vitae mauris eget faucibus. Sed elementum nunc tortor, ut blandit neque porta a. Maecenas in turpis vitae ante tempor tristique et at dui. Nam tincidunt erat est, vitae mollis lectus pharetra vitae. In hac habitasse platea dictumst. Nunc faucibus varius pulvinar.Pellentesque eros ipsum, accumsan sit amet risus vel, vehicula fringilla justo. Suspendisse commodo aliquet ipsum, a mattis lorem pharetra sed. Sed cursus cursus vehicula. Suspendisse sollicitudin enim ipsum, et mollis felis vulputate sed. Curabitur dui ipsum, sagittis id dolor ut, condimentum auctor libero. Donec tempus felis nec dolor convallis bibendum. Nullam nec fermentum lacus, id imperdiet nibh. Nulla malesuada lacus sit amet porttitor iaculis. Duis suscipit nibh vitae congue aliquet. Cras auctor pellentesque dolor non accumsan. Nulla mollis felis at erat facilisis, quis imperdiet mi tincidunt. Pellentesque dignissim egestas ipsum, vel lacinia leo egestas vestibulum. Etiam et vulputate massa. Morbi dignissim risus ac lorem iaculis sollicitudin. Mauris placerat nibh purus, congue pulvinar nisl imperdiet vitae. Suspendisse vehicula, mauris in finibus volutpat, augue dui auctor magna, eget rhoncus lectus ipsum id est. Proin ligula odio, lacinia nec sem vitae, mollis laoreet dolor. Quisque arcu dolor, auctor ut aliquet sed, facilisis in felis. Nullam nec ipsum augue. Duis vestibulum diam magna, eget tempor tellus malesuada id. Sed enim dui, convallis sollicitudin dui vel, venenatis volutpat lorem.',
    summary: 'Maybe I should limit this to like 20 characters or something...',
    author: {
      img: 'assets/img/default.png',
      _id: '6147ccb5171c2110dc9d6f56',
      username: 'febleh',
    },
    createdAt: '2021-09-20T01:14:24.644Z',
    updatedAt: '2021-09-20T01:14:24.644Z',
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
            <div className={styles.pst_wrapper} key={entry._id}>
              <div id={styles.article_wrapper}>
                <a className={styles.article_lnk} href="">
                  <h2 className={styles.article_ttl}>{entry.title}</h2>
                  <p className={styles.article_sum}>{entry.summary}</p>
                </a>
              </div>
              <User author={entry.author} />
              <span className={styles.date}>- {date}</span>
            </div>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
